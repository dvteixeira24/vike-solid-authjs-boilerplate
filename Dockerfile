# syntax=docker/dockerfile:1.7-labs

# loosely inspired by the bun dockerfile
# 1 use the node lts alpine image as our base but enable corepack
FROM node:22-alpine AS base
RUN corepack enable

USER node
WORKDIR /home/node/app
ENV NODE_ENV production

# 2 Yarn v2 install (its making a pnp file for us 🤩)
FROM base AS release
COPY --chown=node:node package.json yarn.lock .yarnrc.yml .
COPY --chown=node:node .yarn ./.yarn
RUN yarn install --immutable

# copying stuff
COPY --chown=node:node ./*.ts ./*.js, ./*.tsx ./*.yml ./*.yaml ./*.json . 
COPY --chown=node:node --exclude=./*.* . .

RUN ls -alt
# tests...
# RUN yarn test
RUN yarn build
# prune the dev depependencies
RUN yarn workspaces focus --production

# run the app
CMD ["yarn", "preview"]
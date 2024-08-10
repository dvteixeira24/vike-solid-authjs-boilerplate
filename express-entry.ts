import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { vikeHandler } from "./server/vike-handler";
import { telefuncHandler } from "./server/telefunc-handler";
import { createHandler, createMiddleware } from "@universal-middleware/express";
import express from "express";
import envs from "./envs";
import { authjsHandler, authjsSessionMiddleware, getSession } from "./server/authjs-handler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const host = envs.HOST || "0.0.0.0";
const port = envs.PORT ? Number.parseInt(envs.PORT, 10) : 3000;
const hmrPort = envs.HMR_PORT ? Number.parseInt(envs.HMR_PORT, 10) : 24678;

export default (await startServer()) as unknown;

async function startServer() {
    const app = express();

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(`${root}/dist/client`));
    } else {
        // Instantiate Vite's development server and integrate its middleware to our server.
        // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
        // and would unnecessarily bloat our server in production.)
        const vite = await import("vite");
        const viteDevMiddleware = (
            await vite.createServer({
                root,
                server: { middlewareMode: true, hmr: { port: hmrPort } },
            })
        ).middlewares;
        app.use(viteDevMiddleware);
    }

    app.use(createMiddleware(authjsSessionMiddleware));

    /**
     * Auth.js route
     * @link {@see https://authjs.dev/getting-started/installation}
     **/
    app.all("/api/auth/*", createHandler(authjsHandler));

    app.post("/_telefunc", createHandler(telefuncHandler));

    /**
     * Vike route
     *
     * @link {@see https://vike.dev}
     **/
    app.all("*", createHandler(vikeHandler));

    app.listen(port, host, () => {
        console.log(`Server listening on http://${host}:${port}`);
    });

    return app;
}

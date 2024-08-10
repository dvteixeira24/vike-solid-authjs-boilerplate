import { userTable } from "@/database/schema";
import { Auth, createActionURL, setEnvDefaults, type AuthConfig } from "@auth/core";
import CredentialsProvider from "@auth/core/providers/credentials";
import { Session } from "@auth/core/types";
import { and, eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { db } from "@/database/db";
import envs from "@/envs";

const env: Record<string, string | undefined> =
    typeof process?.env !== "undefined"
        ? process.env
        : import.meta && "env" in import.meta
          ? (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env
          : {};

if (!globalThis.crypto) {
    /**
     * Polyfill needed if Auth.js code runs on node18
     */
    Object.defineProperty(globalThis, "crypto", {
        value: await import("node:crypto").then((crypto) => crypto.webcrypto as Crypto),
        writable: false,
        configurable: true,
    });
}

const authjsConfig = {
    basePath: "/api/auth",
    trustHost: Boolean(env.AUTH_TRUST_HOST ?? env.VERCEL ?? env.NODE_ENV !== "production"),
    // TODO: Replace secret {@see https://authjs.dev/reference/core#secret}
    secret: envs.AUTHJS_SECRET,
    pages: {
        // below: i know its the example, but its not the default!
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/signin",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
    providers: [
        // TODO: @auth/express is in the works and might be good?
        // authjs will throw an error in your production logs when a user fails to sign in with the credentials
        // provider, i am sorry.
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            // @ts-expect-error authjs problem?
            async authorize(credentials: { email: string; password: string }) {
                // Add logic here to look up the user from the credentials supplied
                const user = await db.query.userTable.findFirst({
                    where: and(eq(userTable.email, credentials.email)),
                    with: {
                        org: true,
                    },
                });
                if (user && (await bcryptjs.compare(credentials.password, user.password))) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }
                return null;
            },
        }),
    ],
} satisfies Omit<AuthConfig, "raw">;

/**
 * Retrieve Auth.js session from Request
 */
export async function getSession(req: Request, config: Omit<AuthConfig, "raw">): Promise<Session | null> {
    setEnvDefaults(process.env, config);
    const requestURL = new URL(req.url);
    const url = createActionURL("session", requestURL.protocol, req.headers, process.env, config.basePath);

    const response = await Auth(new Request(url, { headers: { cookie: req.headers.get("cookie") ?? "" } }), config);

    const { status = 200 } = response;

    const data = await response.json();

    if (!data || !Object.keys(data).length) return null;
    if (status === 200) return data;
    throw new Error(data.message);
}

/**
 * Add Auth.js session to context
 * @link {@see https://authjs.dev/getting-started/session-management/get-session}
 **/
export async function authjsSessionMiddleware(
    request: Request,
    context: Record<string | number | symbol, unknown>,
): Promise<void> {
    try {
        context.session = await getSession(request, authjsConfig);
    } catch (error) {
        console.debug("authjsSessionMiddleware:", error);
        context.user = null;
    }
}

/**
 * Auth.js route
 * @link {@see https://authjs.dev/getting-started/installation}
 **/
export function authjsHandler<Context extends Record<string | number | symbol, unknown>>(
    request: Request,
    _context?: Context,
): Promise<Response> {
    return Auth(request, authjsConfig);
}

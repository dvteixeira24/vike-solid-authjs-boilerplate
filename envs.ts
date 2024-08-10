import { config } from "dotenv";

const env = config({
    path: ".env",
});

if (env.error) {
    throw new Error("Couldn't find .env file");
}

type T_envs = {
    NODE_ENV?: string;

    POSTGRES_URL: string;

    TRUST_PROXY?: string;
    AUTHJS_SECRET: string;
    AUTH_TRUST_HOST?: string;
    SALT: string;

    PORT: string; //
    HOST?: string;

    // DEV
    HMR_PORT?: string; //
};

// To check required variables...
function hasRequiredEnvs(o: Record<string, string | undefined>): o is T_envs {
    let out = true;
    if (!o.POSTGRES_URL) out = false;
    if (!o.AUTHJS_SECRET) out = false;
    if (!o.SALT) out = false;
    return out;
}

if (!env.parsed || !hasRequiredEnvs(env.parsed)) {
    throw new Error("Missing required environment variables");
}

const envs = { ...process.env, ...(env.parsed as Record<string, string | undefined>) };

// Defaults

envs.PORT = envs.PORT || "3000";

export default envs as T_envs;

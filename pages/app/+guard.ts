import { render } from "vike/abort";
import { PageContextServer } from "vike/types";

export const guard = (context: PageContextServer) => {
    const { user } = context;
    if (!user) {
        // Render the login page while preserving the URL. (This is novel technique)
        throw render("/auth/signin");
        /* The more traditional way, redirect the user:
    throw redirect('/login')
    */
    }
};

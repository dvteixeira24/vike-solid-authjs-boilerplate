/// <reference lib="webworker" />
import { Session } from "@auth/core/types";
import { renderPage } from "vike/server";

export async function vikeHandler<Context extends Record<string | number | symbol, unknown>>(
    request: Request,
    context?: Context,
): Promise<Response> {
    const pageContextInit = {
        ...context,
        urlOriginal: request.url,
        headersOriginal: request.headers,
        user: (context?.session as Session | undefined)?.user,
    };
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;

    const { readable, writable } = new TransformStream();

    response?.pipe(writable);

    return new Response(readable, {
        status: response?.statusCode,
        headers: response?.headers,
    });
}

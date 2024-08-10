// Telefunc by design does not expose the server error back to client

// So, lets make some custom classes... just kidding
// lets make types to standardize the messages from tele
// ... please use them in your telefunc.ts files

export type TelefuncError = { res: "error"; message: string };
export type TelefuncSuccess<T = Record<string, string>> = { res: "success"; data: T };

// typeguard, use them in your components
export const isTelefuncError = (response: { res: string }): response is TelefuncError => response.res === "error";
export const isTelefuncSuccess = (response: { res: string }): response is TelefuncSuccess => response.res === "success";

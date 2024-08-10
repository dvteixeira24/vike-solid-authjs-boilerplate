export { Signin };

import { Button } from "@/components/ui/button";
import { TextField, TextFieldLabel, TextFieldRoot } from "@/components/ui/textfield";
import { Toast, ToastContent } from "@/components/ui/toast";
import { toaster } from "@kobalte/core/toast";

const Signin = () => {
    return (
        <form
            class="flex flex-col gap-4 w-full max-w-md"
            onSubmit={async (ev) => {
                // handling submission:
                ev.preventDefault(); // no reload on fail (empties the fields)
                // @ts-expect-error: im not expecting a file in the form
                // so, its safe to put it into URLSearchParams constructor
                // also, do this first because performing a fetch will make currentTarget null
                const body = new URLSearchParams(new FormData(ev.currentTarget));
                const loginToast = toaster.show((props) => (
                    <Toast toastId={props.toastId} variant={"default"} duration={5000}>
                        <ToastContent>💫 Logging in...</ToastContent>
                    </Toast>
                ));
                const method = ev.currentTarget.method;
                const action = ev.currentTarget.action;
                const csrfToken = JSON.parse(await (await fetch("/api/auth/csrf")).text()).csrfToken;
                body.append("csrfToken", csrfToken);
                // body.append("csrfToken", csrfToken);
                const response = await fetch(action, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    method: method,
                    body: body,
                    credentials: "include",
                });

                // handling response:

                const searchParams = new URL(response.url).searchParams; // ?error=...
                console.log(searchParams);
                if (searchParams.has("error")) {
                    // show error message
                    toaster.update(loginToast, (props) => (
                        <Toast toastId={props.toastId} variant={"destructive"} duration={2000}>
                            <ToastContent>
                                {searchParams.get("error") === "CredentialsSignin"
                                    ? "Invalid credentials"
                                    : searchParams.get("error")}
                            </ToastContent>
                        </Toast>
                    ));
                } else {
                    toaster.update(loginToast, (props) => (
                        <Toast toastId={props.toastId} variant={"default"} duration={2000}>
                            <ToastContent>Successfully logged in! Redirecting...</ToastContent>
                        </Toast>
                    ));
                    setTimeout(() => {
                        window.location.href = "/app";
                    }, 2000); // after 3 second
                }
            }}
            method="post"
            action="/api/auth/callback/credentials"
        >
            <TextFieldRoot>
                <TextFieldLabel>Email</TextFieldLabel>
                <TextField name="email" type="email" placeholder="someone@example.com" required />
            </TextFieldRoot>
            <TextFieldRoot>
                <TextFieldLabel>Password</TextFieldLabel>
                <TextField name="password" type="password" placeholder="********" required />
            </TextFieldRoot>
            <div class="flex gap-4">
                <Button type="submit">Sign In</Button>
                <Button variant="outline" as="a" href="/auth/signup">
                    Sign Up
                </Button>
            </div>
        </form>
    );
};

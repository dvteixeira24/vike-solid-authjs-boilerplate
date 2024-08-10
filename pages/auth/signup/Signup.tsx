export { Signup };

import { Button } from "@/components/ui/button";
import { TextField, TextFieldLabel, TextFieldRoot } from "@/components/ui/textfield";
import { toaster } from "@kobalte/core/toast";
import { Toast, ToastContent } from "@/components/ui/toast";
import { onSignup } from "./Signup.telefunc";

function Signup() {
    return (
        <form
            class="flex flex-col gap-4 w-full max-w-md"
            onSubmit={async (ev) => {
                console.log(ev);
                ev.preventDefault();
                const formData = new FormData(ev.currentTarget);

                // excuse the assertion, formdata typing is up in the air
                // https://github.com/microsoft/TypeScript/issues/43797
                // but! i do not want to add a form library yet!
                const data = Object.fromEntries(formData.entries()) as unknown as {
                    firstName: string;
                    lastName: string;
                    email: string;
                    password: string;
                    passwordConfirm: string;
                };

                const signupToast = toaster.show((props) => (
                    <Toast toastId={props.toastId} variant={"default"} duration={5000}>
                        <ToastContent>
                            👋 Signing up as {data.firstName} {data.lastName}...
                        </ToastContent>
                    </Toast>
                ));

                const response = await onSignup(data);
                if (response.res === "error") {
                    toaster.update(signupToast, (props) => (
                        <Toast toastId={props.toastId} variant={"destructive"} duration={5000}>
                            <ToastContent>{response.message}</ToastContent>
                        </Toast>
                    ));
                } else if (response.res === "success") {
                    toaster.update(signupToast, (props) => (
                        <Toast toastId={props.toastId} variant={"default"} duration={5000}>
                            <ToastContent>Successfully signed up!</ToastContent>
                        </Toast>
                    ));
                }
            }}
        >
            <TextFieldRoot>
                <TextFieldLabel>First Name</TextFieldLabel>
                <TextField name="firstName" type="text" placeholder="John" required />
            </TextFieldRoot>
            <TextFieldRoot>
                <TextFieldLabel>Last Name</TextFieldLabel>
                <TextField name="lastName" type="text" placeholder="Doe" required />
            </TextFieldRoot>
            <TextFieldRoot>
                <TextFieldLabel>Email</TextFieldLabel>
                <TextField name="email" type="email" placeholder="someone@example.com" required />
            </TextFieldRoot>
            <TextFieldRoot>
                <TextFieldLabel>Password</TextFieldLabel>
                <TextField name="password" type="password" placeholder="********" required />
            </TextFieldRoot>
            <TextFieldRoot>
                <TextFieldLabel>Confirm Password</TextFieldLabel>
                <TextField name="passwordConfirm" type="password" placeholder="********" required />
            </TextFieldRoot>
            <div class="flex gap-4">
                <Button type="submit">Sign Up</Button>
                <Button variant="outline" as="a" href="/auth/signin">
                    Sign In
                </Button>
            </div>
        </form>
    );
}

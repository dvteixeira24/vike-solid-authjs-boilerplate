import "./tailwind.css";
import { JSXElement } from "solid-js";
import logoUrl from "@/assets/logo.svg";
import { usePageContext } from "vike-solid/usePageContext";
import { Button } from "@/components/ui/button";
import { clientOnly } from "vike-solid/clientOnly";
import { ToastList } from "@/components/ui/toast";
const ToastRegion = clientOnly(async () => (await import("@/components/ui/toast")).ToastRegion);
export default function LayoutDefault(props: { children?: JSXElement }) {
    return (
        <div class="flex w-screen m-auto">
            <Sidebar />
            <Content>{props.children}</Content>
        </div>
    );
}

function Content(props: { children: JSXElement }) {
    return (
        <main id="page-content" class="p-5 pb-12 min-h-screen flex-1">
            {props.children}
            <ToastRegion>
                <ToastList />
            </ToastRegion>
        </main>
    );
}

function Sidebar() {
    const context = usePageContext();
    const { user } = context;
    return (
        <nav class="flex flex-col w-64 border-r h-screen">
            <Logo />
            {user ? (
                <div class="p-4 gap-4 flex h-full flex-col justify-end items-center">
                    <Button as="a" variant="outline" href="/app" class="w-full">
                        Dashboard
                    </Button>
                    <Button
                        variant="outline"
                        class="w-full"
                        onClick={async () => {
                            const token = await (await fetch("/api/auth/csrf")).text();
                            await fetch("/api/auth/signout", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: token,
                            });
                            window.location.reload();
                        }}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div class="p-4 gap-4 flex h-full flex-col justify-end items-center">
                    <p>You are not signed in.</p>
                    <Button as="a" variant="outline" href="/auth/signup" class="w-full">
                        Create Account
                    </Button>
                    <Button as="a" href="/auth/signin" class="w-full">
                        Login
                    </Button>
                </div>
            )}
        </nav>
    );
}

function Logo() {
    return (
        <div class="p-5 mb-2">
            <a href="/">
                <img src={logoUrl} height={64} width={64} alt="logo" />
            </a>
        </div>
    );
}

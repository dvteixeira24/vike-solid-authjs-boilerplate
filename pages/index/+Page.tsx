import { Counter } from "./Counter";

export default function Page() {
    return (
        <>
            <h1 class="font-bold text-3xl pb-4">Welcome to Vike!</h1>

            <ul>
                <li>
                    <a href="https://vike.dev">Vike</a>
                </li>
                <li>
                    <a href="https://vitejs.dev/">Vite</a>
                </li>
                <li>
                    <a href="https://www.solidjs.com/">Solid</a>
                </li>
                <li>
                    <a href="https://shadcn-solid.com/">shadcn-solid</a>
                </li>
            </ul>
        </>
    );
}

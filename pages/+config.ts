import vikeSolid from "vike-solid/config";
import { Config } from "vike/types";
import Head from "@/layouts/HeadDefault";
import Layout from "@/layouts/LayoutDefault";

// Default config (can be overridden by pages)
export default {
    Layout,
    Head,

    passToClient: ["user"],
    // <title>
    title: "My Vike App",
    extends: vikeSolid,
} satisfies Config;

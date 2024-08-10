import { Data } from "./+data";
import { useData } from "vike-solid/useData";

export default function Page() {
    const data = useData<Data>();
    return (
        <>
            <h1>Org</h1>
            {data.org ? JSON.stringify(data.org) : "No organisation"}
        </>
    );
}

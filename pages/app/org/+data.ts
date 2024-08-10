// https://vike.dev/data
import { OrgItem } from "@/database/schema";
import { PageContextServer } from "vike/types";

export type Data = {
    org?: OrgItem;
};

export default async function data(context: PageContextServer): Promise<Data> {
    return { org: context.user?.org };
}

import { Session } from "@auth/core/types";
import { OrgItem, UserItem } from "./database/schema";

type Serializable = string | number | bigint | boolean | object;

declare global {
    namespace Vike {
        export interface PageContext {
            user: (UserItem & { org?: OrgItem }) | null;
            // Refine type of pageContext.Page (it's `unknown` by default)
            Page: () => JSX.Element;
        }
        export interface Context {
            session: Session;
        }
    }
}

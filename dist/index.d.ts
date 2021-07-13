import { Framev, Settings } from "./src/framev";
declare global {
    interface Window {
        Framev?: any;
    }
}
export { Framev, Settings };

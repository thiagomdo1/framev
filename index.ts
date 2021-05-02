import { Framev, Settings } from "./src/Framev";

declare global {
  interface Window {
    Framev?: any;
  }
}

window.Framev || (window.Framev = Framev);

export { Framev, Settings };

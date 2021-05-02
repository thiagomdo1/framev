import { Framev } from "./src/Framev";

declare global {
  interface Window {
    Framev?: any;
  }
}

if (!window.Framev) {
  window.Framev = Framev;
}

export default Framev;

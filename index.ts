import Framev from "./src/Framev";

declare global {
  interface Window {
    framev?: Framev;
  }
}

if (!window.framev) {
  window.framev = new Framev();
}

export default Framev;

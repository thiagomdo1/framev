class Framev {
  private readonly prefix: string = "framev:";
  private subscriptions: Array<{
    event: string;
    callback?: Function;
  }> = [];

  constructor() {
    const handleMessage = ({
      data,
      origin,
    }: {
      data: string;
      origin: string;
    }): void => {
      console.log(data);
      const prefixRegex = new RegExp(this.prefix, "i");

      if (origin !== window.location.origin) {
        return null;
      }

      if (
        !data ||
        typeof data !== "string" ||
        data.search(prefixRegex) === -1
      ) {
        return null;
      }

      const { event, payload } = JSON.parse(data.replace(this.prefix, ""));

      if (window.self === window.top) {
        this.emit(event, payload);
      }

      this.subscriptions.forEach((subscription) => {
        if (typeof subscription.callback !== "function") return null;

        if (event === subscription.event) {
          subscription.callback(payload);
          return null;
        }

        const subEvent = subscription.event;

        let subEventRegexStr = subEvent.replace("*", ".*");
        subEventRegexStr += subEvent[subEvent.length - 1] !== "*" ? "$" : "";

        const subEventRegex = new RegExp(subEventRegexStr);

        if (event.search(subEventRegex) > -1) subscription.callback(payload);
      });
    };

    window.addEventListener("message", handleMessage);
  }

  emit(event: string, payload?: any): void {
    if (!event || typeof event !== "string") return null;

    const msgData: {
      event: string;
      payload?: string;
    } = {
      event: `${this.prefix}${event}`,
    };

    if (payload) {
      msgData.payload = payload;
    }

    const msgString = JSON.stringify(msgData);

    const emitToTop = (): void => {
      if (!window.top) {
        return null;
      }
      window.top.postMessage(msgString, window.location.origin);
    };

    const emitToFrames = (): void => {
      if (!window.frames) {
        return null;
      }

      for (let i = 0; i < window.frames.length; i++) {
        const iframe = window.frames[i].frameElement;
        const iWindow = (<HTMLIFrameElement>iframe).contentWindow;

        if (!iWindow) {
          return null;
        }

        iWindow.postMessage(msgString, window.location.origin);
      }
    };

    if (window.self === window.top) {
      emitToFrames();
    } else {
      emitToTop();
    }
  }

  on(event: string, callback?: Function): void {
    if (!event || typeof event !== "string") {
      return null;
    }

    const hasSubscription = this.subscriptions.some((subscription) => {
      return subscription.event === event && subscription.callback === callback;
    });

    if (!hasSubscription) this.subscriptions.push({ event, callback });
  }

  off(event: string, callback?: Function): void {
    if (!event || typeof event !== "string") {
      return null;
    }

    this.subscriptions = this.subscriptions.filter((subscription) => {
      return subscription.event !== event && subscription.callback !== callback;
    });
  }
}

export default Framev;
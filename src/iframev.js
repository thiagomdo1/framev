class Iframev {
  constructor() {
    this.prefix = "__iframev__";
    this.subscriptions = [];
    this.isTop = window.self === window.top;

    window.addEventListener("message", ({ data }) => {
      const prefixRegex = new RegExp(this.prefix, "i");

      if (
        !data ||
        typeof data !== "string" ||
        data.search(prefixRegex) === -1
      ) {
        return null;
      }

      const { event, message } = JSON.parse(data.replace(this.prefix, ""));

      if (this.isTop) this.emit(event, message);

      this.subscriptions.forEach((subscription) => {
        if (typeof subscription.func !== "function") return null;

        if (event === subscription.event) {
          subscription.func(message);
          return null;
        }

        const subEvent = subscription.event;

        let subEventRegexStr = subEvent.replace("*", ".*");
        subEventRegexStr += subEvent[subEvent.length - 1] !== "*" ? "$" : "";

        const subEventRegex = new RegExp(subEventRegexStr);

        if (event.search(subEventRegex) > -1) subscription.func(message);
      });
    });
  }

  emit(event, message = null) {
    if (!event || typeof event !== "string") return null;

    const msgData = {
      event: `${this.prefix}${event}`,
    };
    if (message) msgData.message = message;
    const msgString = JSON.stringify(msgData);

    const emitToTop = () => {
      if (!window.top) return null;
      window.top.postMessage(msgString);
    };

    const emitToFrames = () => {
      if (!window.frames) return null;
      for (let i = 0; i < window.frames.length; i++) {
        const { contentWindow } = window.frames[i].frameElement;
        if (!contentWindow) return null;
        contentWindow.postMessage(msgString);
      }
    };

    if (this.isTop) {
      emitToFrames();
    } else {
      emitToTop();
    }
  }

  on(event, func = null) {
    if (!event || typeof event !== "string") return null;

    const hasSubscription = this.subscriptions.some((subscription) => {
      return subscription.event === event && subscription.func === func;
    });

    if (!hasSubscription) this.subscriptions.push({ event, func });
  }

  off(event, func = null) {
    if (!event || typeof event !== "string") return null;

    this.subscriptions = this.subscriptions.filter((subscription) => {
      return subscription.event !== event && subscription.func !== func;
    });
  }
}

export default Iframev;

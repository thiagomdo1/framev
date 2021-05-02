"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Framev = void 0;
var Framev = /** @class */ (function () {
    function Framev(settings) {
        var _this = this;
        this.prefix = "framev:";
        this.settings = { origin: "*" };
        this.subscriptions = [];
        if (settings) {
            this.settings = __assign(__assign({}, this.settings), settings);
        }
        var handleMessage = function (_a) {
            var data = _a.data, origin = _a.origin;
            var prefixRegex = new RegExp(_this.prefix, "i");
            if (_this.settings.origin !== "*" && _this.settings.origin !== origin) {
                return null;
            }
            if (!data ||
                typeof data !== "string" ||
                data.search(prefixRegex) === -1) {
                return null;
            }
            var _b = JSON.parse(data.replace(_this.prefix, "")), event = _b.event, payload = _b.payload;
            console.log("emitting event:", event);
            _this.emit(event, payload, true);
            _this.subscriptions.forEach(function (subscription) {
                if (typeof subscription.callback !== "function")
                    return null;
                if (event === subscription.event) {
                    subscription.callback(payload);
                    return null;
                }
                var subEvent = subscription.event;
                var subEventRegexStr = subEvent.replace("*", ".*");
                subEventRegexStr += subEvent[subEvent.length - 1] !== "*" ? "$" : "";
                var subEventRegex = new RegExp(subEventRegexStr);
                if (event.search(subEventRegex) > -1)
                    subscription.callback(payload);
            });
        };
        window.addEventListener("message", handleMessage);
    }
    Framev.prototype.emit = function (event, payload, onlyChildren) {
        var _this = this;
        if (!event || typeof event !== "string")
            return null;
        var msgData = {
            event: "" + this.prefix + event
        };
        if (payload) {
            msgData.payload = payload;
        }
        var msgString = JSON.stringify(msgData);
        var emitToTop = function () {
            if (!window.top) {
                return null;
            }
            window.top.postMessage(msgString, _this.settings.origin);
        };
        var emitToFrames = function () {
            if (!window.frames) {
                return null;
            }
            for (var i = 0; i < window.frames.length; i++) {
                var iframe = window.frames[i].frameElement;
                var iWindow = iframe.contentWindow;
                if (!iWindow) {
                    return null;
                }
                iWindow.postMessage(msgString, _this.settings.origin);
            }
        };
        if (window.self === window.top || onlyChildren) {
            emitToFrames();
        }
        else {
            emitToTop();
        }
    };
    Framev.prototype.on = function (event, callback) {
        if (!event || typeof event !== "string") {
            return null;
        }
        var hasSubscription = this.subscriptions.some(function (subscription) {
            return subscription.event === event && subscription.callback === callback;
        });
        if (!hasSubscription)
            this.subscriptions.push({ event: event, callback: callback });
    };
    Framev.prototype.off = function (event, callback) {
        if (!event || typeof event !== "string") {
            return null;
        }
        this.subscriptions = this.subscriptions.filter(function (subscription) {
            return subscription.event !== event && subscription.callback !== callback;
        });
    };
    return Framev;
}());
exports.Framev = Framev;

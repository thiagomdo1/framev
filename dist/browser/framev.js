(()=>{"use strict";var n=function(){return(n=Object.assign||function(n){for(var t,i=1,e=arguments.length;i<e;i++)for(var r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}).apply(this,arguments)},t=function(){function t(t){var i=this;this.prefix="framev:",this.settings={origin:"*"},this.subscriptions=[],t&&(this.settings=n(n({},this.settings),t)),window.addEventListener("message",(function(n){var t=n.data,e=n.origin,r=new RegExp(i.prefix,"i");if("*"!==i.settings.origin&&i.settings.origin!==e)return null;if(!t||"string"!=typeof t||-1===t.search(r))return null;var s=JSON.parse(t.replace(i.prefix,"")),o=s.event,a=s.payload;window.self===window.top&&i.emit(o,a),i.subscriptions.forEach((function(n){if("function"!=typeof n.callback)return null;if(o===n.event)return n.callback(a),null;var t=n.event,i=t.replace("*",".*");i+="*"!==t[t.length-1]?"$":"";var e=new RegExp(i);o.search(e)>-1&&n.callback(a)}))}))}return t.prototype.emit=function(n,t){var i=this;if(!n||"string"!=typeof n)return null;var e={event:""+this.prefix+n};t&&(e.payload=t);var r=JSON.stringify(e);window.self===window.top?function(){if(!window.frames)return null;for(var n=0;n<window.frames.length;n++){var t=window.frames[n].frameElement.contentWindow;if(!t)return null;t.postMessage(r,i.settings.origin)}}():function(){if(!window.top)return null;window.top.postMessage(r,i.settings.origin)}()},t.prototype.on=function(n,t){if(!n||"string"!=typeof n)return null;this.subscriptions.some((function(i){return i.event===n&&i.callback===t}))||this.subscriptions.push({event:n,callback:t})},t.prototype.off=function(n,t){if(!n||"string"!=typeof n)return null;this.subscriptions=this.subscriptions.filter((function(i){return i.event!==n&&i.callback!==t}))},t}();window.Framev||(window.Framev=t)})();
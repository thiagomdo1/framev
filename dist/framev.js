(()=>{"use strict";const n=function(){function n(){var n=this;this.prefix="framev:",this.subscriptions=[],window.addEventListener("message",(function(i){var t=i.data,e=i.origin;console.log(t);var r=new RegExp(n.prefix,"i");if(e!==window.location.origin)return null;if(!t||"string"!=typeof t||-1===t.search(r))return null;var o=JSON.parse(t.replace(n.prefix,"")),s=o.event,a=o.payload;window.self===window.top&&n.emit(s,a),n.subscriptions.forEach((function(n){if("function"!=typeof n.callback)return null;if(s===n.event)return n.callback(a),null;var i=n.event,t=i.replace("*",".*");t+="*"!==i[i.length-1]?"$":"";var e=new RegExp(t);s.search(e)>-1&&n.callback(a)}))}))}return n.prototype.emit=function(n,i){if(!n||"string"!=typeof n)return null;var t={event:""+this.prefix+n};i&&(t.payload=i);var e=JSON.stringify(t);window.self===window.top?function(){if(!window.frames)return null;for(var n=0;n<window.frames.length;n++){var i=window.frames[n].frameElement.contentWindow;if(!i)return null;i.postMessage(e,window.location.origin)}}():function(){if(!window.top)return null;window.top.postMessage(e,window.location.origin)}()},n.prototype.on=function(n,i){if(!n||"string"!=typeof n)return null;this.subscriptions.some((function(t){return t.event===n&&t.callback===i}))||this.subscriptions.push({event:n,callback:i})},n.prototype.off=function(n,i){if(!n||"string"!=typeof n)return null;this.subscriptions=this.subscriptions.filter((function(t){return t.event!==n&&t.callback!==i}))},n}();window.framev||(window.framev=new n)})();
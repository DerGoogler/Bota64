import { _encode, _decode } from "./core";
/**
 * Custom encoding
 */
var Bota64 = /** @class */ (function () {
    function Bota64(options) {
        this.withBase64 = options.withBase64 = false;
    }
    /**
     * @param {*} content Any text
     * @returns {string} An encoded string
     */
    Bota64.prototype.encode = function (content) {
        if (this.withBase64) {
            return window.btoa(unescape(encodeURIComponent(_encode(content))));
        }
        else {
            return unescape(encodeURIComponent(_encode(content)));
        }
    };
    /**
     * @param {*} content Any text
     * @returns {string} An decoded string
     */
    Bota64.prototype.decode = function (content) {
        if (this.withBase64) {
            return decodeURIComponent(escape(window.atob(_decode(content))));
        }
        else {
            return decodeURIComponent(escape(_decode(content)));
        }
    };
    return Bota64;
}());
export { Bota64 };

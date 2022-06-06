const { _encode, _decode } = require("./core");

/**
 * Custom encoding
 */
class Bota64 {
  constructor(options) {
    this.withBase64 = options.withBase64 = false;
  }

  /**
   * @param {*} content Any text
   * @returns {string} An encoded string
   */
  encode(content) {
    if (this.withBase64) {
      return window.btoa(unescape(encodeURIComponent(_encode(content))));
    } else {
      return unescape(encodeURIComponent(_encode(content)));
    }
  }

  /**
   * @param {*} content Any text
   * @returns {string} An decoded string
   */
  decode(content) {
    if (this.withBase64) {
      return decodeURIComponent(escape(window.atob(_decode(content))));
    } else {
      return decodeURIComponent(escape(_decode(content)));
    }
  }
}

exports.module = { Bota64, _encode, _decode };

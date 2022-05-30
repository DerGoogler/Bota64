const { _encode, _decode } = require("./core");

interface Options {
  withBase64: boolean;
}

/**
 * Custom encoding
 */
class Bota64 {
  private withBase64: boolean;

  public constructor(options: Options) {
    this.withBase64 = options.withBase64 = false;
  }

  /**
   * @param {*} content Any text
   * @returns {string} An encoded string
   */
  public encode(content: string): string {
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
  public decode(content: string): string {
    if (this.withBase64) {
      return decodeURIComponent(escape(window.atob(_decode(content))));
    } else {
      return decodeURIComponent(escape(_decode(content)));
    }
  }
}

export default Bota64;

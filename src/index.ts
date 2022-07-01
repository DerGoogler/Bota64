import { _encode, _decode } from "./core";

export interface IBota64 {
  withBase64?: boolean | undefined;
}

/**
 * Custom encoding
 */
export class Bota64 {
  private withBase64: boolean | undefined;
  constructor(options?: IBota64) {
    this.withBase64 = options?.withBase64;
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

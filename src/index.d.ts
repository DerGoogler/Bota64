interface Options {
  withBase64: boolean;
}
/**
 * Custom encoding
 */
declare class Bota64 {
  private withBase64;
  constructor(options?: Options);
  /**
   * @param {*} content Any text
   * @returns {string} An encoded string
   */
  encode(content: string): string;
  /**
   * @param {*} content Any text
   * @returns {string} An decoded string
   */
  decode(content: string): string;
}

/**
 * Returns an simple encoded string
 * @param content Given string
 */
export declare function _encode(content: string): string;

/**
 * Returns an simple decoded string
 * @param content Given encoded string
 */
export declare function _decode(content: string): string;

export default Bota64;
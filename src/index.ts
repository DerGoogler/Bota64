import pkg from "./../package.json";

/**
 * Custom encoding
 */
class Bota64 {
  private readonly TABLE: string;
  private readonly REGEX_SPACE_CHARACTERS: RegExp;
  constructor() {
    this.TABLE = "↔↕•⁄‰™€Ÿžš®©«§¥Øœµ¶×÷æÆ¢±¿─│┌┐└┘├┤┬┴┼αβγΔ∑√∫≈≠≤≥←↑→↓0123456789+/";
    this.REGEX_SPACE_CHARACTERS = /<%= spaceCharacters %>/g;
  }

  /**
   * @param {*} content Any text
   * @returns {string} An encoded string
   */
  public encode(input: string): string {
    input = String(input);
    let padding: string | number = input.length % 3;
    let output: string = "";
    let position: number = -1;
    let a: number;
    let b: number;
    let c: number;
    let buffer: number;
    // Make sure any padding is handled outside of the loop.
    let length = input.length - padding;

    while (++position < length) {
      // Read three bytes, i.e. 24 bits.
      a = input.charCodeAt(position) << 16;
      b = input.charCodeAt(++position) << 8;
      c = input.charCodeAt(++position);
      buffer = a + b + c;
      // Turn the 24 bits into four chunks of 6 bits each, and append the
      // matching character for each of them to the output.
      output +=
        this.TABLE.charAt((buffer >> 18) & 0x3f) +
        this.TABLE.charAt((buffer >> 12) & 0x3f) +
        this.TABLE.charAt((buffer >> 6) & 0x3f) +
        this.TABLE.charAt(buffer & 0x3f);
    }

    if (padding == 2) {
      a = input.charCodeAt(position) << 8;
      b = input.charCodeAt(++position);
      buffer = a + b;
      output += this.TABLE.charAt(buffer >> 10) + this.TABLE.charAt((buffer >> 4) & 0x3f) + this.TABLE.charAt((buffer << 2) & 0x3f) + "=";
    } else if (padding == 1) {
      buffer = input.charCodeAt(position);
      output += this.TABLE.charAt(buffer >> 2) + this.TABLE.charAt((buffer << 4) & 0x3f) + "==";
    }

    return output;
  }

  /**
   * @param {*} content Any text
   * @returns {string} An decoded string
   */
  public decode(input: string): string {
    input = String(input).replace(this.REGEX_SPACE_CHARACTERS, "");
    let length = input.length;
    if (length % 4 == 0) {
      input = input.replace(/==?$/, "");
      length = input.length;
    }

    let bitCounter: number = 0;
    let bitStorage: number | undefined;
    let buffer: number;
    let output: string = "";
    let position: number = -1;
    while (++position < length) {
      buffer = this.TABLE.indexOf(input.charAt(position));
      bitStorage = bitCounter % 4 ? bitStorage! * 64 + buffer : buffer;
      // Unless this is the first of a group of 4 characters…
      if (bitCounter++ % 4) {
        // …convert the first 8 bits to a single ASCII character.
        output += String.fromCharCode(0xff & (bitStorage >> ((-2 * bitCounter) & 6)));
      }
    }
    return output;
  }

  /**
   * Gets the current version of Bota64
   */
  get version(): string {
    return pkg.version;
  }
}

export default Bota64;

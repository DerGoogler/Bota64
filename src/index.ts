import pkg from "./../package.json";

namespace Core {
  export interface Interface {
    /**
     * @param {*} input Any text
     * @returns {string} An encoded string
     */
    encode(input: string, key?: string): string;

    /**
     * @param {*} input Any text
     * @returns {string} An decoded string
     */
    decode(input: string, key?: string): string;

    /**
     * Gets the current version of Bota64
     */
    version(): string;

    /**
     * Create an custom table for en- and decoding (Should be used before encoding end decoding)
     * @param table
     */
    createTable(table: string): void;

    /**
     * Uses the legacy table of first Bota64 version
     */
    useLegacyTable(): void;

    /**
     * Uses advanced encoding, enabled password usage
     * @param enabled
     */
    useAdvanced(enabled: boolean): void;

    createSpaceCharacters(spaceCharacters: RegExp): void;
  }

  /**
   * Custom encoding
   */
  export class Class implements Interface {
    private TABLE: string;
    private REGEX_SPACE_CHARACTERS: RegExp;
    private useAdvancedProperty: boolean;

    public constructor() {
      this.TABLE = "↔↕•⁄‰™€Ÿžš®©«§¥Øœµ¶×÷æÆ¢±¿─│┌┐└┘├┤┬┴┼αβγΔ∑√∫≈≠≤≥←↑→↓0123456789+/";
      this.REGEX_SPACE_CHARACTERS = /<%= spaceCharacters %>/g;
      this.useAdvancedProperty = false;
    }

    public encode(input: string, key?: string): string {
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

      if (this.useAdvancedProperty) {
        return this.advancedEncryption(output, key ? key : "");
      } else {
        return output;
      }
    }

    public decode(input: string, key?: string): string {
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

      if (this.useAdvancedProperty) {
        return this.advancedEncryption(output, key ? key : "");
      } else {
        return output;
      }
    }

    public version(): string {
      return pkg.version;
    }

    public createTable(table: string): void {
      this.TABLE = table;
    }

    public useLegacyTable(): void {
      this.TABLE = "𐓆𐓍𐒱𐒴𐒄𐑙𐑿𐑼𐒏𐒤𐓌𐓉𐓋𐓊𐓒𐓏𐓑𐓐𐒁𐒀𐒘𐒲𐓓𐒅𐒻𐒕𑫀𑫁𑫂𑫃𑫄𑫅𑫆𑫇𑫈𑫉𑫊𑫋𑫌𑫍𑫎𑫏𑫐𑫑𑫒𑫓𑫣𑫔𑫕𑫖𑫗𑫘";
    }

    public useAdvanced(enabled: boolean) {
      this.useAdvancedProperty = enabled;
    }

    private advancedEncryption(s: string, key: string) {
      const slen = s.length,
        keylen = key.length;

      let result = "";

      for (let i = 0; i < slen; i++) {
        result += String.fromCharCode(s.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }

      return result;
    }

    public createSpaceCharacters(spaceCharacters: RegExp): void {
      this.REGEX_SPACE_CHARACTERS = spaceCharacters;
    }
  }
}

/**
 * Custom encoding
 */
const bota64: Core.Interface = new Core.Class();

/**
 * Custom encoding
 */
const Bota64: typeof Core.Class = Core.Class;

/**
 * Bota64 interface declaration
 */
type IBota64 = Core.Interface;

export { Bota64, bota64, IBota64 };

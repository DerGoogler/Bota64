export interface IBota64 {
    withBase64: boolean;
}
/**
 * Custom encoding
 */
export declare class Bota64 {
    private withBase64;
    constructor(options: IBota64);
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

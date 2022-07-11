# Bota64

Simple string encryption

## Installing

```bash
npm install bota64 --save

bun add bota64

yarn add bota64
```

# Usage

Quick example

```js
import Bota64 from "bota64";

const b = new Bota64();

const e = b.encode("I like you :)");

const d = b.decode(e);

console.log(`Encoded: ${e}`); // => ¶¶↕≈─Æ≠αžŸα≥┐¶↔6®œ==

console.log(`Decoded: ${d}`); // => I like you :)
```

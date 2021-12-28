# Bota64

Simple string encryption

## Installing

```
npm install git+https://github.com/DerGoogler/Bota64.git --save
```

# Usage

Encode

```js
const encode = bota.encode("Hello World!");
console.log(encode); // => 𐑼𑫄𑫋𑫋𑫎𑁈𐓓𑫎𑫑𑫋𑫃᜵
```

Decode

```js
const decode = bota.encode("𐑼𑫄𑫋𑫋𑫎𑁈𐓓𑫎𑫑𑫋𑫃᜵");
console.log(decode); // => Hello World!
```

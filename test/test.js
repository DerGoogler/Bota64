const Bota64 = require("./../dist/index");

const bota = new Bota64({ withBase64: false });

console.log(bota.encode("Hallo"));

const axios = require('axios').default;
const images = require('./src/images.json');
const sharp = require('sharp');
const fs = require('fs');

let res = []

function toBase64(arr) {
    arr = new Uint8Array(arr) //if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }

async function createThumbnail () {
    for (let index = 0; index < images.length; index++) {
        const elm = images[index];
        let url = `${elm.url}.jpg`
        const input = (await axios({ url: url, responseType: "arraybuffer" })).data;
        const compressed = await sharp(input).resize(400,400).webp().withMetadata().toBuffer()
        const thumbnail = toBase64(compressed)
        elm["thumbnail"] = thumbnail
        //console.log(elm)
        res.push(elm)
    }
}

async function run () {
    await createThumbnail()
    const data = JSON.stringify(res, null, 2)
    fs.writeFileSync('./src/Image_thumbnails.json', data);
}

run()



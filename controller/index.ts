const fs = require("fs");
const path = require("path");

async function getSwiperImage(ctx) {
  // const homePage = fs.readFileSync(path.join(__dirname, '../assets/images'), 'utf-8');
  ctx.body = {
    code: 0,
    data: 0,
  };
}

export {
  getSwiperImage
}
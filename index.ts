import * as Koa from 'koa';
import * as http from 'http';
import * as https from 'https';
import * as static from 'koa-static';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as fs from 'fs';
import * as path from 'path';

import { init as initDB } from './db';
import router from './routes/index';

// const router = new Router();

const homePage = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const staticPath = path.join(__dirname, 'assets');

// 首页
router.get("/", async (ctx) => {
  ctx.body = homePage;
});

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(static(staticPath))
  .use(router.routes())
  .use(router.allowedMethods());

const { HTTPS = false, PORT: port = 80 } = process.env;
async function bootstrap() {
  await initDB();
  if (HTTPS) {
    /**
     * 在终端使用命令行工具生成SSL证书
     * 1. 生成私钥 (private.key): openssl genrsa -out private.key 2048
     * 2. 生成证书签名请求 (CSR): openssl req -new -key private.key -out certificate.csr
     * 3. 生成自签名证书 (certificate.crt): openssl x509 -req -days 365 -in certificate.csr -signkey private.key -out certificate.crt
     */
    const options = {
      key: fs.readFileSync(path.join(__dirname, './certificate/private.key')),
      cert: fs.readFileSync(path.join(__dirname, './certificate/certificate.crt'))
    };
    // 创建 HTTPS 服务器
    https.createServer(options, app.callback()).listen(port, () => {
      console.log('HTTPS server running on port', port);
    });
  } else {
    // 创建 HTTP 服务器
    http.createServer(app.callback()).listen(port, () => {
      console.log("启动成功", port);
    });
  }
}
bootstrap();

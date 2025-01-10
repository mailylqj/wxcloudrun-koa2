import * as Router from 'koa-router';
import { getSwiperImage } from '../controller/index';

const router = new Router();

// 获取计数
router.get('/swiperimage/get', getSwiperImage);

export default router;
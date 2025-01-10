import * as Router from 'koa-router';
import countRouter from './count';
import retailRouter from './retail';

const router = new Router();

router.use('/api', countRouter.routes(), countRouter.allowedMethods());
router.use('/retail', retailRouter.routes(), retailRouter.allowedMethods());

export default router;
import { Router } from 'express';
import { routerHandlerWrapper } from 'helper/auth';
import V1Register from './action/V1Register';
import V1Login from './action/V1Login';
import V1Read from './action/V1Read';
import V1Update from './action/V1Update';
const router = Router();

// define the about route
router.post('/register', routerHandlerWrapper(V1Register));
router.post('/login', routerHandlerWrapper(V1Login));
router.post('/read', routerHandlerWrapper(V1Read, ['admin', 'user']));
router.post('/update', routerHandlerWrapper(V1Update, ['user']));

export default router;

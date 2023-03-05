import { Router } from 'express';
import { routerHandlerWrapper } from 'helper/auth';
import V1Register from './action/V1Register';
import V1Login from './action/V1Login';
const router = Router();

// define the about route
router.post('/register', routerHandlerWrapper(V1Register));
router.post('/login', routerHandlerWrapper(V1Login));

export default router;

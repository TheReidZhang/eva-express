import { Router } from 'express';
import { routerHandlerWrapper } from 'helper/controller';
import V1Register from './actions/V1Register';
const router = Router();

// define the about route
router.post('/register', routerHandlerWrapper(V1Register, false));

export default router;

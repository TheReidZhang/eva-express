import { Router } from 'express';
import userRouter from 'app/User/routes';

const router = Router();

router.all('/', (req, res) => res.status(200).send(`Welcome to EVANGELION-EXPRESS!`));
router.use('/v1/user', userRouter);

export default router;

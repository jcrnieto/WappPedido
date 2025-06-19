import { Router } from 'express';
import { registerUserController, loginUserController, getUsersController } from './controller';

const router = Router();

router.get('/allUsers', getUsersController);
router.post('/register', registerUserController);
router.post('/login', loginUserController);


export default router;

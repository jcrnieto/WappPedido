import { Router } from 'express';
import { registerUserController, loginUserController, getUsersController, getPersonalDataByUserController } from './controller';

const router = Router();

router.get('/allUsers', getUsersController);
router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/:id/personal-data', getPersonalDataByUserController);


export default router;

import { Router } from 'express';
import { registerUserController, loginUserController, getUsersController, getPersonalDataByUserController, getUserByEmailController } from './controller';

const router = Router();

router.get('/allUsers', getUsersController);
router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/:id/personal-data', getPersonalDataByUserController);
router.get('/by-email/:email', getUserByEmailController);



export default router;

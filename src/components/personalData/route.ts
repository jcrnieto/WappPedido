import { Router } from 'express';
import { createPersonalDataController, updatePersonalDataController } from './controller';

const router = Router();


router.post('/createPersonalData', createPersonalDataController);
router.patch('/updatePersonalData/:userId', updatePersonalDataController);


export default router;

import { Router } from 'express';
import { createPersonalDataController } from './controller';

const router = Router();


router.post('/createPersonalData', createPersonalDataController);



export default router;

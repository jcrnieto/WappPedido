import { Router } from 'express';
import { createBusinessHoursController, getBusinessHoursByUserController } from './controller';

const router = Router();

router.post('/createBusinessHours', createBusinessHoursController);
router.get('/getBusinessHoursByUser/:userId', getBusinessHoursByUserController);

export default router;
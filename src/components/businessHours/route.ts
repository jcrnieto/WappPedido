import { Router } from 'express';
import { createBusinessHoursController } from './controller';

const router = Router();

router.post('/createBusinessHours', createBusinessHoursController);

export default router;
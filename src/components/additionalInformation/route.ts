import express from 'express';
import { createAdditionalInformationController, getAdditionalInformationByUserController, updateAdditionalInformationController } from './controller';

const router = express.Router();

router.post('/createAdditionalInformation', createAdditionalInformationController);
router.get('/getAdditionalInformationByUser/:user_id', getAdditionalInformationByUserController);
router.patch('/updateAdditionalInformation/:user_id', updateAdditionalInformationController);

export default router;

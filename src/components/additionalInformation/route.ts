import express from 'express';
import { 
    createAdditionalInformationController, 
    getAdditionalInformationByUserController, 
    updateAdditionalInformationController,
    removeLogoController,
    removeBrandController 
} from './controller';

const router = express.Router();

router.post('/createAdditionalInformation', createAdditionalInformationController);
router.get('/getAdditionalInformationByUser/:user_id', getAdditionalInformationByUserController);
router.patch('/updateAdditionalInformation/:user_id', updateAdditionalInformationController);
router.delete('/removeLogo/:user_id', removeLogoController);
router.delete('/removeBrand/:user_id', removeBrandController);

export default router;

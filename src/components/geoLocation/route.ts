import express from 'express';
import { geocodeAddressController } from './controller';

const router = express.Router();

router.post('/geocode', geocodeAddressController);

export default router;

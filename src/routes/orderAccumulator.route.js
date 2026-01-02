import { Router } from 'express';
import orderAccumulatorController from '../controllers/OrderAccumulator.controller.js';

const router = Router();

router.post('/', orderAccumulatorController.createOrder);
router.get('/', orderAccumulatorController.getAllOrders);
router.get('/exposures', orderAccumulatorController.getAllOrdersFinantialExposures);

export default router;
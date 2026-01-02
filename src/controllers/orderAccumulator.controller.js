import orderAccumulatorService from "../services/orderAccumulator.service.js";

class orderAccumulatorController{
    async createOrder(req,res){
        const result = await orderAccumulatorService.createOrder(req);
        return res.status(result.status).json(result.data);
    }
    async getAllOrders(req,res){
        const result = await orderAccumulatorService.getAllOrders();
        return res.status(result.status).json(result.data);
    }
    async getAllOrdersFinantialExposures(req,res){
        const result = await orderAccumulatorService.getAllOrdersFinantialExposures();
        return res.status(result.status).json(result.data);
    }
}

export default new orderAccumulatorController();
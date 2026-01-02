import prisma from "../prisma/client.js";

class OrderAccumulatorRepository{
    async createOrder(data){
        try{
            return await prisma.orderAccumulator.create(data);

        }
        catch(error){
            console.log(error)
        }
    }
   async getOrdersByAtivo(ativo) {
        return prisma.orderAccumulator.findMany({
            where: { ativo },
            select: {
                preco: true,
                quantidade: true,
                lado: true, 
            },
        });
    }   
   async getAllOrders() {
        return prisma.orderAccumulator.findMany({
            select: {
                preco: true,
                quantidade: true,
                lado: true,
                ativo:true
            },
            orderBy: {
                "ativo":"asc"
            },
        });
    }  
}

export default new OrderAccumulatorRepository();
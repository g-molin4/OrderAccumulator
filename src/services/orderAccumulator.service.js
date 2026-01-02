import orderAccumulatorRepository from "../repositories/orderAccumulator.repository.js";
import { randomUUID } from "node:crypto";



class orderAccumulatorService {
    async createOrder(req) {
        const exposicao_financeira_original = await this.calculateFinantialExposure(req.body.ativo)
        if (!this.validateAtivo(req.body.ativo)) {
            return {
                status: 404,
                data: {
                    sucesso: false,
                    erro: "Esse ativo é inválido"
                }
            }
        }
        else if (!this.validateLado(req.body.lado)) {
            return {
                status: 404,
                data: {
                    sucesso: false,
                    erro: "Esse lado é inválido"
                }
            }
        }
        else if (req.body.lado === "C" && (req.body.preco * req.body.quantidade + exposicao_financeira_original > 1000000)) {
            return {
                status: 400,
                data: {
                    sucesso: false,
                    erro: "Operação inválida. O valor da exposição financeira com a compra irá ultrapassar o limite R$1.000.000 (um milhão).",
                    exposicao_financeira: parseFloat(exposicao_financeira_original.toFixed(2))
                }
            }

        }
        else if (req.body.preco < 0.1 || req.body.preco > 1000) {
            return {
                status: 400,
                data: {
                    sucesso: false,
                    erro: "Operação inválida. O valor do preço deve ser entre 0,01 e 1.000.",
                    exposicao_financeira: parseFloat(exposicao_financeira_original.toFixed(2))
                }
            }
        }
        else if (!Number.isInteger(req.body.quantidade) || req.body.quantidade <= 0  || req.body.quantidade>=100000) {
            return {
                status: 400,
                data: {
                    sucesso: false,
                    erro: "Operação inválida. O valor da quantidade deve ser entre 1 e 100.000",
                    exposicao_financeira: parseFloat(exposicao_financeira_original.toFixed(2))
                }
            }
        }
        try {
            const newOrder = await orderAccumulatorRepository.createOrder({
                data: {
                    id: randomUUID(),
                    ativo: req.body.ativo,
                    lado: req.body.lado,
                    quantidade: req.body.quantidade,
                    preco: req.body.preco,
                }
            })
            const exposicao_financeira = await this.calculateFinantialExposure(req.body.ativo)
            return {
                status: 201,
                data: {
                    sucesso: true,
                    mensagem: "Sucesso",
                    exposicao_financeira: parseFloat(exposicao_financeira.toFixed(2))
                }
            }
        }
        catch (error) {
            return {
                status: 400,
                data: {
                    sucesso: false,
                    erro: "Erro ao inserir registro",
                    exposicao_financeira: parseFloat(exposicao_financeira_original.toFixed(2))
                }
            }
        }
    }
    async getAllOrders() {
        const orders = await orderAccumulatorRepository.getAllOrders();
        return { status: 200, data: orders }
    }
    async getAllOrdersFinantialExposures() {
        const orders = await orderAccumulatorRepository.getAllOrders();
        const allfinantialexposures = await this.calculateAllFinantialExposures(orders);
        return { status: 200, data: allfinantialexposures }
    }
    validateAtivo(ativo) {
        const ativos = ["PETR4", "VALE3", "VIIA4"]
        if (!ativos.includes(ativo)) {
            return false
        }
        return true
    }
    validateLado(lado) {
        const lados = ["C", "V"]
        if (!lados.includes(lado)) {
            return false
        }
        return true
    }
    async calculateFinantialExposure(ativo) {
        const orders = await orderAccumulatorRepository.getOrdersByAtivo(ativo);
        return orders.reduce((acc, order) => {
            const value = order.preco * order.quantidade;

            return order.lado === 'C'
                ? acc + value
                : acc - value;
        }, 0);
    }
    async calculateAllFinantialExposures(orders) {
        const resultado = {};

        for (const ordem of orders) {
            const { ativo, preco, quantidade, lado } = ordem;
            const valor = preco * quantidade;

            if (!resultado[ativo]) {
                resultado[ativo] = 0;
            }

            if (lado === "C") {
                resultado[ativo] += valor;
            } else if (lado === "V") {
                resultado[ativo] -= valor;
            }
        }

        return Object.entries(resultado).map(([ativo, exposicao]) => ({
            ativo,
            exposicao,
        }));
    }
}
export default new orderAccumulatorService();


// {
//     ativo: "PETR4" | "VALE3" | "VIIA4",
//     lado: "C" | "V",
//     quantidade: 584,
//     preco: 54.87
// }

import orderAccumulatorService from "../../src/services/orderAccumulator.service.js";
import orderAccumulatorRepository from "../../src/repositories/orderAccumulator.repository.js";
import { jest } from "@jest/globals";


jest.mock("../../src/repositories/orderAccumulator.repository.js", () => ({
  __esModule: true,
  default: {
    createOrder: jest.fn(),
    getOrdersByAtivo: jest.fn(),
    getAllOrders: jest.fn(),
  },
}));

describe("orderAcumulattorService - testa regras de negócio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure repository methods are real jest mock functions so we can set mockResolvedValue
    orderAccumulatorRepository.createOrder = jest.fn();
    orderAccumulatorRepository.getOrdersByAtivo = jest.fn();
    orderAccumulatorRepository.getAllOrders = jest.fn();
    orderAccumulatorService.calculateFinantialExposure= jest.fn()
    orderAccumulatorService.calculateFinantialExposure.mockResolvedValue(0)
  });
  it("testa se o lado é válido", async () => {
    const req = {
      body: {
        ativo: "PETR4",
        preco: 30,
        quantidade: 10,
        lado: "F"
      }
    }
    orderAccumulatorRepository.createOrder.mockResolvedValue(req.body);
    const result = await orderAccumulatorService.createOrder(req);

    expect(orderAccumulatorRepository.createOrder).toHaveBeenCalledTimes(0);
    expect(result.data.sucesso).toBe(false);
    expect(result.data.erro).toBe("Esse lado é inválido")
  });
  it("testa se o ativo é válido", async () => {
    const req = {
      body: {
        ativo: "FFFF",
        preco: 30,
        quantidade: 10,
        lado: "V"
      }
    }
    const result = await orderAccumulatorService.createOrder(req);

    expect(orderAccumulatorRepository.createOrder).toHaveBeenCalledTimes(0);
    expect(result.data.sucesso).toBe(false);
    expect(result.data.erro).toBe("Esse ativo é inválido")
  });
  it("testa se a exposição do ativo ultrapassará um milhão", async () => {
    orderAccumulatorService.calculateFinantialExposure= jest.fn()
    orderAccumulatorService.calculateFinantialExposure.mockResolvedValue(999999)
    const req = {
      body: {
        ativo: "PETR4",
        preco: 30,
        quantidade: 10,
        lado: "C"
      }
    }
    const result = await orderAccumulatorService.createOrder(req);

    expect(orderAccumulatorRepository.createOrder).toHaveBeenCalledTimes(0);
    expect(result.data.sucesso).toBe(false);
    expect(result.data.erro).toBe("Operação inválida. O valor da exposição financeira com a compra irá ultrapassar o limite R$1.000.000 (um milhão).")
  });
  it("testa se o preco está entre 0.01 e 1000", async () => {
    const req = {
      body: {
        ativo: "PETR4",
        preco: 0,
        quantidade: 10,
        lado: "C"
      }
    }
    const result = await orderAccumulatorService.createOrder(req);

    expect(orderAccumulatorRepository.createOrder).toHaveBeenCalledTimes(0);
    expect(result.data.sucesso).toBe(false);
    expect(result.data.erro).toBe("Operação inválida. O valor do preço deve ser entre 0,01 e 1.000.")
  });
  it("testa se quantidade é maior que 0", async () => {
    const req = {
      body: {
        ativo: "PETR4",
        preco: 5,
        quantidade: 0,
        lado: "C"
      }
    }
    const result = await orderAccumulatorService.createOrder(req);

    // expect("x").toBe(result);
    expect(orderAccumulatorRepository.createOrder).toHaveBeenCalledTimes(0);
    expect(result.data.sucesso).toBe(false);
    expect(result.data.erro).toBe("Operação inválida. O valor da quantidade deve ser entre 1 e 100.000")
  });
  it("testa se o order foi gerado", async () => {
    const req = {
      body: {
        ativo: "PETR4",
        preco: 30,
        quantidade: 10,
        lado: "C"
      }
    }
    orderAccumulatorRepository.createOrder.mockResolvedValue(req.body);
    const result = await orderAccumulatorService.createOrder(req);

    expect(orderAccumulatorRepository.createOrder).toHaveBeenCalledTimes(1);
    expect(result.data.sucesso).toBe(true);
    expect(result.data.mensagem).toBe("Sucesso");
    expect(result.status).toBe(201);
  });

}); 
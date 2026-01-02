import request from "supertest";
import app from "../../src/app.js";

describe("POST /order", () => {

  it("deve criar uma ordem e retornar 201", async () => {
    const response = await request(app)
      .post("/order")
      .send({
        ativo: "VALE3",
        preco: 65,
        quantidade: 5,
        lado: "C"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("mensagem");
  });
});
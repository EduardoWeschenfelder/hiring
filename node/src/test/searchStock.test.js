import api from "../helpers/api";

describe("Testes de rotas", () => {
  test("Buscar cotação atual IBM", async () => {
    const { data } = await api.get("/stocks/IBM/quote");

    expect(data).toBeTruthy();
    expect(data.name).toBe("IBM");
    expect(data.lastPrice).toBeTruthy();
    expect(data.pricedAt).toBeTruthy();
  });

  test("Buscar Histórico da IBM de 2022-02-07 á 2022-02-11 ", async () => {
    const { data } = await api.get(
      "/stocks/IBM/history?from=2022-02-07&to=2022-02-11"
    );

    expect(data).toBeTruthy();
    expect(data.name).toBe("IBM");
    expect(data.prices.length).toBe(4);
  });

  test("Buscar Buscar projeção de ganhos ou perdas da IBM compra feita em 2021-12-14", async () => {
    const { data } = await api.get(
      "/stocks/IBM/gains?purchasedAmount=10&purchasedAt=2021-12-14"
    );
    expect(data).toBeTruthy();
    expect(data.name).toBe("IBM");
    expect(data.purchasedAmount).toEqual(10);
    expect(data.purchasedAt).toBe("2021-12-14");
  });
});

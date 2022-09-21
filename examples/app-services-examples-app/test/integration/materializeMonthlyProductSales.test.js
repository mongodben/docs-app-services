const { connectToMongoDbClient } = require("./utils");

describe("Materialize monthly product sales", () => {
  let client;
  beforeAll(async () => {
    client = connectToMongoDbClient();
  });
  afterAll(async () => {
    await client.close();
  });
  test("Should materialize sales", async () => {
    const sales = client.db("store").collection("sales");

    const productId = "pizza";
    const amountUsd = 3;
    const timeOfSale2 = new Date(2022, 9, 15);
    const timeOfSale1 = new Date(2022, 9, 20);
    const pizzaSale1 = { productId, timeOfSale: timeOfSale1, amountUsd };
    const pizzaSale2 = { productId, timeOfSale: timeOfSale2, amountUsd };
    await sales.insertMany([pizzaSale1, pizzaSale2]);
  });
});

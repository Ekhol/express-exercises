process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app")
let items = require("../fakeDb")
let item = { name: 'test', price: 25 }

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items = []
});

describe("GET /items", function () {
    test("List all items", async function () {
        const res = await request(app).get(`/items`);
        const { items } = res.body;
        expect(res.statusCode).toBe(200)
        expect(items).toHaveLength(1);
    });
});

describe("GET /items/:name", function () {
    test("List one item", async function () {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });

    test("Throw 404 if can't find", async function () {
        const res = await request(app).get(`/items/0`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", function () {
    test("Adds new item", async function () {
        const res = await request(app).post(`/items`).send({ name: "toilet paper", price: 5 });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("toilet paper");
        expect(res.body.item.price).toEqual(5);
    });
});

describe("PATCH /items/:name", function () {
    test("Updates one item", async function () {
        const res = await request(app).patch(`/items/${item.name}`).send({ name: "mayonnaise" });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({ name: "mayonnaise" });
    });
    test("Throw 404 if can't find", async function () {
        const res = await request(app).patch(`/items/0`);
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Deletes single item", async function () {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
});
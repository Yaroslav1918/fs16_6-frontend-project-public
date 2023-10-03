import server from "../shared/server";
import { productsData } from "../data/productsData";
import { CreateProductInput } from "../../types/CreateProductInput";
import { UpdateProductInput } from "../../types/UpdateProductInput";
import { createStore } from "../../redux/store";
import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductAsync,
  fetchCategoriesAsync,
  fetchSingleAsync,
  updateProductAsync,
} from "../../redux/product/productOperations";
import productReducer, {
  initialState,
  sortByPrice,
} from "../../redux/product/produtSlice";

let store = createStore();
beforeEach(() => {
  store = createStore();
});
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());
describe("Test normal actions in productsReducer", () => {
  test("Should sort products by price desc", () => {
    const state = {
      ...initialState,
      products: productsData,
    };
    const products = productReducer(state, sortByPrice("desc")).products;
    expect(products[0].price).toBe(987);
    expect(products[1].price).toBe(635);
    expect(products[2].price).toBe(551);
  });

  test("Should sort products by price asc", () => {
    const state = {
      ...initialState,
      products: productsData,
    };
    const products = productReducer(state, sortByPrice("asc")).products;
    expect(products[0].price).toBe(551);
    expect(products[1].price).toBe(635);
    expect(products[2].price).toBe(987);
  });
});

describe("Test async thunk actions in productsReducer", () => {
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProductAsync());
    expect(store.getState().productReducer.products.length).toBeGreaterThan(1);
  });

  test("Should fetch single product", async () => {
    await store.dispatch(fetchSingleAsync(1));
    expect(
      Object.keys(store.getState().productReducer.singleProduct).length
    ).toBeGreaterThan(0);
  });

  test("Should fetch categories", async () => {
    await store.dispatch(fetchCategoriesAsync());
    expect(store.getState().productReducer.categories.length).toBeGreaterThan(
      0
    );
  });

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(1));
    expect(resultAction.payload).toBe(1);
  });

  test("Should delete an non-existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(60));
    expect(resultAction.payload).toBe("Cannot delete");
  });

  test("should create new Product", async () => {
    const input: CreateProductInput = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 3,
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
    const resultAction = await store.dispatch(createProductAsync(input));
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });

  test("Should update product", async () => {
    const input: UpdateProductInput = {
      id: 1,
      update: {
        price: 200,
        title: "Newly updated product",
      },
    };
    const action = await store.dispatch(updateProductAsync(input));
    const priceValue = action.payload as { price: number };
    expect(priceValue.price).toBe(200);
  });
});

import { productsData } from "../data/productsData";
import { CreateProductInput } from "../../types/CreateProductInput";
import { UpdateProductInput } from "../../types/UpdateProductInput";
import { createStore } from "../../redux/store";
import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductAsync,
  fetchSingleAsync,
  updateProductAsync,
} from "../../redux/product/productOperations";
import productSlice, {
  initialState,
  sortByPrice,
} from "../../redux/product/produtSlice";
import productServer from "../shared/productServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});
// Enable API mocking before tests.
beforeAll(() => productServer.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => productServer.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => productServer.close());
describe("Test normal actions in productsReducer", () => {
  test("Should sort products by price desc", () => {
    const state = {
      ...initialState,
      products: productsData,
    };
    const products = productSlice(state, sortByPrice("desc")).products;
    expect(products[0].price).toBe(987);
    expect(products[1].price).toBe(635);
    expect(products[2].price).toBe(551);
  });

  test("Should sort products by price asc", () => {
    const state = {
      ...initialState,
      products: productsData,
    };
    const products = productSlice(state, sortByPrice("asc")).products;
    expect(products[0].price).toBe(551);
    expect(products[1].price).toBe(635);
    expect(products[2].price).toBe(987);
  });
});

describe("Test async  product thunk actions in productsReducer", () => {
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProductAsync());
    expect(store.getState().productSlice.products.length).toBeGreaterThan(1);
  });

  test("Should fetch single product", async () => {
    await store.dispatch(fetchSingleAsync("1"));
    expect(
      Object.keys(store.getState().productSlice.singleProduct).length
    ).toBeGreaterThan(0);
  });

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync("1"));
    expect(resultAction.payload).toBe(1);
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });

  test("Should delete an non-existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync("2000"));
    expect(resultAction.meta.requestStatus).toBe("rejected");
  });

  test("should create new Product", async () => {
    const input: CreateProductInput = {
      name: "test product",
      description: "test product",
      price: 100,
      categoryId: "3",
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
    const resultAction = await store.dispatch(createProductAsync(input));
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });

  test("Should update product", async () => {
    const input: UpdateProductInput = {
      _id: "1",
      update: {
        price: 200,
        name: "Newly updated product",
      },
    };
    const action = await store.dispatch(updateProductAsync(input));
    const priceValue = action.payload as { price: number };
    expect(priceValue.price).toBe(200);
  });
});



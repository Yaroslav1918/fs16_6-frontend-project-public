import { productsData } from "../data/productsData";
import { CreateProductInput } from "../../types/CreateProductInput";
import { UpdateProductInput } from "../../types/UpdateProductInput";
import { createStore } from "../../redux/store";
import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductAsync,
  fetchCategoriesAsync,
  fetchCreateCategoryAsync,
  fetchDeleteCategoryAsync,
  fetchSingleAsync,
  fetchUptadeCategoryAsync,
  updateProductAsync,
} from "../../redux/product/productOperations";
import productReducer, {
  initialState,
  sortByPrice,
} from "../../redux/product/produtSlice";
import productServer from "../shared/productServer";
import { CategoryInput } from "../../types/CategoryInput";
import { UpdateCategoryInput } from "../../types/UpdateCategoryInput";

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

describe("Test async  product thunk actions in productsReducer", () => {
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

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(1));
    expect(resultAction.payload).toBe(1);
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });

  test("Should delete an non-existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(2000));
    expect(resultAction.meta.requestStatus).toBe("rejected");
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

describe("Test async category thunk actions in productsReducer", () => {
  test("Should fetch categories", async () => {
    await store.dispatch(fetchCategoriesAsync());
    expect(store.getState().productReducer.categories.length).toBeGreaterThan(
      0
    );
  });

  test("Should create category", async () => {
    const input: CategoryInput = {
      name: "text",
      image: "https://i.imgur.com/O1LUkwy.jpeg",
    };
    const resultAction = await store.dispatch(fetchCreateCategoryAsync(input));
    expect(store.getState().productReducer.categories.length).toBeGreaterThan(
      0
    );
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });

  test("Should update category", async () => {
    const input: UpdateCategoryInput = {
      id: 1,
      update: {
        name: "newName",
      },
    };
    const resultAction = await store.dispatch(fetchUptadeCategoryAsync(input));
    expect(resultAction.payload.name).toBe(input.update.name);
  });

  test("Should delete category", async () => {
    const resultAction = await store.dispatch(fetchDeleteCategoryAsync(1));
    expect(resultAction.payload).toBe(1);
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });
});

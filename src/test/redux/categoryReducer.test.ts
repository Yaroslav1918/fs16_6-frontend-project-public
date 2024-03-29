import { createStore } from "../../redux/store";
import categoryServer from "../shared/categoryServer";
import { CategoryInput } from "../../types/CategoryInput";
import { UpdateCategoryInput } from "../../types/UpdateCategoryInput";
import {
  fetchCategoriesAsync,
  fetchCreateCategoryAsync,
  fetchDeleteCategoryAsync,
  fetchUptadeCategoryAsync,
} from "../../redux/category/categoryOperations";

let store = createStore();
beforeEach(() => {
  store = createStore();
});
// Enable API mocking before tests.
beforeAll(() => categoryServer.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => categoryServer.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => categoryServer.close());

describe("Test async category thunk actions in categorySlice", () => {
  test("Should fetch categories", async () => {
    await store.dispatch(fetchCategoriesAsync());
    expect(store.getState().categorySlice.categories.length).toBeGreaterThan(0);
  });

  test("Should create category", async () => {
    const input: CategoryInput = {
      name: "text",
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    };
  const actionResult = await store.dispatch(fetchCreateCategoryAsync(input));
    expect(actionResult.payload).toMatchObject({
      _id: 7,
      name: "text",
      images: ["https://i.imgur.com/O1LUkwy.jpeg"],
    });

  });

  test("Should update category", async () => {
    const input: UpdateCategoryInput = {
      _id: "1",
      update: {
        name: "newName4",
        images: ["https://i.pp.com/nZnWUc0.jpeg"],
      },
    };
    const actionResult = await store.dispatch(fetchUptadeCategoryAsync(input));
    expect(actionResult.payload).toMatchObject({
      _id: "1",
      name: "newName4",
      images: ["https://i.pp.com/nZnWUc0.jpeg"],
    });
  });

  test("Should delete category", async () => {
    const resultAction = await store.dispatch(fetchDeleteCategoryAsync("1"));
    expect(resultAction.payload).toBe("1");
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });
});

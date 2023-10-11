import { createStore } from "../../redux/store";
import operations from "../../redux/user/userOperations";
import userSlice, { initialState, logOut } from "../../redux/user/userSlice";
import { SignUpInput } from "../../types/SignUpInput";
import { UptadeUserInput } from "../../types/UptadeUserInput";
import { usersData } from "../data/usersData";
import server from "../shared/userServer";
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

describe("Test userSlice normal action", () => {
  test("Should logout", () => {
    const resultAction = userSlice(initialState, logOut());
    expect(resultAction).toMatchObject(initialState);
  });
});

describe("Test usersReducer async actions", () => {
  test("Should fetch all users", async () => {
    await store.dispatch(operations.fetchUsersAsync());
    expect(store.getState().userSlice.users.length).toBe(3);
  });

  test("Should login user with right credential", async () => {
    await store.dispatch(
      operations.fetchlogInAsync({
        email: "john@mail.com",
        password: "changeme",
      })
    );
    expect(store.getState().userSlice.token).toBe("my-access-token_1");
  });

  test("Should authenticate witg right token", async () => {
    await store.dispatch(
      operations.fetchlogInAsync({
        email: "john@mail.com",
        password: "changeme",
      })
    );
    await store.dispatch(operations.fetchCurrentUser());
    expect(store.getState().userSlice.currentUser).toMatchObject(usersData[0]);
  });

  test("Should uptade a user", async () => {
    const input: UptadeUserInput = {
      update: {
        name: "Petro",
        email: "petro@mail.com",
      },
      id: 1,
    };
    const action = await store.dispatch(operations.fetchUptadeUserAsync(input));
    expect(action.payload).toMatchObject({
      email: "petro@mail.com",
      name: "Petro",
    });
  });

  test("Should register a user", async () => {
    const input: SignUpInput = {
      name: "Petro",
      email: "petro@mail.com",
      password: "1234567",
      avatar: "someUrl",
    };
    await store.dispatch(operations.fetchRegisterAsync(input));
    expect(
      Object.keys(store.getState().userSlice.currentUser).length
    ).toBeGreaterThan(0);
  });

  test("Should not register a user with exist email", async () => {
    const input: SignUpInput = {
      name: "Petro",
      email: "john@mail.com",
      password: "1234567",
      avatar: "someUrl",
    };
    const action = await store.dispatch(operations.fetchRegisterAsync(input));
    expect(action.meta.requestStatus).toBe("rejected");
  });
});

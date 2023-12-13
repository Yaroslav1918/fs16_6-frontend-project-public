import { createStore } from "../../redux/store";
import {
  fetchByIdUser,
  fetchCreateUserAsync,
  fetchRegisterAsync,
  fetchUDeleteUserAsync,
  fetchUptadeUserAsync,
  fetchUsersAsync,
  fetchlogInAsync,
} from "../../redux/user/userOperations";
import userSlice, { initialState, logOut } from "../../redux/user/userSlice";
import { SignUpInput } from "../../types/SignUpInput";
import { UptadeUserInput } from "../../types/UptadeUserInput";
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
    await store.dispatch(fetchUsersAsync());
    expect(store.getState().userSlice.users.length).toBe(3);
  });

  test("Should login user with right credential", async () => {
    const action = await store.dispatch(
      fetchlogInAsync({
        email: "john@mail.com",
        password: "changeme",
      })
    );
    expect(action.payload).toMatchObject({
      access_token: "my-access-token_1",
    });
  });

  test("Should uptade a user", async () => {
    const input: UptadeUserInput = {
      update: {
        name: "Petro",
        email: "petro@mail.com",
      },
      _id: "1",
    };
    const action = await store.dispatch(fetchUptadeUserAsync(input));
    expect(action.payload).toMatchObject({
      _id: "1",
      email: "petro@mail.com",
      password: "changeme",
      name: "Petro",
      role: "USER",
      avatar: "https://i.imgur.com/DumuKkD.jpeg",
      isGoogleLoggedIn: false,
    });
  });

  test("Should register a user", async () => {
    const input: SignUpInput = {
      name: "Petro",
      email: "petro@mail.com",
      password: "1234567",
      avatar: "someUrl",
    };
    const action = await store.dispatch(fetchRegisterAsync(input));
    expect(action.payload).toMatchObject({
      id: 4,
      name: "Petro",
      email: "petro@mail.com",
      avatar: "someUrl",
    });
    expect(action.type).toBe("auth/signUp/fulfilled");
  });

  test("Should not register a user with exist email", async () => {
    const input: SignUpInput = {
      name: "Petro",
      email: "john@mail.com",
      password: "1234567",
      avatar: "someUrl",
    };
    const action = await store.dispatch(fetchRegisterAsync(input));
    expect(action.meta.requestStatus).toBe("rejected");
  });

  test("Should not  create user with existing email", async () => {
    const input: SignUpInput = {
      name: "Petro",
      email: "maria@mail.com",
      password: "1234567",
      avatar: "someUrl",
    };
    const action = await store.dispatch(fetchCreateUserAsync(input));
    expect(action.payload).toBe("Cannot create user");
  });

  test("Should  create user", async () => {
    const input: SignUpInput = {
      name: "Petro",
      email: "maria19@mail.com",
      password: "1234567",
      avatar: "someUrl",
    };
    const action = await store.dispatch(fetchCreateUserAsync(input));
    expect(action.payload).toMatchObject(input);
  });

  test("Should not delete user with wrong id", async () => {
    const resultAction = await store.dispatch(fetchUDeleteUserAsync("111"));
    expect(resultAction.meta.requestStatus).toBe("rejected");
  });

  test("Should  delete user", async () => {
    const resultAction = await store.dispatch(fetchUDeleteUserAsync("1"));
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
  });

  test("Should  return user by id", async () => {
    const resultAction = await store.dispatch(fetchByIdUser("1"));
    expect(resultAction.meta.requestStatus).toBe("fulfilled");
    expect(resultAction.payload).toMatchObject({
      _id: "1",
      email: "john@mail.com",
      password: "changeme",
      name: "Jhon",
      role: "USER",
      avatar: "https://i.imgur.com/DumuKkD.jpeg",
      isGoogleLoggedIn: false,
    });
  });

   test("Should not  return user with wrong id", async () => {
     const resultAction = await store.dispatch(fetchByIdUser("1111"));
     expect(resultAction.payload).toBe("User is not found");
     
   });
});

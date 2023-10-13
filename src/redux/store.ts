import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/lib/types";
import productSlice from "./product/produtSlice";
import cartSlice from "./cart/cartSlice";
import userSlice from "./user/userSlice";
import categorySlice from "./category/categorySlice";

const persisConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["cartSlice", "userSlice"],
};

const rootReducer = combineReducers({
  productSlice,
  cartSlice,
  userSlice,
  categorySlice,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);
export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const store = createStore();
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
setupListeners(store.dispatch);
export default store;

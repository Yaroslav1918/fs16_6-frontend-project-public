import cartSlice, {
  addItemToCart,
  initialState,
  removeItemFromCart,
} from "../../redux/cart/cartSlice";
import { Cart } from "../../types/Cart";
import { product } from "../data/Product";

describe("Test normal actions in cartReducer", () => {
  test("Should add product to cart", () => {
    const state = cartSlice(initialState, addItemToCart(product));
    expect(state.totalQuantity).toBe(1);
    expect(state.cartProductItems[0]).toEqual({
      ...product,
      totalPrice: product.price * product.quantity,
    });
  });

  test("Should remove product from cart", () => {
    const state: Cart = {
      cartProductItems: [product],
      totalQuantity: 1,
    };
    const resultState = cartSlice(state, removeItemFromCart(product.id));
    expect(resultState.totalQuantity).toBe(0);
    expect(resultState.cartProductItems).toHaveLength(0);
  });
});

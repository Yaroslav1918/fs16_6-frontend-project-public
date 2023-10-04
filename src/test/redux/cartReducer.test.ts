import cartSlice, {
  addItemToCart,
  initialState,
  removeItemFromCart,
} from "../../redux/cart/cartSlice";
import { Cart } from "../../types/Cart";
import { product } from "../data/Product";

describe("Test normal actions in cartReducer", () => {
  test("Should add product to cart", () => {
    const nextState = cartSlice(initialState, addItemToCart(product));
    expect(nextState.totalQuantity).toBe(1);
    expect(nextState.cartProductItems[0]).toEqual({
      ...product,
      totalPrice: product.price * product.quantity,
    });
  });

  test("Should remove product from cart", () => {
    const state: Cart = {
      cartProductItems: [product],
      totalQuantity: 1,
    };
    const nextState = cartSlice(state, removeItemFromCart(product.id));
    expect(nextState.totalQuantity).toBe(0);
    expect(nextState.cartProductItems).toHaveLength(0);
  });
});

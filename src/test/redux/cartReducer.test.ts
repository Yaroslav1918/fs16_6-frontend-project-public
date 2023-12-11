import { initialState } from "./../../redux/cart/cartSlice";
import { productsData } from "./../data/productsData";
import cartSlice, {
  addItemToCart,
  decreaseQuantity,
  resetToInitialState,
  increaseQuantity,
  removeItemFromCart,
} from "../../redux/cart/cartSlice";
import { cartData } from "../data/cartData";
describe("Test cartSlice normal action", () => {
  test("Should add new product to cart", () => {
    const cart = cartSlice(initialState, addItemToCart(productsData[1]));
    expect(cart.cartProductItems.length).toBe(1);
  });
  test("Should not add but increase same product in cart", () => {
    const cart = cartSlice(
      cartData,
      addItemToCart(cartData.cartProductItems[1])
    );
    expect(cart.cartProductItems.length).toBe(2);
    expect(cart.cartProductItems[1].quantity).toBe(3);
  });
  test("Should increase product quantity", () => {
    const cart = cartSlice(cartData, increaseQuantity("1"));
    expect(cart.cartProductItems[0].quantity).toBe(2);
  });
  test("Should decrease product quantity", () => {
    const cart = cartSlice(cartData, decreaseQuantity("2"));
    expect(cart.cartProductItems[1].quantity).toBe(1);
  });
  test("Should remove when quantity is 0", () => {
    const cart = cartSlice(cartData, decreaseQuantity("1"));
    expect(cart.cartProductItems.length).toBe(1);
  });
  test("Should remove product from cart", () => {
    const cart = cartSlice(cartData, removeItemFromCart("2"));
    expect(cart.cartProductItems.length).toBe(1);
    expect(cart.cartProductItems[0]._id).toBe("1");
  });
  test("Should empty cart", () => {
    const cart = cartSlice(cartData, resetToInitialState());
    expect(cart.cartProductItems.length).toBe(0);
  });
});

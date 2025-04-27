import { Cart } from "../src/models/Cart";
import {
  addProductToCatalog,
  clearProductCatalog,
} from "../src/models/Product";
import { describe, it, expect, beforeEach } from "vitest";

describe("Cart Service", () => {
  beforeEach(() => {
    addProductToCatalog({ id: 1, name: "Test-shirt", price: 200 });
  });

  it("should add product to cart successfully", () => {
    const cart = new Cart();
    cart.addProduct(1, 2);
    expect(cart.listItems().length).toBe(1);
    expect(cart.totalItemCount()).toBe(2);
  });

  it("should throw error if adding non-existent product", () => {
    const cart = new Cart();
    expect(() => cart.addProduct(999, 1)).toThrow("Product ID 999 not found.");
  });
});

import { Cart } from "./models/Cart";
import { addProductToCatalog, Product } from "./models/Product";
import { FixedDiscount, PercentageDiscount } from "./models/Discount";
import { Freebie } from "./models/Freebie";

// Add products
const p1: Product = { id: 1, name: "T-shirt", price: 100 };
const p2: Product = { id: 2, name: "Hat", price: 200 };
const p3: Product = { id: 3, name: "Miku figure", price: 3000 };

addProductToCatalog(p1);
addProductToCatalog(p2);
addProductToCatalog(p3);

const cart = new Cart();
cart.addProduct(1, 2);
cart.addProduct(2, 1);
cart.addProduct(3, 10);

const freebie: Freebie = { triggerProductId: 3, freeProductId: 1, qty: 2 };

cart.applyFreebie(freebie);
cart.processFreebies();

// Discounts
const discount1: FixedDiscount = {
  type: "fixed",
  amount: 150,
  name: "testdiscount1",
};
const discount2: PercentageDiscount = {
  type: "percentage",
  percentage: 10,
  maxDiscount: 100,
  name: "testdiscount2",
};
cart.applyDiscount(discount1);
cart.applyDiscount(discount2);

// Output
console.log("Cart items: ", cart.listItems());
console.log("Unique items: ", cart.uniqueItemCount());
console.log("Total item count:", cart.totalItemCount());
console.log("Cart subtotal after discount:", cart.getTotal());

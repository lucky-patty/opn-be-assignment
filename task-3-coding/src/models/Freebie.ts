import { CartItem } from "./Cart";
import { getProductById } from "./Product";

export type Freebie = {
  triggerProductId: number;
  freeProductId: number;
  qty: number;
};

// Add freebie to the cart items map
export function processFreebies(
  items: CartItem[],
  freebies: Freebie[],
): CartItem[] {
  const updatedItems = [...items];

  freebies.forEach((freebie) => {
    const triggerExists = updatedItems.some(
      (item) => item.product.id === freebie.triggerProductId,
    );
    if (triggerExists) {
      const existingFreeItem = updatedItems.find(
        (item) => item.product.id === freebie.freeProductId,
      );
      if (existingFreeItem) {
        existingFreeItem.qty += freebie.qty;
      } else {
        const freeProduct = getProductById(freebie.freeProductId);
        if (freeProduct) {
          updatedItems.push({
            product: freeProduct,
            qty: freebie.qty,
          });
        }
      }
    }
  });

  return updatedItems;
}

//export function processFreebies(
//  items: Map<number, number>,
//  freebies: Freebie[],
//): Map<number, number> {
//  const updated = new Map(items);
//  freebies.forEach((fb) => {
//    if (updated.has(fb.triggerProductId)) {
//      const freeQty = updatedItem.get(fb.freeProductId) || 0;
//      updatedItems.set(fb.freeProductId, freeQty, fb.qty);
//    }
//  });
//  return updated;
//}

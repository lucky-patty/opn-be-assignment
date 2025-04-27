import { Discount, calculateTotalDiscount } from "./Discount";
import { Freebie, processFreebies } from "./Freebie";
import { Product, getProductById } from "./Product";

interface CartItem {
  product: Product;
  qty: number;
}

export class Cart {
  private items: CartItem[] = [];
  private discounts: Discount[] = [];
  private freebies: Freebie[] = [];

  // Cart operations
  addProduct(productId: number, qty: number): void {
    const product = getProductById(productId);
    if (!product) {
      throw new Error(`Product ID ${productId} not found.`);
    }

    const existingItem = this.items.find(
      (item) => item.product.id === productId,
    );
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      this.items.push({ product, qty });
    }
  }

  updatedProduct(productId: number, qty: number): void {
    if (qty <= 0) {
      this.items = this.items.filter((item) => item.product.id !== productId);
      return;
    }

    const existingItem = this.items.find(
      (item) => item.product.id === productId,
    );
    if (existingItem) {
      existingItem.qty = qty;
    } else {
      const product = getProductById(productId);
      if (product) {
        this.items.push({ product, qty });
      } else {
        throw new Error(`Product ID ${productId} not found.`);
      }
    }
  }

  removeProduct(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  destroy(): void {
    this.items = [];
    this.discounts = [];
    this.freebies = [];
  }

  // Util
  hasProduct(productId: number): boolean {
    return this.items.some((item) => item.product.id === productId);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  listItems(): CartItem[] {
    return this.items;
  }

  uniqueItemCount(): number {
    return this.items.length;
  }

  totalItemCount(): number {
    return this.items.reduce((total, item) => total + item.qty, 0);
  }

  // Discounts
  applyDiscount(discount: Discount): void {
    this.discounts.push(discount);
  }

  removeDiscount(name: string): void {
    this.discounts = this.discounts.filter((d) => d.name !== name);
  }

  private calculateSub(): number {
    return this.items.reduce(
      (subtotal, item) => subtotal + item.qty * item.product.price,
      0,
    );
  }

  getTotal(): number {
    const sub = this.calculateSub();
    const discount = calculateTotalDiscount(sub, this.discounts);
    return Math.max(sub - discount, 0);
  }

  // Freebie
  applyFreebie(freebie: Freebie): void {
    this.freebies.push(freebie);
  }

  processFreebies(): void {
    this.items = processFreebies(this.items, this.freebies);
  }
}

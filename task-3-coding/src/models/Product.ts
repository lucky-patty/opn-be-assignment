export interface Product {
  id: number;
  name: string;
  price: number;
}

//export const ProductCatelog: Product[] = [
//  { id: 1, name: "T-shirt", price: 200 },
//  { id: 2, name: "Jeans", price: 1500 },
//  { id: 3, name: "Hat (Freebie)", price: 300 },
//  { id: 4, name: "Shoes", price: 2500 },
//  { id: 5, name: "Jacket", price: 3200 },
//];
//

export const ProductCatalog: Product[] = [];

export function getProductById(productId: number): Product | undefined {
  return ProductCatalog.find((pd) => pd.id === productId);
}

export function addProductToCatalog(product: Product): void {
  ProductCatalog.push(product);
}

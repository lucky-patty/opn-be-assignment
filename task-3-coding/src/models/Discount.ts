export interface BaseDiscount {
  name: string;
}

export interface FixedDiscount extends BaseDiscount {
  type: "fixed";
  amount: number;
}

export interface PercentageDiscount extends BaseDiscount {
  type: "percentage";
  percentage: number;
  maxDiscount: number;
}

export type Discount = FixedDiscount | PercentageDiscount;

export function calculateTotalDiscount(
  subTotal: number,
  discounts: Discount[],
): number {
  return discounts.reduce((total, discount) => {
    if (discount.type === "fixed") {
      return total + discount.amount;
    } else if (discount.type === "percentage") {
      const percent = (subTotal * discount.percentage) / 100;
      return total + Math.min(percent, discount.maxDiscount);
    }
    return total;
  }, 0);
}

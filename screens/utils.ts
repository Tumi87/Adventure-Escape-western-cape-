export const VAT_RATE = 0.15;

export const rand = (n: number) =>
  `R ${n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// VAT amount on a price that excludes VAT
export const vatOn = (amount: number) => amount * VAT_RATE;
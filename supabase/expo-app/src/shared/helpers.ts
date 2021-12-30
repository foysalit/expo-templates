// TODO: convert this to use real lang
export const getDisplayablePrice = (price: number): string => {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

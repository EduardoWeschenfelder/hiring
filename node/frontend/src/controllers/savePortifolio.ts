interface IStock {
  name: string;
  lastPrice: string;
  pricedAt: string;
}
const portifolio: any = {};

export const addStockToPortifolio = ({ name, lastPrice, pricedAt }: IStock) => {
  if (!portifolio[name]) {
    portifolio[name] = { lastPrice, pricedAt };
  }
  console.log({ portifolio });
};

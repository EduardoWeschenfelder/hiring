import React, { FC } from "react";

export const PlaceItem: FC<{
  name: string;
  lastPrice: string;
  pricedAt: string;
}> = ({ name, lastPrice, pricedAt }) => (
  <div className="relative rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 hover:shadow hover:bg-white">
    <div className="flex-1 min-w-0">
      <span className="absolute inset-0" aria-hidden="true" />
      <p className="text-sm font-medium text-blue-800">{name}</p>
      <p className="text-md my-2 text-gray-500">{lastPrice}</p>
      <p className="text-sm text-gray-400">{pricedAt}</p>
    </div>
  </div>
);

export const HistoryItem: FC<{
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}> = ({ opening, low, high, closing, pricedAt }) => (
  <div className="relative rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 hover:shadow hover:bg-white">
    <div className="flex-1 min-w-0">
      <span className="absolute inset-0" aria-hidden="true" />
      <p className="text-sm text-gray-600">Day: {pricedAt}</p>
      <p className="text-sm text-gray-500">opening: {opening}</p>
      <p className="text-sm text-gray-500">low: {low}</p>
      <p className="text-sm text-gray-500">high: {high}</p>
      <p className="text-sm text-gray-500">closing: {closing}</p>
    </div>
  </div>
);
export const ProjectGains: FC<{
  capitalGains: number;
  lastPrice: number;
  priceAtDate: number;
  purchasedAmount: number;
  name: string;
  purchasedAt: string;
}> = ({
  capitalGains,
  lastPrice,
  priceAtDate,
  purchasedAmount,
  name,
  purchasedAt,
}) => (
  <div className="relative rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 hover:shadow hover:bg-white">
    <div className="flex-1 min-w-0">
      <span className="absolute inset-0" aria-hidden="true" />
      <p className="text-sm text-gray-500">Name: {name}</p>
      <p className="text-sm text-gray-600">Day: {purchasedAt}</p>
      <p className="text-sm text-gray-500">capitalGains: {capitalGains}</p>
      <p className="text-sm text-gray-500">lastPrice: {lastPrice}</p>
      <p className="text-sm text-gray-500">priceAtDate: {priceAtDate}</p>
      <p className="text-sm text-gray-500">
        purchasedAmount: {purchasedAmount}
      </p>
    </div>
  </div>
);

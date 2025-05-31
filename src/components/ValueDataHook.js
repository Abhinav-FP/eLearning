import React from 'react';

export const formatMultiPrice = (amount, currency) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Valuedata = () => {
  return (
    <>
    </>
  );
}

export default Valuedata;

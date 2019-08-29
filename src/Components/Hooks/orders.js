import { useState } from "react";

export const useOrders = (initialValue = []) => {
  const [orders, setOrders] = useState(initialValue);
  return {
    orders,
    addOrder: order => {
      console.log(order);
      setOrders(orders.concat(order));
    },
    removeOrder(id) {
      setOrders(orders.filter((order, index) => id !== index));
    },
  };
};

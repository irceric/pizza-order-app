// Filename: hooks/orders.js
import { useState } from "react";

export const useOrders = (initialValue = []) => {
  const [orders, setOrders] = useState(initialValue);
  console.info("orders in hooks", orders);
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

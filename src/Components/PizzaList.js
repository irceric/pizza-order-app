import React, { memo, useState } from "react";
import { List, Typography, CardContent, Card, CardActions } from "@material-ui/core";
import Pizza from "./Pizza";

const PizzaList = memo(props => {
  const totalAmount =
    props.orders && props.orders.length > 0
      ? props.orders.reduce((total, order) => total + order.subtotal * 1.0, 0).toFixed(2)
      : 0;
  return (
    <Card elevation={0}>
      <CardContent style={{ padding: 10 }}>
        <Typography variant="h3">Your Cart</Typography>
        <List dense component="div" role="list">
          {props.orders.map((order, index) => (
            <Pizza
              {...order}
              key={`TodoItem.${index}`}
              divider={index !== props.orders.length - 1}
              onButtonClick={() => props.onItemRemove(index)}
              onCheckBoxToggle={() => props.onItemCheck(index)}
            />
          ))}
        </List>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Typography variant="title" style={{ marginRight: 10 }}>
          Total: ${totalAmount}
        </Typography>
      </CardActions>
    </Card>
  );
});

export default PizzaList;

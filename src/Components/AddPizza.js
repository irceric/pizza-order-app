import React, { memo, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@material-ui/core";

const AddPizza = memo(props => {
  const {
    pizzaSize: { name, basePrice, toppings, maxToppings },
  } = props;

  const getSelectedTopping = toppings => {
    let checked = [];
    toppings.forEach((topping, index) => {
      if (topping.defaultSelected) {
        checked.push(index);
      }
    });
    return checked;
  };

  const initialSubtotal = pizzaSize =>
    pizzaSize.toppings.reduce(
      (subTotal, topping) => subTotal + (topping.defaultSelected ? topping.topping.price * 1.0 : 0),
      pizzaSize.basePrice,
    );

  const [checked, setChecked] = useState(getSelectedTopping(toppings));
  const [subtotal, setSubtotal] = useState(initialSubtotal(props.pizzaSize));

  const handleToggle = index => () => {
    if (isDisabled(index)) return;
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(index);
      setSubtotal((subtotal * 1.0 + toppings[index].topping.price * 1.0).toFixed(2));
    } else {
      newChecked.splice(currentIndex, 1);
      setSubtotal((subtotal * 1.0 - toppings[index].topping.price * 1.0).toFixed(2));
    }
    setChecked(newChecked);
  };

  const isDisabled = index =>
    checked.indexOf(index) === -1 && maxToppings > 0 && checked.length === maxToppings;

  const resetPizza = () => {
    setChecked(getSelectedTopping(toppings));
    setSubtotal(initialSubtotal(props.pizzaSize));
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid xs={12} md={12} item style={{ paddingRight: 16 }}>
        <Card style={{ flex: 1, margin: 5 }} elevation={0}>
          <CardContent>
            <Typography variant="h4">Size: {name}</Typography>
            <Typography variant="body1">Base Price ${basePrice}</Typography>
            <Divider />
            <Typography variant="h5">Max Toppings: {maxToppings || "Unlimited"}</Typography>
            <Typography variant="h6">Please pick up toppings</Typography>
            <List dense component="div" role="list">
              {toppings.map((topping, index) => {
                return (
                  <ListItem
                    key={topping.topping.name}
                    role="listitem"
                    button
                    onClick={handleToggle(index)}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked.indexOf(index) !== -1}
                          disabled={isDisabled(index)}
                        />
                      }
                      label={`${topping.topping.name}: $${topping.topping.price}`}
                    />
                  </ListItem>
                );
              })}
              <ListItem />
            </List>
            <Divider />
            <Typography variant="h5">Sub Total: ${subtotal}</Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={() => resetPizza()}
            >
              Reset Default
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={() =>
                props.onAddToCart({
                  pizzaSize: props.pizzaSize,
                  checked,
                  subtotal,
                })
              }
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Paper>
  );
});

export default AddPizza;

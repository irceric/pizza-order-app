import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import React, { memo } from "react";

const Pizza = memo(props => {
  const { pizzaSize, subtotal, checked } = props;
  const selectedToppings = checked.map(index => pizzaSize.toppings[index].topping.name).join(", ");
  return (
    <ListItem divider={props.divider}>
      <Checkbox onClick={props.onCheckBoxToggle} checked={props.checked} disableRipple />
      <ListItemText
        primary={`SIZE: ${pizzaSize.name}`}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={{
                display: "inline",
              }}
              color="textPrimary"
            >
              Toppings:{" "}
            </Typography>
            {selectedToppings}
          </React.Fragment>
        }
      />
      <ListItemText style={{ paddingRight: "50px", textAlign: "right" }} primary={`$${subtotal}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Pizza" onClick={props.onButtonClick}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

export default Pizza;

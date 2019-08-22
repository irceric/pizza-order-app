import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import React, { memo } from "react";

const Pizza = memo(props => (
  <ListItem divider={props.divider}>
    <Checkbox onClick={props.onCheckBoxToggle} checked={props.checked} disableRipple />
    <ListItemText primary={props.text} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Pizza" onClick={props.onButtonClick}>
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

export default Pizza;

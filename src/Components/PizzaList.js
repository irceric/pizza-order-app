// import React from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import { GET_ALL_PIZAS } from "../queries";
// const PizzaList = () => (
//   <Query query={GET_ALL_PIZAS}>
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;
//       return data.pizzaSizes.map(({ name, maxToppings, basePrice }, index) => (
//         <div key={index}>
//           <p>{`${name} at ${basePrice} maxToppigns: ${maxToppings}`}</p>
//         </div>
//       ));
//     }}
//   </Query>
// );
// export default PizzaList;

import { List, Paper } from "@material-ui/core";
import React, { memo } from "react";
import Pizza from "./Pizza";

const PizzaList = memo(props => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "scroll" }}>
          {props.items.map((todo, index) => (
            <Pizza
              {...todo}
              key={`TodoItem.${index}`}
              divider={index !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(index)}
              onCheckBoxToggle={() => props.onItemCheck(index)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default PizzaList;

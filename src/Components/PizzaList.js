import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
const PizzaList = () => (
  <Query
    query={gql`
      {
        pizzaSizes {
          name
          maxToppings
          basePrice
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.pizzaSizes.map(({ name, maxToppings, basePrice }, index) => (
        <div key={index}>
          <p>{`${name} at ${basePrice} maxToppigns: ${maxToppings}`}</p>
        </div>
      ));
    }}
  </Query>
);
export default PizzaList;

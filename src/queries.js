import gql from "graphql-tag";
export const GET_ALL_PIZAS = gql`
  query {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }
`;

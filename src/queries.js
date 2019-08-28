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

export const GET_PIZZA_BY_NAME = gql`
  query {
    pizzaSizeByName(name: SMALL) {
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

import React, { memo } from "react";
import AddPizza from "./Components/AddPizza";
import Layout from "./Components/Layout";
import PizzaList from "./Components/PizzaList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { useInputValue, useOrders } from "./Components/Hooks";
import { Query, Mutation } from "react-apollo";
import { GET_ALL_PIZAS, GET_PIZZA_BY_NAME } from "./queries";
import gql from "graphql-tag";
import { Grid } from "@material-ui/core";
import "./App.css";

const client = new ApolloClient({
  uri: " https://core-graphql.dev.waldo.photos/pizza",
  dataIdFromObject: o => o.id,
  connectToDevTools: process.env.NODE_ENV === "development",
});

const App = memo(props => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { orders, addOrder, checkOrder, removeOrder } = useOrders();
  const clearInputAndAddOrder = data => {
    addOrder(data);
    clearInput();
  };

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Query query={GET_ALL_PIZAS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error fetching pizza menu :(</p>;
            return (
              <Grid container>
                {data.pizzaSizes.map(pizzaSize => (
                  <Grid item xs={12} md={4} key={pizzaSize.name}>
                    <AddPizza
                      pizzaSize={pizzaSize}
                      inputValue={inputValue}
                      onInputChange={changeInput}
                      onButtonClick={clearInputAndAddOrder}
                      onInputKeyPress={event => keyInput(event, clearInputAndAddOrder)}
                    />
                  </Grid>
                ))}
              </Grid>
            );
          }}
        </Query>

        <PizzaList
          orders={orders}
          onItemCheck={idx => checkOrder(idx)}
          onItemRemove={idx => removeOrder(idx)}
        />
      </Layout>
    </ApolloProvider>
  );
});

export default App;

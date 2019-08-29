import React, { memo } from "react";
import AddPizza from "./Components/AddPizza";
import Layout from "./Components/Layout";
import PizzaList from "./Components/PizzaList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { useOrders } from "./Components/Hooks";
import { Query } from "react-apollo";
import { GET_ALL_PIZAS } from "./queries";
import { Grid } from "@material-ui/core";
import "./App.css";

const client = new ApolloClient({
  uri: " https://core-graphql.dev.waldo.photos/pizza",
  dataIdFromObject: o => o.id,
  connectToDevTools: process.env.NODE_ENV === "development",
});

const App = memo(props => {
  const { orders, addOrder, removeOrder } = useOrders();

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
                    <AddPizza pizzaSize={pizzaSize} onAddToCart={addOrder} />
                  </Grid>
                ))}
              </Grid>
            );
          }}
        </Query>

        <PizzaList orders={orders} onItemRemove={idx => removeOrder(idx)} />
      </Layout>
    </ApolloProvider>
  );
});

export default App;

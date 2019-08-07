import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import logo from "./logo.svg";
import "./App.css";
import PizzaList from "./Components/PizzaList";

const client = new ApolloClient({
  uri: " https://core-graphql.dev.waldo.photos/pizza",
  dataIdFromObject: o => o.id,
  connectToDevTools: process.env.NODE_ENV === "development",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PizzaList />
      </div>
    </ApolloProvider>
  );
}

export default App;

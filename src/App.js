import React, { memo } from "react";
import AddPizza from "./Components/AddPizza";
import Layout from "./Components/Layout";
import PizzaList from "./Components/PizzaList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { useInputValue, useTodos } from "./Components/Hooks";

import "./App.css";

const client = new ApolloClient({
  uri: " https://core-graphql.dev.waldo.photos/pizza",
  dataIdFromObject: o => o.id,
  connectToDevTools: process.env.NODE_ENV === "development",
});

const App = memo(props => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <ApolloProvider client={client}>
      <Layout>
        <AddPizza
          inputValue={inputValue}
          onInputChange={changeInput}
          onButtonClick={clearInputAndAddTodo}
          onInputKeyPress={event => keyInput(event, clearInputAndAddTodo)}
        />
        <PizzaList
          items={todos}
          onItemCheck={idx => checkTodo(idx)}
          onItemRemove={idx => removeTodo(idx)}
        />
      </Layout>
    </ApolloProvider>
  );
});

export default App;

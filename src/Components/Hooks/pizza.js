// Filename: hooks/todos.js
import { useState } from "react";

export const useTodos = (initialValue = []) => {
  const [todos, setTodos] = useState(initialValue);
  console.info("todos in hooks", todos);
  return {
    todos,
    addTodo: text => {
      // console.log('text', text);
      if (text !== "") {
        setTodos(
          todos.concat({
            text,
            checked: false,
          }),
        );
      }
    },
    checkTodo: index => {
      setTodos(
        todos.map((todo, idx) => {
          if (index === idx) {
            todo.checked = !todo.checked;
          }
          return todo;
        }),
      );
    },
    removeTodo(id) {
      setTodos(todos.filter((todo, index) => id !== index));
    },
  };
};

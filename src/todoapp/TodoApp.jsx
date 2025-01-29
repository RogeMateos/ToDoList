// src/TodoApp.jsx
import React, { useReducer } from 'react';
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { todoReducer } from './todoReducer';

const initialState = [
  {
    id: new Date().getTime(),
    description: 'Recolectar la piedra del alma',
    done: false,
  },
  {
    id: new Date().getTime() + 100, // Adding 100 to ensure unique id
    description: 'Recolectar la piedra del oro',
    done: false,
  }
];

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    };
    
    dispatch(action);
  };

  return (
    <>
      <h1>TodoApp: {todos.length}, <small>pendientes: {todos.filter(todo => !todo.done).length}</small></h1>
      <hr />

      <div className="row">
        <div className="col-7">
          <TodoList todos={todos} />
        </div>

        <div className="col-5">
          <h4>Agregar TODO</h4>
          <hr />
          <TodoAdd onNewTodo={handleNewTodo} />
        </div>
      </div>
    </>
  );
};
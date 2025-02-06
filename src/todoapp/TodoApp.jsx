// src/TodoApp.jsx
import React, { useReducer, useEffect } from 'react';
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

// const initialState = [
//   {
//     id: new Date().getTime(),
//     description: 'Recolectar la piedra del alma',
//     done: false,
//   },
//   {
//     id: new Date().getTime() + 100, // Adding 100 to ensure unique id
//     description: 'Recolectar la piedra del oro',
//     done: false,
//   }
// ];
// Initial state moved out as it will now come from localStorage



export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  // Effect to save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    };
    
    dispatch(action);
  };

  

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id
    });
  };

  
  const  handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id
    });
  };


  return (
    <>
      <h1>TodoApp: {todos.length}, <small>pendientes: {todos.filter(todo => !todo.done).length}</small></h1>
      <hr />

      <div className="row">
        <div className="col-7">
          <TodoList 
          todos={todos} 
          onDeleteTodo={id => handleDeleteTodo(id)} 
          onToggleTodo={handleToggleTodo}
          />
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
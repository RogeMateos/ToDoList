// src/components/TodoItem.jsx
import React from 'react';

export const TodoItem = ({ todo }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="align-self-center">
        {todo.description}
      </span>
      <button 
        className="btn btn-danger"
        onClick={() => console.log('Delete clicked:', todo.id)}
      >
        Borrar
      </button>
    </li>
  );
};

export default TodoItem;
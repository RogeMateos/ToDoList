// src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

export const TodoList = ({ todos = [] ,onDeleteTodo, onToggleTodo }) => {
  return (
    <>
      <ul className="list-group">
        {
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDeleteTodo={onDeleteTodo}  // Pasar la funciĆ³n como prop
              onToggleTodo={onToggleTodo}
            />
          ))
        }
      </ul>
    </>
  );
};

export default TodoList;
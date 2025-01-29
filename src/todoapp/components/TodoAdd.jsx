// src/components/TodoAdd.jsx
import React from 'react';
import  useForm  from '../hooks/useForm';
const TodoAdd = ({ onNewTodo }) => {

  const initialForm = {
    description: ''
  };

  // Utilizamos el hook useForm
  const { description, formState, onInputChange, onResetForm } = useForm(initialForm);

  const handleSubmit = (event) => {
    event.preventDefault();
    
     // Validamos que la descripción tenga más de 1 carácter
     if (formState.description.trim().length <= 1) return;

    // Creamos el nuevo todo
    const newTodo = {
      id: new Date().getTime(),
      description: description.trim(),
      done: false
    };


    onNewTodo(newTodo);
    onResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"  
        placeholder="¿Qué hay que hacer?"
        className="form-control"
        value={description}
        onChange={onInputChange}
      />
      <button 
        type="submit"
        className="btn btn-outline-primary mt-1"
      >
        Agregar
      </button>
    </form>
  );
};

export default TodoAdd;
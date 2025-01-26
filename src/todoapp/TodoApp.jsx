import { useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [
  {
    id: new Date().getTime(),
    description: "Recolectar la piedra del alma",
    done: false,
  },
  {
    id: new Date().getTime() * 3,
    description: "Recolectar la piedra del alma",
    done: false,
  },
];

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return (
    <>
      <h1>
        TodoApp: {todos.length}, 
        <small>pendientes: {todos.filter(todo => !todo.done).length}</small>
      </h1>
      <hr />

      <div className="row">
        <div className="col-7">
          <ul className="list-group">
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className="list-group-item d-flex justify-content-between"
              >
                <span className="align-self-center">{todo.description}</span>
                <button 
                  className="btn btn-danger"
                  onClick={() => dispatch({ 
                    type: '[TODO] Remove Todo',
                    payload: todo.id 
                  })}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-5">
          <h4>Agregar TODO</h4>
          <hr />
          <form onSubmit={(event) => {
            event.preventDefault();
            const newTodo = {
              id: new Date().getTime(),
              description: event.target.elements[0].value,
              done: false
            };
            dispatch({
              type: '[TODO] Add Todo',
              payload: newTodo
            });
            event.target.reset();
          }}>
            <input 
              type="text"
              placeholder="¿Qué hay que hacer?"
              className="form-control"
            />
            <button 
              type="submit"
              className="btn btn-outline-primary mt-1"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
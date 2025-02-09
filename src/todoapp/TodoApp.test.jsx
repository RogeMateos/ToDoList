import { render, screen, fireEvent } from '@testing-library/react';
import { TodoApp } from './TodoApp';
import * as hooks from './hooks/useTodos';

jest.mock('./hooks/useTodos');

describe('TodoApp Component', () => {
    const mockUseTodos = {
        todos: [
            { id: 1, description: 'Todo 1', done: false },
            { id: 2, description: 'Todo 2', done: true }
        ],
        handleNewTodo: jest.fn(),
        handleDeleteTodo: jest.fn(),
        handleToggleTodo: jest.fn(),
        todosCount: 2,
        pendingTodosCount: 1
    };

    beforeEach(() => {
        jest.clearAllMocks();
        hooks.useTodos.mockReturnValue(mockUseTodos);
    });

    test('should render correctly', () => {
        render(<TodoApp />);
        expect(screen.getByText(/TodoApp: 2/i)).toBeInTheDocument();
        expect(screen.getByText(/pendientes: 1/i)).toBeInTheDocument();
    });

    test('should render TodoList and TodoAdd components', () => {
        render(<TodoApp />);
        
        expect(screen.getByText('Agregar TODO')).toBeInTheDocument();
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });

    test('should pass correct props to child components', () => {
        render(<TodoApp />);
        
        // Verify TodoList props
        const todoList = screen.getByRole('list');
        expect(todoList).toBeInTheDocument();
    });

    test('should handle new todo addition', () => {
        render(<TodoApp />);
        
        const input = screen.getByRole('textbox');
        const form = input.closest('form');
        
        fireEvent.change(input, { target: { value: 'New Todo' }});
        fireEvent.submit(form);
        
        expect(mockUseTodos.handleNewTodo).toHaveBeenCalledWith(
            expect.objectContaining({
                description: 'New Todo',
                done: false
            })
        );
    });

    test('should handle todo deletion', () => {
        render(<TodoApp />);
        
        const deleteButtons = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(deleteButtons[0]);
        
        expect(mockUseTodos.handleDeleteTodo).toHaveBeenCalledWith(1);
    });

    test('should handle todo toggle', () => {
        render(<TodoApp />);
        const todoSpans = screen.getAllByText(/Todo \d/);
        
        fireEvent.click(todoSpans[0]);
        
        expect(mockUseTodos.handleToggleTodo).toHaveBeenCalledWith(1);
    });
});

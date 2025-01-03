// src/TodoList.js
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return; // Prevent adding empty todos
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <div className="flex mb-4">
       
        <input
          type="text"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
          placeholder="Add a new task"
        /> <input type="checkbox" name="" id="" />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
          <li key={index} className={`flex justify-between items-center mb-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            <span onClick={() => handleToggleTodo(index)} className="cursor-pointer">{todo.text}</span>
            <button
              onClick={() => handleRemoveTodo(index)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
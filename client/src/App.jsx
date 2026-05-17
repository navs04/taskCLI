import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  function handleAdd(todo){
    setTodos([...todos, {text: todo, completed: false}]);
  }

  function handleDelete(todoIndex){
    const updatedTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(updatedTodos);
  }

  function handleToggle(todoIndex){
    const updatedTodos = todos.map((item, index) => {
      if(index === todoIndex){
        return {
          ...item,
          completed : !item.completed
        };
      }
      return item;
    })
    setTodos(updatedTodos);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
 <div className="app-container">
  <h1 className="main-heading">✨ TaskFlow</h1>
  <p className="subtitle">Stay organized. Stay focused.</p>

    <div className="todo-card">
      <Form onAdd={handleAdd} />

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one 🚀</p>
      ) : (
        <ul className="todo-list">
          {todos.map((item, index) => (
            <li key={index} className="todo-item">
              <span
                className={`todo-text ${item.completed ? "completed" : ""}`}
                onClick={() => handleToggle(index)}
              >
                {item.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}

function Form({ onAdd }) {
  const [text, setText] = useState('');

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={() => {
          if (!text.trim()) return;

          onAdd(text);
          setText('');
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App
import './App.css'
import { useState, useEffect } from 'react';
import { API_URL } from './config';

function App() {
  const [todos, setTodos] = useState([]);

  async function fetchTodos(){
    try{
      const response = await fetch(API_URL);

      const data = await response.json();

      setTodos(data);
    } catch(error){
      console.log(error);
    }
  }

  async function handleAdd(todo){
    try{
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({text: todo})
      });

      const data = await response.json();

      setTodos((prevTodos) => [...prevTodos, data]);
    } catch(error){
      console.log(error);
    }
  }

  async function handleDelete(todoId){
    try{
      await fetch(`${API_URL}/${todoId}`,{
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch(error){
      console.log(error);
    }
  }

  async function handleToggle(todoId){
   try{
    const response = await fetch(`${API_URL}/${todoId}`, {
      method: "PUT",
    });

    const updatedTodo = await response.json();

    setTodos(
      todos.map((todo) => todo._id === todoId? updatedTodo: todo)
    );
   } catch(error){
    console.log(error);
   }
  }
  
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
 <div className="app-container">
  <h1 className="main-heading">TaskCLI</h1>
  <p className="subtitle"> user@taskcli:~$ manage_tasks</p>
  <p className="task-counter">
    {todos.length} task{todos.length !== 1 ? "s": ""} loaded
  </p>

    <div className="todo-card">
      <div className="terminal-header">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Form onAdd={handleAdd} />

      {todos.length === 0 ? (
        <p className="empty-state">No tasks found</p>
      ) : (
        <ul className="todo-list">
          {todos.map((item) => (
            <li key={item._id} className="todo-item">
              <span
                className={`todo-text ${item.completed ? "completed" : ""}`}
                onClick={() => handleToggle(item._id)}
              >
                {item.completed? "[x] " : "[ ] " }
                {item.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
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
        placeholder="Enter task..."
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
        EXECUTE
      </button>
    </div>
  );
}

export default App
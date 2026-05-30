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
  <h1 className="main-heading">✨ TaskFlow</h1>
  <p className="subtitle">Stay organized. Stay focused.</p>

    <div className="todo-card">
      <Form onAdd={handleAdd} />

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one 🚀</p>
      ) : (
        <ul className="todo-list">
          {todos.map((item) => (
            <li key={item._id} className="todo-item">
              <span
                className={`todo-text ${item.completed ? "completed" : ""}`}
                onClick={() => handleToggle(item._id)}
              >
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
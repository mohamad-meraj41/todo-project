import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // گرفتن TODOها از API
  useEffect(() => {
    axios.get("http://localhost:4001/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  // اضافه کردن TODO جدید
  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    axios.post("http://localhost:4001/api/todos", { title: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo(""); // پاک کردن input
      })
      .catch((error) => console.error(error));
  };

  // حذف TODO
  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:4001/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.error(error));
  };

  // تغییر وضعیت TODO
  const handleToggleCompleted = (id) => {
    axios.put(`http://localhost:4001/api/todos/${id}`)
      .then((response) => {
        setTodos(todos.map((todo) =>
          todo._id === id ? { ...todo, completed: response.data.completed } : todo
        ));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="todo-table">
      <h2>TODO List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new TODO"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        <h4>Task List</h4>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleCompleted(todo._id)}
            >
              {todo.title}
            </span>
            <button className="btn-task" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
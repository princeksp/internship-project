// src/ToDoList.js
import './ToDoList.css';

import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(index)}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;

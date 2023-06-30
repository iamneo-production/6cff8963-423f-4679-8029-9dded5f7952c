import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import Home from './Home';
import TaskList from './TaskList';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            ...updatedTask,
          };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const generateTaskId = () => {
    return Math.floor(Math.random() * 100000) + 1;
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <div>
      <nav className="nav-bar">
        <div >
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/task-form" className="nav-link">Task Form</Link>
            </li>
            <li className="nav-item">
              <Link to="/task-list" className="nav-link">Task List</Link>
            </li>
          </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-form" element={<TaskForm onAddTask={handleAddTask} taskId={generateTaskId()} />} />
          <Route path="/task-list" element={<TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;
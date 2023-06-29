import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import Home from './Home';
import TaskList from './TaskList';

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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/task-form">Task Form</Link>
            </li>
            <li>
              <Link to="/task-list">Task List</Link>
            </li>
          </ul>
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
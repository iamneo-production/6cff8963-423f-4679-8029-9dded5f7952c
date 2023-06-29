import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask, taskId }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    
    if (!taskName) {
      validationErrors.taskName = 'Task name is required.';
    }
    if (!description) {
      validationErrors.description = 'Description is required.';
    }
    if (!employeeId) {
      validationErrors.employeeId = 'Employee Id is required.';
    }
    if (!employeeName) {
      validationErrors.employeeName = 'Employee Name is required.';
    }

    if (!dueDate) {
      validationErrors.dueDate = 'Due date is required.';
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(dueDate);

      if (status === 'todo' && selectedDate < currentDate) {
        validationErrors.dueDate =
          'Due date must be after the current date for "To Do" tasks.';
      }
    }

    // Rest of the validation code...

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form validation successful, create the task object
    const newTask = {
      id: taskId,
      taskName,
      description,
      dueDate,
      status,
      employeeName,
      employeeId,
    };

    // Pass the new task to the onAddTask callback prop
    onAddTask(newTask);

    // Reset form fields and errors after successful submission
    setTaskName('');
    setDescription('');
    setDueDate('');
    setStatus('');
    setEmployeeName('');
    setEmployeeId('');
    setErrors({});
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {errors.taskName && <p className="error">{errors.taskName}</p>}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && <p className="error">{errors.dueDate}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          {errors.employeeName && (
            <p className="error">{errors.employeeName}</p>
          )}
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          {errors.employeeId && (
            <p className="error">{errors.employeeId}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

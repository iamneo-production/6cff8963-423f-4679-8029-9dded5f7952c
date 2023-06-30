import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  const [editingTaskId, setEditingTaskId] = useState('');
  const [editedTasks, setEditedTasks] = useState({});
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    setEditedTasks((prevState) => ({
      ...prevState,
      [taskId]: {
        taskName: tasks.find((task) => task.id === taskId).taskName,
        description: tasks.find((task) => task.id === taskId).description,
        dueDate: tasks.find((task) => task.id === taskId).dueDate,
        status: tasks.find((task) => task.id === taskId).status,
        employeeName: tasks.find((task) => task.id === taskId).employeeName,
        employeeId: tasks.find((task) => task.id === taskId).employeeId,
      },
    }));
  };

  const handleSave = (taskId) => {
    const updatedTask = editedTasks[taskId];
    onUpdate(taskId, updatedTask);
    setEditingTaskId('');
    setEditedTasks((prevState) => ({
      ...prevState,
      [taskId]: undefined, // Clear the edited task after saving
    }));
  };

  const handleCancel = () => {
    setEditingTaskId('');
  };

  const handleDelete = (taskId) => {
    onDelete(taskId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e, taskId) => {
    const { name, value } = e.target;
    setEditedTasks((prevState) => ({
      ...prevState,
      [taskId]: {
        ...prevState[taskId],
        [name]: value,
      },
    }));
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const applyFilter = (task) => {
    if (filterStatus === '') {
      return true; // No filter applied
    }
    return task.status === filterStatus;
  };

  const applySortOrder = (tasks) => {
    const sortedTasks = [...tasks];
    if (sortOrder === 'asc') {
      return sortedTasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
    } else if (sortOrder === 'desc') {
      return sortedTasks.sort((a, b) => b.taskName.localeCompare(a.taskName));
    }
    return sortedTasks;
  };

  const applySearchTerm = (task) => {
    return task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    ||task.employeeId.includes(searchTerm);
  };

  const filteredTasks = tasks
    .filter(applyFilter)
    .filter(applySearchTerm)
    .map((task) => ({ ...task, isEditing: editingTaskId === task.id }));

  const sortedTasks = applySortOrder(filteredTasks);

  const generateStars = (priority) => {
    const stars = [];
    for (let i = 0; i < priority; i++) {
      stars.push(<span key={i} className="star">*</span>);
    }
    return stars;
  };

  return (
    <div>
      <h2>Task List</h2>
      <div className="TaskList-controls">
        <div className="TaskList-filter">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="TaskList-sort">
          <label>Sort Order:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="TaskList-search">
          <label>Search:</label>
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>
      <table className="TaskList-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <td>
                {task.isEditing ? (
                  <input
                    type="text"
                    name="taskName"
                    value={editedTasks[task.id]?.taskName || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  />
                ) : (
                  task.taskName
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <input
                    type="text"
                    name="description"
                    value={editedTasks[task.id]?.description || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <input
                    type="date"
                    name="dueDate"
                    value={editedTasks[task.id]?.dueDate || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  />
                ) : (
                  task.dueDate
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <select
                    name="status"
                    value={editedTasks[task.id]?.status || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  >
                    <option value="">Select Status</option>
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <input
                    type="text"
                    name="employeeName"
                    value={editedTasks[task.id]?.employeeName || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  />
                ) : (
                  task.employeeName
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <input
                    type="text"
                    name="employeeId"
                    value={editedTasks[task.id]?.employeeId || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  />
                ) : (
                  task.employeeId
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <select
                    name="priority"
                    value={editedTasks[task.id]?.priority || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                  >
                    <option value="">Select Priority</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                ) : (
                  generateStars(task.priority) // Display stars based on priority
                )}
              </td>
              <td>
                {task.isEditing ? (
                  <>
                    <button onClick={() => handleSave(task.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(task.id)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

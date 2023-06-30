import React from 'react';
import './TaskProgressGraph.css';

const TaskProgressGraph = ({ tasks }) => {
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const progressTasks = tasks.filter(task => task.status === 'inProgress').length;
  const completeTasks = tasks.filter(task => task.status === 'completed').length;

  const todoPercentage = (todoTasks / totalTasks) * 100;
  const progressPercentage = (progressTasks / totalTasks) * 100;
  const completePercentage = (completeTasks / totalTasks) * 100;

  return (
    <div className="TaskProgressGraph">
      <div className="TaskProgressGraph-bar todo" style={{ width: `${todoPercentage}%` }}>
        <span className="status-name">Todo :</span>
        <span className="status-percentage">{`${todoTasks} tasks (${todoPercentage.toFixed(1)}%)`}</span>
      </div>
      <div className="TaskProgressGraph-bar progress" style={{ width: `${progressPercentage}%` }}>
        <span className="status-name">Progress :</span>
        <span className="status-percentage">{`${progressTasks} tasks (${progressPercentage.toFixed(1)}%)`}</span>
      </div>
      
      <div className="TaskProgressGraph-bar complete" style={{ width: `${completePercentage}%` }}>
        <span className="status-name">Complete :</span>
        <span className="status-percentage">{`${completeTasks} tasks (${completePercentage.toFixed(1)}%)`}</span>
      </div>
    </div>
  );
};

export default TaskProgressGraph;

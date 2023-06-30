import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/task-form">
        <button>Create Task</button>
      </Link>
      
      <Link to="/task-list">
        <button>View all Task</button>
      </Link>
    </div>
  );
}

export default Home;

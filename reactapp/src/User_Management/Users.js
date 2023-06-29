import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListUsers from './User_Management/components/ListUsers'
import './User_Management/components_styles/app.css';
import CreateUser from './User_Management/components/CreateUser';

function Users() {
  return (
    <Routes>
    <Route path="/" element={<ListUsers />} />
  </Routes>
  );
}

export default Users;

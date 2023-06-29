import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Userslist from './User_Management/components/Userslist';
import './User_Management/components_styles/app.css';

function UserList() {
  return (
    <Routes>
    <Route path="/" element={<Userslist />} />
  </Routes>
  );
}

export default UserList;

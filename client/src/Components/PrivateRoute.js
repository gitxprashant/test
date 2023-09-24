import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from './Home';

function PrivateRoute() {
  const token = localStorage.getItem('token');

  if (token) {
    // User is logged in, render the children
    return <Home />;
  } else {
    // User is not logged in, redirect to the login page
    return <Navigate to= '/login' />;
  }
}

export default PrivateRoute;

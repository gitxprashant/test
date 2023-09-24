import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path='/login' element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path='/home' element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
}

export default App;

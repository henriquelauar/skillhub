import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

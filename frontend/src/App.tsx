import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </Router>
  );
};

export default App;

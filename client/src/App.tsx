import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreSkills from './pages/ExploreSkills';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Matches from './pages/Matches/MatchesPage';
import UserProfile from './pages/UserProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explore" element={<ExploreSkills/>} />
          <Route path="/matches" element={<Matches/>} />
          <Route path="/profile/:id" element={<UserProfile/>} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar newestOnTop />
      </Router>
  );
};

export default App;

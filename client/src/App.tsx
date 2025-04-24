import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ExploreSkills from './pages/Explore/ExploreSkills';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Matches from './pages/Matches/MatchesPage';
import UserProfile from './pages/Profile/UserProfile'
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
          <Route path="/search" element={<ExploreSkills/>} />
          <Route path="/matches" element={<Matches/>} />
          <Route path="/profile/:id" element={<UserProfile/>} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar newestOnTop />
      </Router>
  );
};

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreSkills from './pages/ExploreSkills';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Matches from './pages/Matches/MatchesPage';
import './App.css'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explore" element={<ExploreSkills/>} />
          <Route path="/matches" element={<Matches/>} />
        </Routes>
      </Router>
  );
};

export default App;

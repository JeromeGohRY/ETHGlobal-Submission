import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import BettingPage from './Components/BettingPage';
import SettingsPage from './Components/SettingPage';
import './index.css'; // Import the CSS file here
import 'dotenv';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/betting' element={<BettingPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dependencies from './pages/Dependencies';
import './assets/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dependencies" element={<Dependencies/>} />
      </Routes>
    </Router>
  );
}

export default App;

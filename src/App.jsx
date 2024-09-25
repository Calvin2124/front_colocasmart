import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';
import HomeConect from './pages/HomeConect';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<ForgotPass />} />
        <Route path='/connected' element={<HomeConect />} />
      </Routes>
    </Router>
  );
}
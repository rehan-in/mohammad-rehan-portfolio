import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Contact from './pages/Contact';
import ChatBot from './pages/ChatBot';
import Skills from './pages/skills';
import Feedback from './pages/FeedBack';
import Resume from './pages/Resume';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ImageSlider from './components/ImageSlider';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ResetPassword';
import Admin from './pages/Admin';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

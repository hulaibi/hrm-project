import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // ملف ستايل مخصص
import JobsList from './components/JobsList';
import JobApply from './components/JobApply';
import HrJobs from "./components/HrJobs";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/apply/:id" element={<JobApply />} />
          <Route path="/hr/jobs" element={<HrJobs />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

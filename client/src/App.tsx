import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Credentials from './components/Credentials';
import Quiz from './components/Quiz';
import Preview from './components/Preview';
import Footer from './components/Footer';
import Checking from './components/Checking';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Checking />
      <Routes>
        <Route path='step1' element={<Credentials />} />
        <Route path='step2' element={<Quiz />} />
        <Route path='step3' element={<Preview />} />
        <Route path='/' element={<Credentials />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

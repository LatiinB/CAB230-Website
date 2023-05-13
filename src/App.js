import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './Pages';
import About from './Pages/about';
import Blogs from './Pages/blogs';
import SignUp from './Pages/signup';
import Contact from './Pages/contact';
  
function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Routes>
          <React.Fragment>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/sign-up' element={<SignUp/>} />
          </React.Fragment>
        </Routes>
      </React.Fragment>
    </Router>
  );
}
  
export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Navbar/Home/Home';
import About from './Components/Navbar/About/About';
import Projects from './Components/Navbar/Projects/Projects';
import Contact from './Components/Navbar/Contact/Contact';
import Login from "./Components/UserDetails/Login/Login"
import Admin from "./Components/Admin/Admin"
import ProtectRouter from "./ProtectRoute/ProtectRouter"
import AddProjectForm from "./Components/Admin/AddProjectForm/AddProjectForm"
import AddYourDetailsForm from "./Components/Admin/AddYourDetailsForm/AddYourDetailsForm"
import RegisterForm from "./Components/UserDetails/Register/Register"
import Footer from "./Components/Footer/Footer";


function App() {
 


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }



  return (
    <div className="App">
    <Router>
      <Navbar />
      
      <Routes >
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
       <Route element={<ProtectRouter />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/add-project" element={<AddProjectForm />} />
            <Route path="/add-my-details" element={<AddYourDetailsForm />} /> 
            <Route path="/register" element={<RegisterForm />} />

        </Route>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;

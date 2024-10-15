// Import necessary hooks and assets from React
import { useState } from 'react';

// Import Supabase client
import { createClient } from '@supabase/supabase-js';

// Import React-Router-Dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // To handle redirects

// Import CSS and Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';


// Initialize Supabase client
const supabaseUrl = 'https://ujnvmsetxqxvggfgwjii.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbnZtc2V0eHF4dmdnZmd3amlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NzE4MDAsImV4cCI6MjA0NDU0NzgwMH0.0S2crPvr6XBG359FFWoIFZZrCY8QVL8CoNG7meyF5lc';

const supabase = createClient(supabaseUrl, supabaseKey);

// import logo for corkweb.
import logo from './assets/corkweb_favicon.png';


// Home page component
const HomePage = () => {
  return (
    <div className="container text-center mt-5">
      <h2>Welcome to CorkWeb!</h2>
      <p>This is your home page after successful login.</p>
    </div>
  );
};

//define login and signup variables
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // To handle redirect

  // Sign-up function
  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Sign up successful! You can now log in.');
        setShowSignUp(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Login function with redirect
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Login successful!');
        setShowLogin(false);
        // Redirect to the home page after successful login
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Router>
      <div className="container mt-5 text-center">
        {/* Logo Above Title */}
        <img src={logo} alt="CorkWeb Logo" className="mb-3" style={{ maxWidth: '200px' }} />
        <h1>CorkWeb</h1>
        <p>Your virtual corkboard for notes, ideas, and more.</p>

        {/* Display error or success messages */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
      </div>

      {/* Buttons to show login and sign-up popups */}
      <div className="text-center mt-4">
        <Button variant="primary" className="me-3" onClick={() => setShowLogin(true)}>
          Login
        </Button>
        <Button variant="secondary" onClick={() => setShowSignUp(true)}>
          Sign Up
        </Button>
      </div>

      {/* React-Bootstrap Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* React-Bootstrap Sign-Up Modal */}
      <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmailSignUp">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordSignUp">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Define routes */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/corkboard" element={<CorkBoard />} />
      </Routes>

      {/* Copyright Blurb */}
      <div className="copyright">
        &copy; <a href="https://reiyua.lol" target="_blank" rel="noopener noreferrer">reiyua.</a> All rights reserved.
      </div>

      {/* Contact Support Blurb */}
      <div className="contact-support">
        <p>Contact support: corkweb@googlegroups.com</p>
      </div>
    </Router>
  );
}

export default App;
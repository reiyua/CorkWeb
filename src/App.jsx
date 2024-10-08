// Import necessary hooks and assets
import { useState } from 'react';

// Import CSS and Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

// Import UUID Package as attempt to solve invalid user ID upon registering.
import { v4 as uuidv4 } from 'uuid';

// Appwrite import
import { Client, Account } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66fff6c50032a76aa298');

// Initialize Appwrite account object
const account = new Account(client);

// Import logo image
import logo from './assets/corkweb_favicon.png'; // Replace with your logo filename

/// declare variables
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

/// login component
  const handleLogin = async () => {
    try {
        // Ensure correct method is used to create the session
        await account.createSession(email, password); // Correct method
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        setShowLogin(false);
    } catch (error) {
        setErrorMessage(error.message);
        setSuccessMessage('');
    }
};


// signup component
const handleSignUp = async () => {
  // Basic validation for fields
  if (!email || !password || !username) {
    setErrorMessage('All fields are required.');
    return;
  }

  // Generate a valid userId using UUID
  const userId = uuidv4();

  try {
    // Use the generated userId instead of 'unique()'
    await account.create(userId, email, password, username);
    setSuccessMessage('Sign up successful! You can now log in.');
    setErrorMessage('');
    setShowSignUp(false);
  } catch (error) {
    // Show a detailed error message
    setErrorMessage(error.message || 'An error occurred during sign up.');
    setSuccessMessage('');
  }
};


  return (
    <>
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

      {/* Copyright Blurb */}
      <div className="copyright">
        &copy; <a href="https://reiyua.lol" target="_blank" rel="noopener noreferrer">reiyua.</a> All rights reserved.
      </div>

      {/* Contact Support Blurb */}
      <div className="contact-support">
        <p>Contact support: corkweb@googlegroups.com</p>
      </div>
    </>
  );
}

export default App;
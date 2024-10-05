// Import necessary hooks and assets
import { useState } from 'react';

// Import CSS and Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

// Appwrite import and credentials
import { Client } from 'appwrite';
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66fff6c50032a76aa298');

function App() {
  const [showLogin, setShowLogin] = useState(false);  // State to control login modal visibility
  const [showSignUp, setShowSignUp] = useState(false); // State to control signup modal visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For Sign Up

  const handleLogin = () => {
    // Handle login logic (connect with Appwrite)
    console.log('Logging in with:', email, password);
    setShowLogin(false);
  };

  const handleSignUp = () => {
    // Handle sign-up logic (connect with Appwrite)
    console.log('Signing up with:', username, email, password);
    setShowSignUp(false);
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h1>CorkWeb</h1>
        <p>Your virtual corkboard for notes, ideas, and more.</p>
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
    </>
  );
}

export default App;

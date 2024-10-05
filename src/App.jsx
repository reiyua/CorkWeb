// Import necessary hooks and assets
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

// Import CSS and Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

// Appwrite import and credentials
import { Client } from 'appwrite';
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66fff6c50032a76aa298');

function App() {
  const [count, setCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false); // State to control modal visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic (connect with Appwrite)
    console.log('Logging in with:', email, password);
    // Close the modal
    setShowLogin(false);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Button to show login popup */}
      <Button variant="primary" onClick={() => setShowLogin(true)}>
        Login
      </Button>

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
    </>
  );
}

export default App;

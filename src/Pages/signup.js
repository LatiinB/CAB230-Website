import React, { useState, useEffect } from "react";
import MyNavbar from './MyNavbar';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import './Pages.css';

function SignUp(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const url = 'http://sefdb02.qut.edu.au:3000/user/register';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        navigate('/registersuccess');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <MyNavbar />
      <div className="signupForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </Form>
      </div>
    </div>
  );
};
  
export default SignUp;
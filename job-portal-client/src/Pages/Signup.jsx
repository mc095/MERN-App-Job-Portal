import React, { useState } from 'react';
import styled from 'styled-components';

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 70px;
  background: #fff;
  width: 600px;
  padding-bottom: 30px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  width: 100%;
  margin-top: 30px;
`;

const Text = styled.div`
  color: #3c009d;
  font-size: 48px;
  font-weight: 700;
`;

const Underline = styled.div`
  width: 61px;
  height: 6px;
  background: #3c009d;
  border-radius: 9px;
`;

const Inputs = styled.div`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 480px;
  height: 80px;
  background: #eaeaea;
  border-radius: 6px;

  img {
    margin: 0px 30px;
  }

  input {
    height: 50px;
    width: 400px;
    background: transparent;
    border: none;
    outline: none;
    color: #797979;
    font-size: 19px;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  gap: 30px;
  margin: 60px auto;
`;

const Submit = styled.button` // Change to button for proper click handling
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 59px;
  color: #fff;
  background: #4c00b4;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  border: none;
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      alert(data.message); // Display success message
    } else {
      setError(data.message); // Display error message
    }
  };

  return (
    <Container>
      <Header>
        <Text>Sign Up</Text>
        <Underline />
      </Header>
      <Inputs>
        <Input>
          <img src={user_icon} alt="User Icon" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input>
        <Input>
          <img src={email_icon} alt="Email Icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Input>
        <Input>
          <img src={password_icon} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Input>
      </Inputs>
      <SubmitContainer>
        <Submit onClick={handleSubmit}>Sign Up</Submit>
      </SubmitContainer>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Signup;

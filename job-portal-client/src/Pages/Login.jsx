import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Submit = styled.button`
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 404) {
      alert(data.message);
      navigate('/signup');
    } else if (response.status === 200) {
      // Store user information (e.g., token) in local storage or context
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } else {
      setError(data.message);
    }
  };

  return (
    <Container>
      <Header>
        <Text>Login</Text>
        <Underline />
      </Header>
      <Inputs>
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
        <Submit onClick={handleSubmit}>Login</Submit>
      </SubmitContainer>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Login;

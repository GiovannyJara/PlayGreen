import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../public/firebase/firebase';
import { useNavigate } from 'react-router-dom';



import { db } from './../firebase/firebase';





const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 90%;
  max-width: 400px;
  padding: 20px;

  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 53%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;



const Login = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {

        const userRef = db.collection("users").doc(auth.currentUser.uid);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          // El registro del usuario no existe, crear uno nuevo
          await userRef.set({
            email,
            password,
          });
        }

        await localStorage.setItem('uid', auth.currentUser.uid);
        await localStorage.setItem('email', email);
        await localStorage.setItem('password', password);

        // Inicio de sesión exitoso, acceder al token de autenticación
        const user = userCredential.user;
        const token = await user.getIdToken(); // Obtener el token de autenticación
        console.log('Token de autenticación:', token);
        await localStorage.setItem('token', token);
        await navigate("/sport");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <Title>Welcome</Title>
        <Subtitle>Please log in</Subtitle>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};
export default Login;

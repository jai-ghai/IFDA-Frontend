import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
      e.preventDefault();
      await dispatch(login({ email, password }));
    };

  return (
    <Container h={'95vh'} >
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Welcome to IFDA Institute" />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
        <Box my={'4'}>
          <FormLabel htmlFor="email" children="Email address" />
          <Input
          required
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
          focusBorderColor="yellow.500"
        />
        </Box>

        <Box my={'4'}>
          <FormLabel htmlFor="password" children="Password" />
          <Input
          required
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          focusBorderColor="yellow.500"
        />
        </Box>

        <Box>
          <Link to="/forgetpassword">
            <Button variant={'link'} fontSize={'sm'}>Forget password?</Button>
          </Link>
        </Box>

        <Button colorScheme='yellow' my={'4'} type='submit'>Login</Button>

        <Box my={4}>
        New user? <Link to={'/register'}>
        <Button colorScheme='yellow' variant={'link'}>Sign Up
        </Button>{" "}here
        </Link>
        </Box>

        </form>
        
      </VStack>
    </Container>
  );
};

export default Login;

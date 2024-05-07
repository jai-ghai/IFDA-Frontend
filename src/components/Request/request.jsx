import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();
  const {
    loading,
    error,
    message: stateMessage,
  } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, stateMessage]);
  return (
    <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading children="Request a Course"/>
            <form onSubmit={submitHandler} style={{ width: '100%' }}>

            <Box my={'4'}>
          <FormLabel htmlFor="name" children="Name" />
          <Input
          required
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="abc"
          focusBorderColor="blue.500"
        />
        </Box>
        <Box my={'4'}>
          <FormLabel htmlFor="email" children="Email address" />
          <Input
          required
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
          focusBorderColor="blue.500"
        />
        </Box>

        <Box my={'4'}>
          <FormLabel htmlFor="Course" children="Course" />
          <Textarea
          required
          id="course"
          value={course}
          onChange={e => setCourse(e.target.value)}
          placeholder="explain the course ..."
          focusBorderColor="blue.500"
        />
        </Box>


        <Button isLoading={loading} colorScheme='blue' my={'4'} type='submit'>Send Mail</Button>

        <Box my={4}>
        See available courses! <Link to={'/courses'}>
        <Button colorScheme='blue' variant={'link'}>Click
        </Button>{" "}here
        </Link>
        </Box>
     

        </form>
        </VStack>
    </Container>
  )
}


export default Request
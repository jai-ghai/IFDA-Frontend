import { Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const Resetpassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };


  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
    }
  }, [dispatch, error, message, navigate]);


  return (
    <Container py={'16'} h={'90vh'}>
        <form onSubmit={submitHandler}>
            <Heading children="reset password" my={'16'} textTransform={'uppercase'} textAlign={'center'}/>

            <VStack spacing={'8'}>
            <FormLabel htmlFor="Password" children="Enter a password" />
          <Input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="New password"
          focusBorderColor="blue.500"
        />

        <Button isLoading={loading} type='submit' w={'full'} colorScheme='blue'>Reset Password</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Resetpassword
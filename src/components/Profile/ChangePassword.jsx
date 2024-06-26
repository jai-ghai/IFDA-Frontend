import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);


  return (
    <Container py={'16'} minH={'90vh'}>
    <form onSubmit={submitHandler}>
        <Heading textTransform={'uppercase'} my={'16'}  children="Change Password" textAlign={['center','left']}/>

        <VStack spacing={'8'}>
        <Input
          required
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          placeholder="old password"
          focusBorderColor="blue.500"
        />
        <Input
          required
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="New password"
          focusBorderColor="blue.500"
        />

        <Button isLoading={loading} w={'full'} colorScheme='blue' type='submit'> Change</Button>
        </VStack>
    </form>

    </Container>
  )
}

export default ChangePassword
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const UpdateProfile = ({user}) => {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();
    const submitHandler = async (e) =>{
      e.preventDefault();

      await dispatch(updateProfile(name, email));
      dispatch(loadUser());
    }
  return (
    <Container py={'16'} minH={'90vh'}>
    <form onSubmit={submitHandler}>
        <Heading textTransform={'uppercase'} my={'16'}  children="Update Profile" textAlign={['center','left']}/>

        <VStack spacing={'8'}>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          focusBorderColor="blue.500"
        />
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email"
          focusBorderColor="blue.500"
        />

        <Button w={'full'} colorScheme='blue' type='submit'> Update</Button>
        </VStack>
    </form>

    </Container>
  )
}

export default UpdateProfile
import { Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const Resetpassword = () => {
    const [password,setPassword] = useState();
    const params = useParams();
    console.log(params.token);
  return (
    <Container py={'16'} h={'90vh'}>
        <form>
            <Heading children="reset password" my={'16'} textTransform={'uppercase'} textAlign={'center'}/>

            <VStack spacing={'8'}>
            <FormLabel htmlFor="Password" children="Enter a password" />
          <Input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="New password"
          focusBorderColor="yellow.500"
        />

        <Button type='submit' w={'full'} colorScheme='yellow'>Reset Password</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Resetpassword
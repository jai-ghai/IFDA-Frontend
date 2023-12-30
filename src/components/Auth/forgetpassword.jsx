import { Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Forgetpassword = () => {
    const [email,setEmail] = useState();
  return (
    <Container py={'16'} h={'90vh'}>
        <form>
            <Heading children="forget password" my={'16'} textTransform={'uppercase'} textAlign={'center'}/>

            <VStack spacing={'8'}>
            <FormLabel htmlFor="email" children="Email address" />
          <Input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
          focusBorderColor="yellow.500"
        />

        <Button type='submit' w={'full'} colorScheme='yellow'> Send Reset Link</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Forgetpassword
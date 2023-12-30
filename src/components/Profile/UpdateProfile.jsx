import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UpdateProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  return (
    <Container py={'16'} minH={'90vh'}>
    <form action="">
        <Heading textTransform={'uppercase'} my={'16'}  children="Update Profile" textAlign={['center','left']}/>

        <VStack spacing={'8'}>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          focusBorderColor="yellow.500"
        />
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email"
          focusBorderColor="yellow.500"
        />

        <Button w={'full'} colorScheme='yellow' type='submit'> Update</Button>
        </VStack>
    </form>

    </Container>
  )
}

export default UpdateProfile
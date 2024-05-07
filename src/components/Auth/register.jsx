import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export const fileUploadCss = {
    cursor:"pointer",
    marginLeft:"-5%",
    width:"110%",
    border:"none",
    height:"100%",
    color:"#ECC94B",
    backgroundColor:"white",

}

const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss,
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'8'}>
        <Heading textTransform={'uppercase'} children="Registration" />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>

        <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size={'2xl'}/>
        </Box>

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
          <FormLabel htmlFor="password" children="Password" />
          <Input
          required
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          focusBorderColor="blue.500"
        />
        </Box>

        <Box my={'4'}>
          <FormLabel htmlFor='chooseAvatar' children="Choose Avatar" />
          <Input
          accept='image/*'
          required
          id="avatar"
          type="file"
          focusBorderColor="blue.500"
          css ={fileUploadStyle}
          onChange={changeImageHandler}
        />
        </Box>

        <Button colorScheme='blue' my={'4'} type='submit'>Sign UP</Button>

        <Box my={4}>
        Already Signed Up? <Link to={'/login'}>
        <Button colorScheme='blue' variant={'link'}>Login
        </Button>{" "}here
        </Link>
        </Box>

        </form>
        
      </VStack>
    </Container>
  );
};
export default Register
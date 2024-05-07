// // components/Footer.js
// import React from 'react';
// import { Box, Flex, Text, Link, IconButton, Stack } from '@chakra-ui/react';
// import {
//   FaLinkedin,
//   FaFacebook,
//   FaInstagram,
//   FaYoutube,
// } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <Box as="footer" mt="auto" py={{ base: '4', md: '8' }} bg="blackAlpha.900" color="white">
//       <Flex
//         direction={{ base: 'column', md: 'row' }}
//         align={{ base: 'center', md: 'center' }}
//         justify="space-between"
//         maxW="1200px"
//         mx="auto"
//         px={{ base: '4', md: '0' }}
//       >
//         <Stack spacing={{ base: '4', md: '0' }} align="start" mb={{ base: '4', md: '0' }}>
//           <Text fontSize="lg" fontWeight="bold">
//             IFDA INSTITUTE
//           </Text>
//           <Text>
//             A platform for students to explore and learn new skills through
//             online courses.
//           </Text>
//         </Stack>

//         <Stack spacing="4" direction={{ base: 'row', md: 'row' }}>
//           <Link href="https://in.linkedin.com/company/ifda-institute-delhi" isExternal>
//             <IconButton
//               aria-label="LinkedIn"
//               icon={<FaLinkedin />}
//               variant="ghost"
//               color="white"
//               fontSize="20px"
//             />
//           </Link>
//           <Link href="https://www.facebook.com/IFDAINSTITUTE/" isExternal>
//             <IconButton
//               aria-label="Facebook"
//               icon={<FaFacebook />}
//               variant="ghost"
//               color="white"
//               fontSize="20px"
//             />
//           </Link>
//           <Link href="https://www.instagram.com/ifda_institute/" isExternal>
//             <IconButton
//               aria-label="Instagram"
//               icon={<FaInstagram />}
//               variant="ghost"
//               color="white"
//               fontSize="20px"
//             />
//           </Link>
//           <Link href="https://www.youtube.com/c/IFDAInstitute" isExternal>
//             <IconButton
//               aria-label="YouTube"
//               icon={<FaYoutube />}
//               variant="ghost"
//               color="white"
//               fontSize="20px"
//             />
//           </Link>
//         </Stack>
//       </Flex>

//       <Text mt={{ base: '4', md: '4' }} textAlign="center" fontSize="sm">
//         &copy; 2023 IFDA INSTITUTE. All rights reserved.
//       </Text>
//     </Box>
//   );
// };

// export default Footer;



// updated 
import React from 'react';
import { Box, Stack, Text, Divider, Center, SimpleGrid, useColorModeValue, Link, VisuallyHidden, Image } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import Logo from '../../../assests/images/logo (1).png';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Stack
  maxW="7xl"
  mx="auto"
  px={{
    base: 4,
    md: 8,
    lg: 10,
  }}
  py={{
    base: 4,
    md: 8,
  }}
>
  <SimpleGrid
    columns={{ base: 1, md: 2, lg: 4 }}
    spacing={8}
  >
    <Stack spacing={6}>
      <Box>
        <Image src={Logo} h={{ base: 12, md: 16 }} w={{ base: 32, md: 44 }} />
      </Box>
      <Text fontSize={'sm'}>© 2022 All rights reserved</Text>
    </Stack>

    <Stack align={'flex-start'}>
      <ListHeader>Quick Link</ListHeader>
      <Link href={'/about'}>About us</Link>
      <Link href={'#'}>Blog</Link>
      <Link href={'https://ifda.in/contact.php'}>Contact us</Link>

    </Stack>
    <Stack align={'flex-start'}>
      <ListHeader>Support</ListHeader>
      <Link href={'#'}>Help Center</Link>
      <Link href={'#'}>Terms of Service</Link>
      <Link href={'#'}>Legal</Link>

    </Stack>
    <Stack align={'flex-start'}>
      <ListHeader>Company</ListHeader>
      <Link href={'#'}>TERMS & CONDITIONS</Link>
      <Link href={'#'}>PRIVACY POLICY</Link>
    </Stack>
  </SimpleGrid>
</Stack>

      <Divider />
      <Center
  maxW="7xl"
  mx="auto"
  px={{
    base: 4,
    md: 8,
    lg: 10,
  }}
  py={{
    base: 1, // Adjusted line height here
    md: 2,
  }}
>
  <Stack direction="row" alignItems="center" spacing={4} pt={2}>
    <SocialButton label={'linkedin'} href={'https://in.linkedin.com/company/ifda-institute-delhi'}>
      <FaLinkedin />
    </SocialButton>
    <SocialButton label={'Facebook'} href={'https://www.facebook.com/IFDAINSTITUTE/'}>
      <FaFacebook />
    </SocialButton>
    <SocialButton label={'Instagram'} href={'https://www.instagram.com/ifda_institute/'}>
      <FaInstagram />
    </SocialButton>
    <SocialButton label={'YouTube'} href={'https://www.youtube.com/c/IFDAInstitute'}>
      <FaYoutube />
    </SocialButton>
  </Stack>
</Center>
<Center
  maxW="7xl"
  mx="auto"
  px={{
    base: 4,
    md: 8,
    lg: 10,
  }}
  py={{
    base: 1, // Adjusted line height here
    md: 2,
  }}
>
  <Text textAlign="center" mr={4} pb={5}>
    Unlock the door to endless possibilities through education.
  </Text>
</Center>


      
    </Box>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <Link
      href={href}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Box
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}
      >
        {children}
        <VisuallyHidden>{label}</VisuallyHidden>
      </Box>
    </Link>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default Footer;






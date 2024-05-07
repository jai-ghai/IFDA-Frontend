// import { chakra, Container, Stack, HStack, VStack, Flex, Text, Image, Box } from '@chakra-ui/react';
// import growth from '../../assests/images/growth.png'

// const overviewList = [
//   { id: 1, label: 'Daily Login for Seamless Learning', subLabel: 'Start your learning adventure with just a click.' },
//   {
//     id: 2,
//     label: 'Interactive Course Selection for Personalized Growth',
//     subLabel: 'Tailor your learning experience by choosing courses that align with your goals.'
//   },
//   {
//     id: 3,
//     label: 'Streak Building for Skill Mastery',
//     subLabel: 'Every day is an opportunity to enhance your expertise and refine your capabilities.'
//   },
//   {
//     id: 4,
//     label: 'Continuous Improvement Through Lesson Selection',
//     subLabel: 'Choose your lessons wisely to unlock a set of fresh challenges and insights.'
//   }
// ];

// const OverviewSection = () => {
//   return (
//     <Container maxW="6xl" py={10}>
//       <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={2}>
//         How it works?
//       </chakra.h2>
//       <Stack
//         direction={{ base: 'column', md: 'row' }}
//         spacing={{ base: 0, md: 3 }}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <VStack spacing={4} alignItems="flex-start" mb={{ base: 5, md: 0 }} maxW="md">
//           {overviewList.map((data) => (
//             <Box key={data.id}>
//               <HStack spacing={2}>
//                 <Flex
//                   fontWeight="bold"
//                   boxShadow="md"
//                   color="white"
//                   bg="blue.400"
//                   rounded="full"
//                   justifyContent="center"
//                   alignItems="center"
//                   w={10}
//                   h={10}
//                 >
//                   {data.id}
//                 </Flex>
//                 <Text fontSize="xl">{data.label}</Text>
//               </HStack>
//               <Text fontSize="md" color="gray.500" ml={12}>
//                 {data.subLabel}
//               </Text>
//             </Box>
//           ))}
//         </VStack>
//         <Image
//           boxSize={{ base: 'auto', md: 'lg' }}
//           objectFit="contain"
//           src={growth}
//           rounded="lg"
         
//         />
//       </Stack>
//     </Container>
//   );
// };

// export default OverviewSection;
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  Heading,
  Icon,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { MdPersonAdd, MdExplore, MdSchool } from 'react-icons/md';

const OverviewSection = () => {
  const { colorMode } = useColorMode();

  const steps = [
    {
      icon: <Icon as={MdPersonAdd} fontSize="3xl" />,
      title: 'Sign Up',
      description: 'Create your account with us.',
    },
    {
      icon: <Icon as={MdExplore} fontSize="3xl" />,
      title: 'Explore Courses',
      description: 'Discover our wide range of courses.',
    },
    {
      icon: <Icon as={MdSchool} fontSize="3xl" />,
      title: 'Start Learning',
      description: 'Begin your learning journey today!',
    },
  ];

  return (
    <Box py={12} bg={useColorModeValue('gray.100', 'gray.800')}>
      <Stack spacing={{ base: 8, md: 10 }} maxW="3xl" mx="auto" textAlign="center">
        <Heading as="h2" size="xl">How it Works</Heading>
        <Text fontSize="lg">Follow these simple steps to get started:</Text>
        <Flex
          justify="space-between"
          align="stretch"
          wrap="wrap"
          spacing={{ base: 4, md: 5 }}
          mx={[8, 0]} // Added margin only on mobile devices
          my={[4, 0]} // Added margin on top and bottom for mobile devices
        >
          {steps.map((step, index) => (
            <Step key={index} number={index + 1} {...step} colorMode={colorMode} />
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};

const Step = ({ number, icon, title, description, colorMode }) => {
  return (
    <Box
      flex={{ base: '1 1 100%', md: '1 1 30%' }}
      maxW={{ base: 'none', md: 'calc(33.3333% - 2rem)' }}
      p={{ base: 6, md: 8 }}
      bg={useColorModeValue('white', 'gray.700')}
      rounded="lg"
      shadow="lg"
      transition="background 0.3s ease, transform 0.3s ease"
      _hover={{
        bg: useColorModeValue('gray.50', 'gray.600'),
        transform: 'scale(1.02)',
      }}
      mb={{ base: 4, md: 0 }}
      mx={{ base: 2, md: 2 }} // Added margin for mobile
      textAlign="center" // Centering the content inside the box
    >
      <Flex align="center" justify="center" w={12} h={12} bg="blue.500" color="white" rounded="full" mb={6}>
        {icon}
      </Flex>
      <Box mt={4} transition="color 0.3s ease">
        <Text fontSize="xl" fontWeight="semibold">{`Step ${number}`}</Text>
        <Heading as="h3" size="md" mt={2}>{title}</Heading>
        <Text mt={2}>{description}</Text>
      </Box>
    </Box>
  );
};

export default OverviewSection;







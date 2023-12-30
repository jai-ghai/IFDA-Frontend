// components/Footer.js
import React from 'react';
import { Box, Flex, Text, Link, IconButton, Stack } from '@chakra-ui/react';
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" mt="auto" py={{ base: '4', md: '8' }} bg="blackAlpha.900" color="white">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'center' }}
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px={{ base: '4', md: '0' }}
      >
        <Stack spacing={{ base: '4', md: '0' }} align="start" mb={{ base: '4', md: '0' }}>
          <Text fontSize="lg" fontWeight="bold">
            IFDA INSTITUTE
          </Text>
          <Text>
            A platform for students to explore and learn new skills through
            online courses.
          </Text>
        </Stack>

        <Stack spacing="4" direction={{ base: 'row', md: 'row' }}>
          <Link href="https://in.linkedin.com/company/ifda-institute-delhi" isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              color="white"
              fontSize="20px"
            />
          </Link>
          <Link href="https://www.facebook.com/IFDAINSTITUTE/" isExternal>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              color="white"
              fontSize="20px"
            />
          </Link>
          <Link href="https://www.instagram.com/ifda_institute/" isExternal>
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              color="white"
              fontSize="20px"
            />
          </Link>
          <Link href="https://www.youtube.com/c/IFDAInstitute" isExternal>
            <IconButton
              aria-label="YouTube"
              icon={<FaYoutube />}
              variant="ghost"
              color="white"
              fontSize="20px"
            />
          </Link>
        </Stack>
      </Flex>

      <Text mt={{ base: '4', md: '4' }} textAlign="center" fontSize="sm">
        &copy; 2023 IFDA INSTITUTE. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;

import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react';
import {Link} from 'react-router-dom';
// import introVideo from './../../assests/videos/intro.mp4'
import mainVideo  from "../../assests/videos/Final.mp4"
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assests/docs/termsAndCondition'

const Founder = () =>(
    <Stack direction={['column','row']} spacing={['4','16']} padding={'8'}>
        <VStack>
            <Avatar src='https://ifda.in/img/about/ifda-founder.webp' boxSize={['40','48']}/>
            <Text children="Co-Founder" opacity={0.7}/>
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center','flex-start']}>
            <Heading children="IFDA INSTITUTE" size={['md','xl']}/>
            <Text textAlign={['center','left']} children={`Our mission to provide a platform that makes learning accessible to everyone, regardless of their age, location, or background. We aim to offer a diverse range of educational resources that cater to the needs and interests of learners at every stage of their journey. 
            `}/>
        </VStack>
    </Stack>
)

const VideoPlayer = () =>(
    <Box>
        <video
            autoPlay
            // muted
            controls 
            controlsList='nodownload nofullscreen noremoteplayback'
            disablePictureInPicture
            disableRemotePlayback
            src={mainVideo}>
            </video>
    </Box>
)

const TandC = ({termsAndCondition})=>(
    <Box>
        <Heading size={'md'} children="Terms and Condition" my={'4'} textAlign={['center','left']}/>

        <Box h={'sm'} p={'4'} overflowY={'scroll'}>
        <Text fontFamily={'heading'} letterSpacing={'widest'} textAlign={['center','left']}>{termsAndCondition}</Text>
        <Heading children="Refund only applicable for cancellation within 7 days." my={'4'} size={'xs'}/>
        </Box>
    </Box>
)

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
        <Heading children="About Us" textAlign={['center','left']}/>
        <Founder/>
        <Stack m={'8'} direction={['column','row']} alignItems={'center'}>
            <Text fontFamily={'cursive'} textAlign={['center','left']} m={'8'} children="We are the video streaming platform with some premium courses available only for premium users"/>

            <Link to="/subscribe">
                <Button variant={'ghost'} colorScheme='blue'>Checkout Our Plan </Button>
            </Link>
        </Stack>
        <VideoPlayer/>

        <TandC termsAndCondition={termsAndCondition}/>

        <HStack my={'4'} p={'4'}>
            <RiSecurePaymentFill/>
            <Heading size={'xs'} fontFamily={'sans-serif'} textTransform={'uppercase'} children= {'Payment is secured by Razorpay'} />
        </HStack>
    </Container>
  )
}

export default About
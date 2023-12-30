import React from 'react';
import { Box, Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import "./home.css";
import { Link } from 'react-router-dom';
import vg from "../../assests/images/bg2.png";
import {CgGoogle, CgYoutube} from 'react-icons/cg';
import {SiCoursera, SiUdemy} from 'react-icons/si';
import {DiAws} from 'react-icons/di';
import introVideo from "../../assests/videos/intro.mp4"
import Testimonials from './Testimonials';
import OverviewSection from './OverviewSection';
import Hero from './hero';
 
function Home() {
  return (
    <section className='home'>
        {/* <div className="container">
            <Stack 
            direction={['column','row']}
            height="100%"
            justifyContent={['center','space-between']}
            alignItems="center"
            spacing={['16','56']}>

                <VStack width={"full"} alignItems={['center','flex-end']} spacing={'8'}>
                    <Heading children="LEARN WITH IFDA INSTITUTE" size={'2xl'}/>
                    <Text fontSize={'1xl'} fontFamily={'cursive'} textAlign={['center', 'left']} children="Explore Boundless Horizons with IFDA Institute: Where Learning Paves the Way to Limitless Opportunities!"/>
                    <Link to="./courses">
                        <Button size={'lg'} colorScheme='yellow'>
                            Explore Now
                        </Button>
                    </Link>
                </VStack>
               
                <Image className='vector-graphics' boxSize={'md'} src={vg} objectFit={'contain'}/>
            </Stack>
        </div> */}

        <Hero/>

        <Box padding={'8'} bg='blackAlpha.800'>
            <Heading 
            textAlign={'center'}
            fontFamily="body"
            color={'yellow.400'}
            children="OUR BRANDS"/>

            <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop="4">
                <CgGoogle/>
                <CgYoutube/>
                <SiCoursera/>
                <SiUdemy/>
                <DiAws/>
            </HStack>
        </Box>

        <OverviewSection/>

        {/* <div className="container2">
            <video
            // autoPlay
            controls 
            controlsList='nodownload nofullscreen noremoteplayback'
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}>
            </video>
        </div> */}
        

        <Testimonials/>

    </section>
  )
}

export default Home

const MainVideo = (()=>{
    return(
        <div className="container2 vector-graphics">
            <video
            // autoPlay
            controls 
            controlsList='nodownload nofullscreen noremoteplayback'
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}>
            </video>
        </div>
    )
})





import React from 'react';
// import { Box, HStack, Heading,} from '@chakra-ui/react'
import "./home.css";
// import {CgGoogle, CgYoutube} from 'react-icons/cg';
// import {SiCoursera, SiUdemy} from 'react-icons/si';
// import {DiAws} from 'react-icons/di';
import Testimonials from './Testimonials';
import OverviewSection from './OverviewSection';
import Hero from './hero';
import ExploreCourse from './ExploreCourse';
 
function Home() {
  return (
    <section className='home'>
        <Hero/>

        <ExploreCourse/>

       

        <OverviewSection/>

        {/* <Box padding={'8'} bg='blackAlpha.800'>
            <Heading 
            textAlign={'center'}
            fontFamily="body"
            color={'blue.400'}
            children="OUR BRANDS"/>

            <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop="4">
                <CgGoogle/>
                <CgYoutube/>
                <SiCoursera/>
                <SiUdemy/>
                <DiAws/>
            </HStack>
        </Box> */}

        <Testimonials/>

      

    </section>
  )
}

export default Home






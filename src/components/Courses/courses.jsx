import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';


const Course = ({
  views,
  title,
  imageSrc,
  id,
  addtoPlayListHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        size={'sm'}
        maxW={'200px'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        textTransform={'uppercase'}
        children={`Lectures - ${lectureCount}`}
      />
      <Heading
        size={'xs'}
        textTransform={'uppercase'}
        children={`Views - ${views}`}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          colorScheme="yellow"
          variant={'ghost'}
          onClick={() => addtoPlayListHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  
  const addtoPlayListHandler = ()=>{
    console.log("added to playlist.. ");
  }

  const categories = [
    'Web Development',
    'App Development',
    'Data science',
    'Artificial Intelligence',
    'Game Development',
    'Programming Languages',
  ];
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onClick={e => setKeyword(e.target.value)}
        placeholder={'search a course....'}
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <Course
          id={'1'}
          imageSrc={'https://cdn.pixabay.com/photo/2020/05/05/12/12/coffee-5132832_1280.jpg'}
          views={'23'}
          title={'sample'}
          description={'dataofthecourse'}
          creator={'jai'}
          lectureCount={2}
          addtoPlayListHandler={addtoPlayListHandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;

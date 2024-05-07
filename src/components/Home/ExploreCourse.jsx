import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading }) => {
//   // Your Course component remains unchanged
//   // ...

//   return (
//     <VStack className="course" alignItems={['center', 'flex-start']}>
//       <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
//       <Heading
//         textAlign={['center', 'left']}
//         maxW="200px"
//         size={'sm'}
//         fontFamily={'sans-serif'}
//         noOfLines={3}
//         children={title}
//       />
//       <Text noOfLines={2} children={description} />

//       <HStack>
//         <Text
//           fontWeight={'bold'}
//           textTransform="uppercase"
//           children={'Creator'}
//         />

//         <Text
//           fontFamily={'body'}
//           textTransform="uppercase"
//           children={creator}
//         />
//       </HStack>

//       <Heading
//         textAlign={'center'}
//         size="xs"
//         children={`Lectures - ${lectureCount}`}
//         textTransform="uppercase"
//       />

//       <Heading
//         size="xs"
//         children={`Views - ${views}`}
//         textTransform="uppercase"
//       />

//       <Stack direction={['column', 'row']} alignItems="center">
//         <Link to={`/course/${id}`}>
//           <Button colorScheme={'blue'}>Watch Now</Button>
//         </Link>
//         <Button
//           isLoading={loading}
//           variant={'ghost'}
//           colorScheme={'blue'}
//           onClick={() => addToPlaylistHandler(id)}
//         >
//           Add to playlist
//         </Button>
//       </Stack>
//     </VStack>
//   );
// };

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems="center" spacing={2} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Image src={imageSrc} boxSize={['120px', '180px']} objectFit="cover" borderRadius="md" />
      <VStack alignItems="center" textAlign="center" spacing={1}>
        <Heading fontSize={['lg', 'xl']} fontFamily="heading" noOfLines={2}>
          {title}
        </Heading>
        <Text fontSize="sm" noOfLines={2}>{description}</Text>
      </VStack>
      <HStack alignItems="center" spacing={2}>
        <Text fontWeight="bold" textTransform="uppercase">Creator:</Text>
        <Text>{creator}</Text>
      </HStack>
      <Text fontSize="sm" textTransform="uppercase">Lectures - {lectureCount}</Text>
      <Text fontSize="sm" textTransform="uppercase">Views - {views}</Text>
      <HStack spacing={4}>
        <Link to={`/course/${id}`} textDecoration="none">
          <Button colorScheme="blue" size="sm">Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant="ghost"
          colorScheme="blue"
          size="sm"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </HStack>
    </VStack>
  );
};


const ExploreCourse = () => {
  const dispatch = useDispatch();

  const addToPlaylistHandler = async (courseId) => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  const { loading, courses, error, message } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  // Show only three courses on the landing page
  const displayedCourses = courses.slice(0, 3);

  return (
    <Container maxW="container.lg" paddingY={'8'}>
      {/* Heading for Popular Courses */}
      <Heading textAlign="center" mb="8" children="Popular Courses" />

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {displayedCourses.length > 0 ? (
          displayedCourses.map((item) => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt="4" children="Courses Not Found" />
        )}
      </Stack>

      {/* Explore More link as simple text in the right corner for desktop and center for mobile */}
      <Link to="./courses">
        <Text
          fontSize={['md', 'lg']}
          textAlign={['center', 'right']}
          color="blue.400"
          mt="4"
          _hover={{ textDecoration: 'underline' }}
          
        >
          Explore More
        </Text>
      </Link>
    </Container>
  );
};

export default ExploreCourse;

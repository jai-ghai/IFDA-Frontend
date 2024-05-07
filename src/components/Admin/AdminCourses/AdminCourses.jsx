import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assests/images/cursor.png';
import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
import {
  getAllCourses,
  getCourseModules,
} from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
// import axios from 'axios';

const AdminCourses = () => {
  const { courses, modules } = useSelector(state => state.course);
  const lectures = modules ? modules.flatMap(module => module.lectures) : [];
  const { loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const coureDetailsHandler = (courseId, title) => {
    dispatch(getCourseModules(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };
  const deleteButtonHandler = courseId => {
    console.log(courseId);
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseModules(courseId));
  };



// const requestPresignedUrl = async (file) => {
//   try {
//     const response = await axios.post(
//       'https://lms.ifda.in/api/v1/generate-presigned-url',
//       {
//         file_name: file.name,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       }
//     );

//     const { presignedUrl, key } = response.data;

//     await uploadFileToPresignedUrl(file, presignedUrl);

//     return key;
//   } catch (error) {
//     console.error('Error fetching presigned URL:', error);
//     toast.error('Error fetching presigned URL. Please try again.');
//   }
// };

// const uploadFileToPresignedUrl = async (file, url) => {
//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       body: file,
//       headers: {
//         'Content-Type': file.type,
//       },
//     });

//     if (!response.ok) throw new Error('Failed to upload file.');

//     toast.success('File uploaded successfully.');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     toast.error('Error uploading file. Please try again.');
//   }
// };

const addLectureHandler = async (e, courseId, title, description, file, moduleId) => {
  e.preventDefault();
  const formDataObject = {
    title: title,
    description: description,
    file: file,
  };

  if (!file) {
    toast.error('Please select a file first.');
    return;
  }
  await dispatch(addLecture(courseId, moduleId, formDataObject));
  dispatch(getCourseModules(courseId));
};

useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch({ type: 'clearError' });
  }

  if (message) {
    toast.success(message);
    dispatch({ type: 'clearMessage' });
  }

  dispatch(getAllCourses());
}, [dispatch, error, message, onClose]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map(item => (
                <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          modules = {modules}
          loading={loading}
          courses = {courses}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>

      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coureDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            View Lectures
          </Button>

          
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
export default AdminCourses;

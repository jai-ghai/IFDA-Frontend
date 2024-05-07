
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Select,
  Text,
  Button, // Added Button component
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Sidebar from '../Sidebar';
import cursor from '../../../assests/images/cursor.png';
import { getAllUsers } from '../../../redux/actions/admin';
import { getAllCourses } from '../../../redux/actions/course';
// import { buyPayment } from '../../../redux/actions/user';
import axios from 'axios';
import { server } from '../../../redux/store';



const AccessCourse = () => {
  const { users, error: userError, message: userMessage } = useSelector(state => state.admin);
  const { courses, error: courseError, message: courseMessage } = useSelector(state => state.course);

  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('');

  const dispatch = useDispatch();

  const handleEmailSelect = email => {
    const selectedUser = users.find(user => user.email === email);
    setSelectedEmail(email);
    setSelectedUser(selectedUser);
  };

  const handleCourseSelect = courseId => {
    const selectedCourse = courses.find(course => course._id === courseId);
    setSelectedCourseId(courseId);
    setSelectedCourseTitle(selectedCourse.title);
  };

  // const handlePurchase = async () => {
  //   try {
  //     // console.log(selectedUser._id, selectedCourseId);
  //     // Make a request to the purchaseCourse API
  //     const response = await buyPayment(selectedUser._id, selectedCourseId);
  //     toast.success(response.message);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const handlePurchase = async () => {
    try {
      // Make a request to the purchaseCourse API
      const response = await axios.post(
        `${server}/purchase`,
        { userId: selectedUser._id, courseId: selectedCourseId },
        {
          headers: {
            'Content-type': 'application/json',
          },
          withCredentials: true, // Include this only if necessary
        }
      );
  
      toast.success(response.data.message);
    } catch (error) {
      console.error("Purchase failed:", error.message);
      toast.error("Failed to purchase course. Please try again.");
    }
  };
  

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch({ type: 'clearError' });
    }

    if (userMessage) {
      toast.success(userMessage);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllUsers());
  }, [dispatch, userError, userMessage]);

  useEffect(() => {
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }

    if (courseMessage) {
      toast.success(courseMessage);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses());
  }, [dispatch, courseError, courseMessage]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box
        p={['0', '16']}
        overflowX="auto"
        // display="flex"
        // flexDirection="column"
        // justifyContent={['center', 'flex-start']} // Center on mobile, left-align on larger screens
        // alignItems={['center', 'center']} // Center horizontally on both
      >
        <Heading
          textTransform={'uppercase'}
          children="Give Access"
          my="16"
          textAlign={['center', 'left']}
        />

        {users && users.length > 0 ? (
          <Select
            mt="16"
            placeholder="Select an email"
            value={selectedEmail}
            onChange={e => handleEmailSelect(e.target.value)}
          >
            {users.map(user => (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            ))}
          </Select>
        ) : (
          <Text>No users available</Text>
        )}

        {selectedUser && (
          <Box mt="4">
            <Text>Email: {selectedUser.email}</Text>
            <Text>Name: {selectedUser.name}</Text>
            <Text>ID: {selectedUser._id}</Text>
          </Box>
        )}

        {courses && courses.length > 0 ? (
          <Select
            mt="16"
            placeholder="Select a course"
            value={selectedCourseId}
            onChange={e => handleCourseSelect(e.target.value)}
          >
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </Select>
        ) : (
          <Text>No courses available</Text>
        )}

        {selectedCourseId && (
          <Box mt="4">
            <Text>Course Title: {selectedCourseTitle}</Text>
            <Text>Course ID: {selectedCourseId}</Text>
          </Box>
        )}

        {/* Button to trigger the purchase */}
        {selectedUser && selectedCourseId && (
          <Button mt="4" colorScheme="blue" onClick={handlePurchase}>
            Purchase Course
          </Button>
        )}
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AccessCourse;

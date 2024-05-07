import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { createModule } from '../../../redux/actions/admin'; // Import the action for creating modules
import { getAllCourses } from '../../../redux/actions/course'; // Import the action for getting courses
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const CreateModule = () => {
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  const { courses } = useSelector(state => state.course);
  const { loading, error, message} = useSelector(state => state.admin); // Fetch courses from Redux store

  useEffect(() => {
    // Fetch courses when component mounts
    dispatch(getAllCourses());
  }, [dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    if (!courseId || !title) {
      toast.error('Please select a course and enter module title');
      return;
    }
    dispatch(createModule(courseId, title)); // Dispatch action to create module
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
  }, [dispatch, error, message]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading textTransform={'uppercase'} children="Create Module" my="16" textAlign={['center', 'left']} />
          <VStack m="auto" spacing={'8'}>
            <Select value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="Select Course">
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </Select>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Module Title" type={'text'} />
            <Button isLoading={loading} w="full" colorScheme={'purple'} type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateModule;

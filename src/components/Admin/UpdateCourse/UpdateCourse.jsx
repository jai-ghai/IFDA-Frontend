import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react';
import { updateCourse } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';
import { getAllCourses } from '../../../redux/actions/course';
import { fileUploadCss } from '../../Auth/register';

const UpdateCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const dispatch = useDispatch();
  const { courses } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);

  // Fetch courses when component mounts
  useEffect(() => {
    // Fetch courses when component mounts
    dispatch(getAllCourses());
  }, [dispatch]);

  const selectedCourse = courses.find(course => course._id === courseId);

  // Set input field values based on the selected course
  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title);
      setDescription(selectedCourse.description);
      setCreatedBy(selectedCourse.createdBy);
      setCategory(selectedCourse.category);
      // Set other fields as needed
    }
  }, [selectedCourse]);

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const updatedCourse = {
      _id: courseId,
      title,
      description,
      createdBy,
      category,
      // Add other fields as needed
    };
    dispatch(updateCourse(updatedCourse));
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
          <Heading textTransform={'uppercase'} children="Update Course" my="16" textAlign={['center', 'left']} />
          <VStack m="auto" spacing={'8'}>
            <Select value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="Select Course">
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </Select>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>

              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
            )}
            <Button
              isLoading={loading}
              w="full"
              colorScheme={'purple'}
              type="submit"
            >
              Update
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default UpdateCourse;

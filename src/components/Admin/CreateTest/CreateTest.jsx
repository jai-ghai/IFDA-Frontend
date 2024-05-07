import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { getAllCourses } from '../../../redux/actions/course';
import { createTest } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const CreateTest = () => {
  const [courseId, setCourseId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]); // Array to store questions
  const [message, setMessage] = useState('');
  const [filteredModules, setFilteredModules] = useState([]);
  const [optionCount, setOptionCount] = useState(4);

  const dispatch = useDispatch();
  const { courses } = useSelector(state => state.course);
  const { error, message: testMessage } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (testMessage) {
      toast.success(testMessage);
    }
  }, [error, testMessage]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setCourseId(courseId);
    const selectedCourse = courses.find(course => course._id === courseId);
    if (selectedCourse) {
      setFilteredModules(selectedCourse.modules);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId || !moduleId || !question || !options.every(option => option.trim()) || !correctAnswer) {
      toast.error('Please fill in all fields.');
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer
    };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);

    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleFinalSubmit = () => {
    console.log('====================================');
    console.log(questions);
    console.log('====================================');
    if (questions.length === 0) {
      toast.error('Please add at least one question.');
      return;
    }

    // Dispatch action to create test with all questions
    dispatch(createTest(courseId, moduleId, questions));

    setMessage('Test created successfully.');
    setQuestions([]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (optionCount < 6) {
      setOptionCount(optionCount + 1);
      setOptions(prevOptions => [...prevOptions, '']);
    }
  };

  const handleRemoveOption = () => {
    if (optionCount > 2) {
      setOptionCount(optionCount - 1);
      setOptions(prevOptions => prevOptions.slice(0, -1));
    }
  };

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py="16" maxW="container.md"> {/* Adjust max width for small screens */}
        <Heading textTransform={'uppercase'} children="Create Test" my="16" textAlign={['center', 'left']} />
        <VStack m="auto" spacing={'8'}>
          <Select value={courseId} onChange={handleCourseChange} placeholder="Select Course">
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </Select>
          <Select value={moduleId} onChange={e => setModuleId(e.target.value)} placeholder="Select Module">
            {filteredModules.map(module => (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            ))}
          </Select>
          <Container px={0} py={0} maxW="container.md"> {/* Adjust padding and max width for question block */}
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              type={'text'}
              h="8rem" // Double the height on medium screens
            />
          </Container>
          {options.map((option, index) => (
            <Input
              key={index}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              type={'text'}
            />
          ))}
          <Select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Select Correct Answer"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Button onClick={handleAddOption}>Add Option</Button>
          <Button onClick={handleRemoveOption}>Remove Option</Button>
          <Button
            onClick={handleSubmit}
            colorScheme={'purple'}
            type="submit"
          >
            Add MCQ
          </Button>
          <Button onClick={handleFinalSubmit} colorScheme={'blue'}>
            Submit All Questions
          </Button>
          {message && <p>{message}</p>}
        </VStack>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateTest;

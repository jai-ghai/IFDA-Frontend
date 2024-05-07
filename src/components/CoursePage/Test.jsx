import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const Test = ({ questions, onSubmit }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    setActiveQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
  }, [questions]);

  useEffect(() => {
    if (showResult) {
      console.log("Score:", result.score);
    }
  }, [showResult, result]);

  const onClickNext = () => {
    setSelectedAnswerIndex(null);

    const correctAnswer = questions[activeQuestion].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    setResult(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 5 : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1
    }));

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
      onSubmit(result);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(answer);
  };

  if (!questions || questions.length === 0) {
    return <Box>Test Not available</Box>;
  }

  return (
    <Box className="quiz-container" style={{ maxWidth: '500px', minWidth: '250px', borderRadius: '4px', margin: 'auto', padding: '30px 60px', border: '1px solid' }}>
      {!showResult ? (
        <Box>
          <Box style={{ display: 'flex', alignItems: 'baseline' }}>
            <Text className="active-question-no" style={{ fontSize: '32px', fontWeight: '500', color: '#edb413' }}>{activeQuestion + 1}</Text>
            <Text className="total-question" style={{ fontSize: '16px', fontWeight: '500' }}>/ {questions.length}</Text>
          </Box>
          <Heading as="h2" size="lg" mt="4" style={{ fontSize: '20px', fontWeight: '500', margin: '0' }}>
            {questions[activeQuestion].question}
          </Heading>
          <UnorderedList mt="4" listStyleType="none" pl="0">
            {questions[activeQuestion].options.map((answer, index) => (
              <ListItem
                key={index}
                onClick={() => onAnswerSelected(answer, index)}
                className={selectedAnswerIndex === index ? 'selected-answer' : ''}
                cursor="pointer"
                borderRadius="md"
                py="2"
                px="4"
                mb="2"
                _hover={{ bgColor: 'gray.100' }}
                style={{
                  textDecoration: 'none',
                  listStyle: 'none',
                  color: '#2d264b',
                  fontSize: '16px',
                  background: selectedAnswerIndex === index ? '#bdbdbd' : '#ffffff',
                  border: '1px solid #eaeaea',
                  borderRadius: '16px',
                  padding: '11px',
                  marginTop: '15px',
                  cursor: 'pointer',
                }}
              >
                {answer}
              </ListItem>
            ))}
          </UnorderedList>
          <Box textAlign="right">
            <Button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
              colorScheme="blue"
              mt="4"
              style={{ background: 'linear-gradient(90.04deg, #0e3477 0.03%, #edb413 99.96%)', borderRadius: '9px', fontSize: '18px', color: '#ffffff', padding: '10px 42px', outline: 'none', border: 'none', cursor: 'pointer', marginTop: '15px' }}
            >
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="result" mt="4">
          <Heading as="h3" size="lg" style={{ fontSize: '24px', letterSpacing: '1.4px', textAlign: 'center'}}>
            Result
          </Heading>
          <Text style={{ fontSize: '16px', fontWeight: '500'}}>
            Total Question: <span>{questions.length}</span>
          </Text>
          <Text style={{ fontSize: '16px', fontWeight: '500'}}>
            Total Score: <span>{result.score}</span>
          </Text>
          <Text style={{ fontSize: '16px', fontWeight: '500'}}>
            Correct Answers: <span>{result.correctAnswers}</span>
          </Text>
          <Text style={{ fontSize: '16px', fontWeight: '500'}}>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Test;

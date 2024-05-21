// import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseLectures } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';

// const CoursePage = ({ user }) => {
//   const [lectureNumber, setLectureNumber] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);

//   const { lectures, loading } = useSelector(state => state.course);

//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseLectures(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/v1/paymentcheck/${params.id}/${user._id}`, {
//           method: 'GET',
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error checking purchased course: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log("Purchase check response:", data);
//         // console.log(data.hasPurchasedCourse);
//         setHasPurchasedCourse(data.hasPurchasedCourse);

//         if (user.role !== 'admin' && !data.hasPurchasedCourse) {
//           // Redirect to the purchase page
//           return <Navigate to={'/purchase'} />;
//         }
        
//       } catch (error) {
//         console.error('Error checking purchased course:', error.message);
//       }
//     };

//     if (user?._id && params.id) {
//       checkPurchasedCourse();
//     }
//   }, [dispatch, user?._id, params.id]);

//   // useEffect(() => {
//   //   console.log("hasPurchasedCourse:", hasPurchasedCourse);
//   // }, [hasPurchasedCourse]);
  

//   if (user.role !== 'admin' && !hasPurchasedCourse) {
//     // Redirect to the purchase page
//     return <Navigate to={'/purchase'} />;
//   }

//   return loading ? (
//     <Loader />
//   ) : (
//     <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
//       {lectures && lectures.length > 0 ? (
//         <>
//           <Box>
//             <video
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={lectures[lectureNumber].video.url}
//             ></video>

//             <Heading
//               m="4"
//               children={`#${lectureNumber + 1} ${
//                 lectures[lectureNumber].title
//               }`}
//             />

//             <Heading m="4" children="Description" />
//             <Text m="4" children={lectures[lectureNumber].description} />
//           </Box>

//           <VStack>
//             {lectures.map((element, index) => (
//               <button
//                 onClick={() => setLectureNumber(index)}
//                 key={element._id}
//                 style={{
//                   width: '100%',
//                   padding: '1rem',
//                   textAlign: 'center',
//                   margin: 0,
//                   borderBottom: '1px solid rgba(0,0,0,0.2)',
//                 }}
//               >
//                 <Text noOfLines={1}>
//                   #{index + 1} {element.title}
//                 </Text>
//               </button>
//             ))}
//           </VStack>
//         </>
//       ) : (
//         <Heading children="No Lectures" />
//       )}
//     </Grid>
//   );
// };

// export default CoursePage;





// import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseLectures } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import { server } from '../../redux/store';

// const CoursePage = ({ user }) => {
//   const [lectureNumber, setLectureNumber] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);

//   const { lectures, loading } = useSelector(state => state.course);

//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseLectures(params.id));
//   }, [dispatch, params.id]);

 
//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       try {
//         const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//           method: 'GET',
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error checking purchased course: ${response.statusText}`);
//         }

//         const data = await response.json();
//         // console.log("Purchase check response:", data);
//         setHasPurchasedCourse(data.hasPurchasedCourse);
//       } catch (error) {
//         console.error('Error checking purchased course:', error.message);
//       } finally {
//         setLoadingPurchaseCheck(false); // Set loading state to false when API call is complete
//       }
//     };

//     if (user?._id && params.id) {
//       checkPurchasedCourse();
//     }
//   }, [dispatch, user?._id, params.id]);

//   if (loading || loadingPurchaseCheck) {
//     // Render loader while loading
//     return <Loader />;
//   }

//   if (user.role !== 'admin' && !hasPurchasedCourse) {
//     // Redirect to the purchase page
//     return <Navigate to={'/subscribe'} />;
//   }

//   return (
//     <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
//       {lectures && lectures.length > 0 ? (
//         <>
//           <Box>
//             <video
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={lectures[lectureNumber].video.url}
//             ></video>

//             <Heading
//               m="4"
//               children={`#${lectureNumber + 1} ${
//                 lectures[lectureNumber].title
//               }`}
//             />

//             <Heading m="4" children="Description" />
//             <Text m="4" children={lectures[lectureNumber].description} />
//           </Box>

//           <VStack>
//             {lectures.map((element, index) => (
//               <button
//                 onClick={() => setLectureNumber(index)}
//                 key={element._id}
//                 style={{
//                   width: '100%',
//                   padding: '1rem',
//                   textAlign: 'center',
//                   margin: 0,
//                   borderBottom: '1px solid rgba(0,0,0,0.2)',
//                 }}
//               >
//                 <Text noOfLines={1}>
//                   #{index + 1} {element.title}
//                 </Text>
//               </button>
//             ))}
//           </VStack>
//         </>
//       ) : (
//         <Heading children="No Lectures" />
//       )}
//     </Grid>
//   );
// };

// export default CoursePage;



// final 
// final module system


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   VStack,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Link,
//   Icon,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseModules, submitTestScore } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import { server } from '../../redux/store';
// import Test from './Test'; // Import the Test component
// import { MdLock } from 'react-icons/md'; // Import lock icon
// import { fetchUserData } from '../../redux/actions/user';

// const CoursePage = ({ user }) => {
//   const [currentModule, setCurrentModule] = useState(0);
//   const [selectedLecture, setSelectedLecture] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
//   const [showTest, setShowTest] = useState(false); // State to manage test visibility
//   const [testResult, setTestResult] = useState(null); // State to store test result
//   const [moduleLock, setModuleLock] = useState([]); // State to track locking status of modules

//   const { modules, loading } = useSelector(state => state.course);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseModules(params.id));
//     dispatch(fetchUserData(user._id));
//   }, [dispatch, params.id, user._id]);



//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       if (user?._id && params.id) {
//         if (user?.role !== 'admin') {
//           try {
//             const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (!response.ok) {
//               throw new Error(`Error checking purchased course: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setHasPurchasedCourse(data.hasPurchasedCourse);
//           } catch (error) {
//             console.error('Error checking purchased course:', error.message);
//           } finally {
//             setLoadingPurchaseCheck(false);
//           }
//         } else {
//           setHasPurchasedCourse(true);
//           setLoadingPurchaseCheck(false);
//         }
//       }
//     };

//     checkPurchasedCourse();
//   }, [user?._id, params.id, user?.role]);

// // Inside handleTestSubmit function


// const getNewdata = async()=>{
//   const newdata = await dispatch(fetchUserData(user._id));
//   if (modules && modules.length > 0 && newdata.user.testResults) {
//     const initialLockState = modules.map((module, index) => {
//       // Unlock the first module
//       if (index === 0) return false;
//       // Unlock the module if the user's test score is greater than 40
//       if (newdata.user.testResults[index - 1]?.score > 40) return false;
//       // Otherwise, lock the module
//       return true;
//     });
//     setModuleLock(initialLockState);
    
//   }
// }

// useEffect(() => {
//   getNewdata()

// },[]);





//   const handleModuleChange = moduleIndex => {
//     setCurrentModule(moduleIndex);
//     setSelectedLecture(0);
//   };

//   const handleLectureClick = lectureIndex => {
//     setSelectedLecture(lectureIndex);
//     setShowTest(false); // Hide test when a lecture is clicked
//   };

//   const handleTestSubmit = async result => {
//     // Dispatch action to submit test score
//     await dispatch(submitTestScore(user._id, modules[currentModule]._id, result));
//     setTestResult(result);

//     // Fetch updated user data after test submission
//      const newdata = await dispatch(fetchUserData(user._id));
//      console.log(newdata.user);

//     // Update module locking status based on the updated user data
//     if (modules && modules.length > 0 && newdata.user.testResults) {
//       const updatedLockState = modules.map((module, index) => {
//         // Unlock the first module
//         if (index === 0) return false;
//         // Unlock the next module if the previous module's score is greater than 40
//         console.log(newdata.user.testResults[index - 1]?.score);
//         if (newdata.user.testResults[index - 1]?.score > 40) return false;
//         // Otherwise, lock the module
//         return true;
//       });
//       setModuleLock(updatedLockState);
//     }
//   };




//   if (loading || loadingPurchaseCheck) {
//     return <Loader />;
//   }

//   if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
//     return <Navigate to={'/subscribe'} />;
//   }


//   return (
//     <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
//       <Box>
//         {!showTest && modules[currentModule]?.lectures.length > 0 && (
//           <>
//             <video
//               style={{border:'5px solid',  display: showTest ? 'none' : 'block' }}
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
//             ></video>

//             <Heading
//               m="4"
//               children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`}
//             />

//             <Heading m="4" children="Description" />
//             <Text
//               m="4"
//               children={modules[currentModule]?.lectures[selectedLecture]?.description}
//             />
//           </>
//         )}

//         {/* Render Test component if showTest is true */}
//         {showTest && (
//           <Test
//             questions={modules[currentModule]?.tests || []}
//             onSubmit={handleTestSubmit}
//           />
//         )}

//         {/* Display test result */}
//         {/* {testResult && (
//           <Box>
//             <Heading as="h2" size="lg">
//               Test Result
//             </Heading>
//             <Text>Total Score: {testResult.score}</Text>
//             <Text>Correct Answers: {testResult.correctAnswers}</Text>
//             <Text>Wrong Answers: {testResult.wrongAnswers}</Text>
//           </Box>
//         )} */}
//       </Box>

//       <Accordion allowToggle width="100%" maxWidth="500px">
//         {modules && modules.length > 0 ? (
//           modules.map((module, moduleIndex) => (
//             <AccordionItem
//               key={moduleIndex}
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="lg"
//               isDisabled={moduleLock[moduleIndex]} // Disable if locked
//             >
//               <AccordionButton
//                 _focus={{ outline: 'none' }}
//                 justifyContent="space-between"
//                 onClick={() => handleModuleChange(moduleIndex)}
//               >
//                 <Box flex="1" textAlign="left" fontSize="lg">
//                   {module.title}
//                 </Box>
//                 {moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
//                 <AccordionIcon />
//               </AccordionButton>
//               <AccordionPanel pb={4} fontSize="md">
//                 <VStack align="start" mt={2}>
//                   {module.lectures && module.lectures.length > 0 && (
//                     <>
//                       <Heading size="md">Lectures:</Heading>
//                       {module.lectures.map((lecture, lectureIndex) => (
//                         <Box key={lectureIndex}>
//                           <Link onClick={() => handleLectureClick(lectureIndex)}>
//                             {lecture.title}
//                           </Link>
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                   {module.tests && module.tests.length > 0 && (
//                     <>
//                       <Link onClick={() => setShowTest(!showTest)}>Test of {module.title}</Link>
//                     </>
//                   )}
//                 </VStack>
//               </AccordionPanel>
//             </AccordionItem>
//           ))
//         ) : (
//           <Heading children="No Modules" />
//         )}
//       </Accordion>
//     </Grid>
//   );
// };

// export default CoursePage;





// final jai 

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   VStack,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Link,
//   Icon,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseModules, submitTestScore } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import { server } from '../../redux/store';
// import Test from './Test'; // Import the Test component
// import { MdLock } from 'react-icons/md'; // Import lock icon

// const CoursePage = ({ user }) => {
//   const [currentModule, setCurrentModule] = useState(0);
//   const [selectedLecture, setSelectedLecture] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
//   const [showTest, setShowTest] = useState(false); // State to manage test visibility
//   const [testResult, setTestResult] = useState(null); // State to store test result
//   const [moduleLock, setModuleLock] = useState([]); // State to track locking status of modules

//   const { modules, loading } = useSelector(state => state.course);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseModules(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       if (user?._id && params.id) {
//         if (user?.role !== 'admin') {
//           try {
//             const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (!response.ok) {
//               throw new Error(`Error checking purchased course: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setHasPurchasedCourse(data.hasPurchasedCourse);
//           } catch (error) {
//             console.error('Error checking purchased course:', error.message);
//           } finally {
//             setLoadingPurchaseCheck(false);
//           }
//         } else {
//           setHasPurchasedCourse(true);
//           setLoadingPurchaseCheck(false);
//         }
//       }
//     };

//     checkPurchasedCourse();
//   }, [user?._id, params.id, user?.role]);

//   const handleModuleChange = moduleIndex => {
//     setCurrentModule(moduleIndex);
//     setSelectedLecture(0);
//   };

//   const handleLectureClick = lectureIndex => {
//     setSelectedLecture(lectureIndex);
//     setShowTest(false); // Hide test when a lecture is clicked
//   };

//   // Handle submitting the test result
//   const handleTestSubmit = result => {
//     // api calling 

//     dispatch(submitTestScore(user._id, modules[currentModule]._id, result.score));
//     console.log(user.testResults);

//     setTestResult(result);
//     const moduleCorrectAnswers = result.correctAnswers;
//     const moduleTotalQuestions = modules[currentModule]?.tests?.length || 1; // Prevent division by zero
//     const correctPercentage = (moduleCorrectAnswers / moduleTotalQuestions) * 100;

//     if (correctPercentage < 60) {
//       setModuleLock(prevState => {
//         const updatedLock = [...prevState];
//         updatedLock[currentModule] = true; // Lock current module
//         return updatedLock;
//       });
//     }
//   };

//   if (loading || loadingPurchaseCheck) {
//     return <Loader />;
//   }

//   if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
//     return <Navigate to={'/subscribe'} />;
//   }


//   return (
//     <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
//       <Box>
//         {!showTest && modules && modules[currentModule]?.lectures && modules[currentModule].lectures.length  > 0 && (
//           <>
//             <video
//               style={{border:'5px solid',  display: showTest ? 'none' : 'block' }}
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
//             ></video>

//             <Heading
//               m="4"
//               children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`}
//             />

//             <Heading m="4" children="Description" />
//             <Text
//               m="4"
//               children={modules[currentModule]?.lectures[selectedLecture]?.description}
//             />
//           </>
//         )}

//         {/* Render Test component if showTest is true */}
//         {showTest && (
//           <Test
//             questions={modules[currentModule]?.tests || []}
//             onSubmit={handleTestSubmit}
//           />
//         )}

//         {/* Display test result */}
//         {testResult && (
//           <Box>
//             <Heading as="h2" size="lg">
//               Test Result
//             </Heading>
//             <Text>Total Score: {testResult.score}</Text>
//             <Text>Correct Answers: {testResult.correctAnswers}</Text>
//             <Text>Wrong Answers: {testResult.wrongAnswers}</Text>
//           </Box>
//         )}
//       </Box>

//       <Accordion allowToggle width="100%" maxWidth="500px">
//         {modules && modules.length > 0 ? (
//           modules.map((module, moduleIndex) => (
//             <AccordionItem
//               key={moduleIndex}
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="lg"
//               isDisabled={moduleLock[moduleIndex]} // Disable if locked
//             >
//               <AccordionButton
//                 _focus={{ outline: 'none' }}
//                 justifyContent="space-between"
//                 onClick={() => handleModuleChange(moduleIndex)}
//               >
//                 <Box flex="1" textAlign="left" fontSize="lg">
//                   {module.title}
//                 </Box>
//                 {moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
//                 <AccordionIcon />
//               </AccordionButton>
//               <AccordionPanel pb={4} fontSize="md">
//                 <VStack align="start" mt={2}>
//                   {module.lectures && module.lectures.length > 0 && (
//                     <>
//                       <Heading size="md">Lectures:</Heading>
//                       {module.lectures.map((lecture, lectureIndex) => (
//                         <Box key={lectureIndex}>
//                           <Link onClick={() => handleLectureClick(lectureIndex)}>
//                             {lecture.title}
//                           </Link>
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                   {module.tests && module.tests.length > 0 && (
//                     <>
//                       <Link onClick={() => setShowTest(!showTest)}>Test of {module.title}</Link>
//                     </>
//                   )}
//                 </VStack>
//               </AccordionPanel>
//             </AccordionItem>
//           ))
//         ) : (
//           <Heading children="No Modules" />
//         )}
//       </Accordion>
//     </Grid>
//   );
// };

// export default CoursePage;


// add automatic progression 

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   VStack,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Link,
//   Icon,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseModules, submitTestScore } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import { server } from '../../redux/store';
// import Test from './Test'; // Import the Test component
// import { MdLock } from 'react-icons/md'; // Import lock icon

// const CoursePage = ({ user }) => {
//   const [currentModule, setCurrentModule] = useState(0);
//   const [selectedLecture, setSelectedLecture] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
//   const [showTest, setShowTest] = useState(false); // State to manage test visibility
//   const [testResult, setTestResult] = useState(null); // State to store test result
//   const [moduleLock, setModuleLock] = useState([]); // State to track locking status of modules

//   const { modules, loading } = useSelector(state => state.course);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseModules(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       if (user?._id && params.id) {
//         if (user?.role !== 'admin') {
//           try {
//             const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (!response.ok) {
//               throw new Error(`Error checking purchased course: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setHasPurchasedCourse(data.hasPurchasedCourse);
//           } catch (error) {
//             console.error('Error checking purchased course:', error.message);
//           } finally {
//             setLoadingPurchaseCheck(false);
//           }
//         } else {
//           setHasPurchasedCourse(true);
//           setLoadingPurchaseCheck(false);
//         }
//       }
//     };

//     checkPurchasedCourse();
//   }, [user?._id, params.id, user?.role]);

//   const handleModuleChange = moduleIndex => {
//     setCurrentModule(moduleIndex);
//     setSelectedLecture(0);
//   };

//   const handleLectureClick = lectureIndex => {
//     setSelectedLecture(lectureIndex);
//     setShowTest(false); // Hide test when a lecture is clicked
//   };

//   // Handle submitting the test result
//  // Handle submitting the test result
//  const handleTestSubmit = result => {
//   // Submit test score
//   dispatch(submitTestScore(user._id, modules[currentModule]._id, result.score));


//   setTestResult(result);
//   const moduleCorrectAnswers = result.correctAnswers;
//   const moduleTotalQuestions = modules[currentModule]?.tests?.length || 1; // Prevent division by zero
//   const correctPercentage = (moduleCorrectAnswers / moduleTotalQuestions) * 100;

//   // Check if the user is not an admin and the current module is the first one
//   if (user.role !== 'admin' && currentModule === 0) {
//     // Unlock the next module
//     if (correctPercentage >= 60 && currentModule < modules.length - 1) {
//       setModuleLock(prevState => {
//         const updatedLock = [...prevState];
//         updatedLock[currentModule + 1] = false; // Unlock next module
//         return updatedLock;
//       });
//     }
//   }

//   // Check if there are more lectures in the current module
//   if (selectedLecture < modules[currentModule]?.lectures.length - 1) {
//     // Move to the next lecture in the same module
//     setSelectedLecture(prev => prev + 1);
//   } else {
//     // Check if there are more modules
//     if (currentModule < modules.length - 1) {
//       // Move to the next module
//       setCurrentModule(prev => prev + 1);
//       // Reset selected lecture to the first one in the new module
//       setSelectedLecture(0);
//     }
//   }
// };




//   if (loading || loadingPurchaseCheck) {
//     return <Loader />;
//   }

//   if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
//     return <Navigate to={'/subscribe'} />;
//   }


//   return (
//     <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
//       <Box>
//         {!showTest && modules && modules[currentModule]?.lectures && modules[currentModule].lectures.length  > 0 && (
//           <>
//             <video
//               style={{border:'5px solid',  display: showTest ? 'none' : 'block' }}
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
//             ></video>

//             <Heading
//               m="4"
//               children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`}
//             />

//             <Heading m="4" children="Description" />
//             <Text
//               m="4"
//               children={modules[currentModule]?.lectures[selectedLecture]?.description}
//             />
//           </>
//         )}

//         {/* Render Test component if showTest is true */}
//         {showTest && (
//           <Test
//             questions={modules[currentModule]?.tests || []}
//             onSubmit={handleTestSubmit}
//           />
//         )}

//         {/* Display test result */}
//         {testResult && (
//           <Box>
//             <Heading as="h2" size="lg">
//               Test Result
//             </Heading>
//             <Text>Total Score: {testResult.score}</Text>
//             <Text>Correct Answers: {testResult.correctAnswers}</Text>
//             <Text>Wrong Answers: {testResult.wrongAnswers}</Text>
//           </Box>
//         )}
//       </Box>

//       <Accordion allowToggle width="100%" maxWidth="500px">
//         {modules && modules.length > 0 ? (
//           modules.map((module, moduleIndex) => (
//             <AccordionItem
//               key={moduleIndex}
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="lg"
//               isDisabled={moduleLock[moduleIndex]} // Disable if locked
//             >
//               <AccordionButton
//                 _focus={{ outline: 'none' }}
//                 justifyContent="space-between"
//                 onClick={() => handleModuleChange(moduleIndex)}
//               >
//                 <Box flex="1" textAlign="left" fontSize="lg">
//                   {module.title}
//                 </Box>
//                 {moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
//                 <AccordionIcon />
//               </AccordionButton>
//               <AccordionPanel pb={4} fontSize="md">
//                 <VStack align="start" mt={2}>
//                   {module.lectures && module.lectures.length > 0 && (
//                     <>
//                       <Heading size="md">Lectures:</Heading>
//                       {module.lectures.map((lecture, lectureIndex) => (
//                         <Box key={lectureIndex}>
//                           <Link onClick={() => handleLectureClick(lectureIndex)}>
//                             {lecture.title}
//                           </Link>
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                   {module.tests && module.tests.length > 0 && (
//                     <>
//                       <Link onClick={() => setShowTest(!showTest)}>Test of {module.title}</Link>
//                     </>
//                   )}
//                 </VStack>
//               </AccordionPanel>
//             </AccordionItem>
//           ))
//         ) : (
//           <Heading children="No Modules" />
//         )}
//       </Accordion>
//     </Grid>
//   );
// };

// export default CoursePage;


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   VStack,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Link,
//   Icon,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseModules, submitTestScore } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import Test from './Test';
// import { MdLock } from 'react-icons/md';
// import { server } from '../../redux/store';



// const CoursePage = ({ user }) => {
//   const [currentModule, setCurrentModule] = useState(0);
//   const [selectedLecture, setSelectedLecture] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
//   const [showTest, setShowTest] = useState(false);
//   const [testResult, setTestResult] = useState(null);
//   const [moduleLock, setModuleLock] = useState([]);

//   const { modules, loading } = useSelector(state => state.course);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseModules(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       if (user?._id && params.id) {
//         if (user?.role !== 'admin') {
//           try {
//             const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (!response.ok) {
//               throw new Error(`Error checking purchased course: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setHasPurchasedCourse(data.hasPurchasedCourse);
//           } catch (error) {
//             console.error('Error checking purchased course:', error.message);
//           } finally {
//             setLoadingPurchaseCheck(false);
//           }
//         } else {
//           setHasPurchasedCourse(true);
//           setLoadingPurchaseCheck(false);
//         }
//       }
//     };

//     checkPurchasedCourse();
//   }, [user?._id, params.id, user?.role]);

//   useEffect(() => {
//     if (modules && user && user.role !== 'admin') {
//       const initialModuleLock = modules.map((module, index) => {
//         if (index === 0) return false;
//         const testResult = user.testResults.find(result => result.module.toString() === module._id.toString());
//         return !testResult || testResult.score < 60;
//       });
//       setModuleLock(initialModuleLock);
//     }
//   }, [modules, user]);

//   const handleModuleChange = moduleIndex => {
//     setCurrentModule(moduleIndex);
//     setSelectedLecture(0);
//   };

//   const handleLectureClick = lectureIndex => {
//     setSelectedLecture(lectureIndex);
//     setShowTest(false);
//   };

//   const handleTestSubmit = async answers => {
//     try {
//       const result = {
//         courseId: params.id,
//         moduleId: modules[currentModule]._id,
//         testId: modules[currentModule].tests[0]._id,
//         answers
//       };

//       const response = await dispatch(submitTestScore(user._id, result));

//       if (response && response.success) {
//         setTestResult({
//           score: response.testResult.score,
//           correctAnswers: response.testResult.correctAnswers,
//           wrongAnswers: response.testResult.wrongAnswers,
//         });

//         if (user.role !== 'admin') {
//           const updatedLock = [...moduleLock];
//           updatedLock[currentModule] = false;
//           if (currentModule < modules.length - 1 && response.testResult.score >= 60) {
//             updatedLock[currentModule + 1] = false;
//           }
//           setModuleLock(updatedLock);
//         }
//       }
//     } catch (error) {
//       console.error('Error submitting test score:', error);
//     }
//   };

//   if (loading || loadingPurchaseCheck) {
//     return <Loader />;
//   }

//   if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
//     return <Navigate to={'/subscribe'} />;
//   }


//   console.log(modules[currentModule]?.tests);
//   return (
//     <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
//       <Box>
//         {!showTest && modules && modules[currentModule]?.lectures && modules[currentModule].lectures.length > 0 && (
//           <>
//             <video
//               style={{ border: '5px solid', display: showTest ? 'none' : 'block' }}
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
//             ></video>

//             <Heading m="4" children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`} />

//             <Heading m="4" children="Description" />
//             <Text m="4" children={modules[currentModule]?.lectures[selectedLecture]?.description} />
//           </>
//         )}

//         {showTest && (
//           <Test
//             questions={modules[currentModule]?.tests[0].questions || []}
//             onSubmit={handleTestSubmit}
//           />
//         )}

//         {testResult && (
//           <Box>
//             <Heading as="h2" size="lg">
//               Test Result
//             </Heading>
//             <Text>Total Score: {testResult.score}%</Text>
//           </Box>
//         )}
//       </Box>

//       <Accordion allowToggle width="100%" maxWidth="500px">
//         {modules && modules.length > 0 ? (
//           modules.map((module, moduleIndex) => (
//             <AccordionItem
//               key={moduleIndex}
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="lg"
//               isDisabled={user.role !== 'admin' && moduleLock[moduleIndex]}
//             >
//               <AccordionButton
//                 _focus={{ outline: 'none' }}
//                 justifyContent="space-between"
//                 onClick={() => handleModuleChange(moduleIndex)}
//               >
//                 <Box flex="1" textAlign="left" fontSize="lg">
//                   {module.title}
//                 </Box>
//                 {user.role !== 'admin' && moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
//                 <AccordionIcon />
//               </AccordionButton>
//               <AccordionPanel pb={4} fontSize="md">
//                 <VStack align="start" mt={2}>
//                   {module.lectures && module.lectures.length > 0 && (
//                     <>
//                       <Heading size="md">Lectures:</Heading>
//                       {module.lectures.map((lecture, lectureIndex) => (
//                         <Box key={lectureIndex}>
//                           <Link onClick={() => handleLectureClick(lectureIndex)}>
//                             {lecture.title}
//                           </Link>
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                   {modules[currentModule]?.tests && module.tests.length > 0 && (
//                     <>
//                       <Link onClick={() => setShowTest(!showTest)}>Test of {module.title}</Link>
//                     </>
//                   )}
//                 </VStack>
//               </AccordionPanel>
//             </AccordionItem>
//           ))
//         ) : (
//           <Heading children="No Modules" />
//         )}
//       </Accordion>
//     </Grid>
//   );
// };

// export default CoursePage;


// final 

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   VStack,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Link,
//   Icon,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseModules, submitTestScore } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import Test from './Test';
// import { MdLock } from 'react-icons/md';
// import { server } from '../../redux/store';

// const CoursePage = ({ user }) => {
//   const [currentModule, setCurrentModule] = useState(0);
//   const [selectedLecture, setSelectedLecture] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
//   const [showTest, setShowTest] = useState(false);
//   const [testResult, setTestResult] = useState(null);
//   const [moduleLock, setModuleLock] = useState([]);

//   const { modules, loading } = useSelector(state => state.course);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseModules(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       if (user?._id && params.id) {
//         if (user?.role !== 'admin') {
//           try {
//             const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (!response.ok) {
//               throw new Error(`Error checking purchased course: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setHasPurchasedCourse(data.hasPurchasedCourse);
//           } catch (error) {
//             console.error('Error checking purchased course:', error.message);
//           } finally {
//             setLoadingPurchaseCheck(false);
//           }
//         } else {
//           setHasPurchasedCourse(true);
//           setLoadingPurchaseCheck(false);
//         }
//       }
//     };

//     checkPurchasedCourse();
//   }, [user?._id, params.id, user?.role]);
  
//   useEffect(() => {
//     if (modules && user && user.role !== 'admin') {
//       const initialModuleLock = modules.map((module, index) => {
//         if (index === 0) return false; // First module is always unlocked
//         const testResult = user.testResults.find(
//           (result) => result.module.toString() === module._id.toString()
//         );
//         return !testResult || testResult.score < 60;
//       });
  
//       // Find the last unlocked module and unlock the next one if it exists
//       for (let i = 0; i < initialModuleLock.length; i++) {
//         if (!initialModuleLock[i] && i < initialModuleLock.length - 1) {
//           initialModuleLock[i + 1] = false;
//         }
//       }
  
//       setModuleLock(initialModuleLock);
//     }
//   }, [modules, user]);
  
  

//   const handleModuleChange = moduleIndex => {
//     setCurrentModule(moduleIndex);
//     setSelectedLecture(0);
//   };

//   const handleLectureClick = lectureIndex => {
//     setSelectedLecture(lectureIndex);
//     setShowTest(false);
//   };

//   const handleTestSubmit = async (event, answers) => {
//     event.preventDefault();
//     try {
//       const result = {
//         courseId: params.id,
//         moduleId: modules[currentModule]._id,
//         answers,
//       };
  
//       // Await the dispatch and handle the returned data
//       const data = await dispatch(submitTestScore(user._id, result));
//       if (data && data.success) {
//         setTestResult({
//           score: data.testResult.score,
//           correctAnswers: data.testResult.correctAnswers,
//           wrongAnswers: data.testResult.wrongAnswers,
//         });
  
//         if (user.role !== 'admin') {
//           const updatedLock = [...moduleLock];
//           updatedLock[currentModule] = false;
//           if (currentModule < modules.length - 1 && data.testResult.score >= 60) {
//             updatedLock[currentModule + 1] = false;
//           }
//           setModuleLock(updatedLock);
//         }
//       }
//     } catch (error) {
//       console.error('Error submitting test score:', error);
//     }
//   };

//   if (loading || loadingPurchaseCheck) {
//     return <Loader />;
//   }

//   if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
//     return <Navigate to={'/subscribe'} />;
//   }

//   console.log(modules[currentModule]?.tests);

//   return (
//     <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
//       <Box>
//         {!showTest && modules && modules[currentModule]?.lectures && modules[currentModule].lectures.length > 0 && (
//           <>
//             <video
//               style={{ border: '5px solid', display: showTest ? 'none' : 'block' }}
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
//             ></video>

//             <Heading m="4" children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`} />

//             <Heading m="4" children="Description" />
//             <Text m="4" children={modules[currentModule]?.lectures[selectedLecture]?.description} />
//           </>
//         )}

//         {showTest && (
//           <Test
//             questions={modules[currentModule]?.tests || []}
//             onSubmit={handleTestSubmit}
//           />
//         )}

//         {testResult && (
//           <Box>
//             <Heading as="h2" size="lg">
//               Test Result
//             </Heading>
//             <Text>Total Score: {testResult.score}%</Text>
//             <Text>Total Correct: {testResult.correctAnswers}</Text>
//             <Text>Total Wrong: {testResult.wrongAnswers}</Text>
//           </Box>
//         )}
//       </Box>

//       <Accordion allowToggle width="100%" maxWidth="500px">
//         {modules && modules.length > 0 ? (
//           modules.map((module, moduleIndex) => (
//             <AccordionItem
//               key={moduleIndex}
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="lg"
//               isDisabled={user.role !== 'admin' && moduleLock[moduleIndex]}
//             >
//               <AccordionButton
//                 _focus={{ outline: 'none' }}
//                 justifyContent="space-between"
//                 onClick={() => handleModuleChange(moduleIndex)}
//               >
//                 <Box flex="1" textAlign="left" fontSize="lg">
//                   {module.title}
//                 </Box>
//                 {user.role !== 'admin' && moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
//                 <AccordionIcon />
//               </AccordionButton>
//               <AccordionPanel pb={4} fontSize="md">
//                 <VStack align="start" mt={2}>
//                   {module.lectures && module.lectures.length > 0 && (
//                     <>
//                       <Heading size="md">Lectures:</Heading>
//                       {module.lectures.map((lecture, lectureIndex) => (
//                         <Box key={lectureIndex}>
//                           <Link onClick={() => handleLectureClick(lectureIndex)}>
//                             {lecture.title}
//                           </Link>
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                   {modules[currentModule]?.tests && modules[currentModule]?.tests.length > 0 && (
//                     <>
//                       <Link onClick={() => setShowTest(!showTest)}>Test of {module.title}</Link>
//                     </>
//                   )}
//                 </VStack>
//               </AccordionPanel>
//             </AccordionItem>
//           ))
//         ) : (
//           <Heading children="No Modules" />
//         )}
//       </Accordion>
//     </Grid>
//   );
// };

// export default CoursePage;



// quiz final 
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   VStack,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Link,
//   Icon,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, useParams } from 'react-router-dom';
// import { getCourseModules, submitTestScore } from '../../redux/actions/course';
// import Loader from '../Layout/Loader/Loader';
// import Test from './Test';
// import { MdLock } from 'react-icons/md';
// import { server } from '../../redux/store';

// const CoursePage = ({ user }) => {
//   const [currentModule, setCurrentModule] = useState(0);
//   const [selectedLecture, setSelectedLecture] = useState(0);
//   const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
//   const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
//   const [showTest, setShowTest] = useState(false);
//   const [testResult, setTestResult] = useState(null);
//   const [moduleLock, setModuleLock] = useState([]);

//   const { modules, loading } = useSelector(state => state.course);
//   const dispatch = useDispatch();
//   const params = useParams();

//   useEffect(() => {
//     dispatch(getCourseModules(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     const checkPurchasedCourse = async () => {
//       if (user?._id && params.id) {
//         if (user?.role !== 'admin') {
//           try {
//             const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (!response.ok) {
//               throw new Error(`Error checking purchased course: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setHasPurchasedCourse(data.hasPurchasedCourse);
//           } catch (error) {
//             console.error('Error checking purchased course:', error.message);
//           } finally {
//             setLoadingPurchaseCheck(false);
//           }
//         } else {
//           setHasPurchasedCourse(true);
//           setLoadingPurchaseCheck(false);
//         }
//       }
//     };

//     checkPurchasedCourse();
//   }, [user?._id, params.id, user?.role]);

//   useEffect(() => {
//     if (modules && user && user.role !== 'admin') {
//       const initialModuleLock = modules.map((module, index) => {
//         if (index === 0) return false; // First module is always unlocked
//         const testResult = user.testResults.find(
//           (result) => result.module.toString() === module._id.toString()
//         );
//         return !testResult || testResult.score < 60;
//       });

//       // Find the last unlocked module and unlock the next one if it exists
//       for (let i = 0; i < initialModuleLock.length; i++) {
//         if (!initialModuleLock[i] && i < initialModuleLock.length - 1) {
//           initialModuleLock[i + 1] = false;
//         }
//       }

//       setModuleLock(initialModuleLock);
//     }
//   }, [modules, user]);

//   const handleModuleChange = moduleIndex => {
//     setCurrentModule(moduleIndex);
//     setSelectedLecture(0);
//   };

//   const handleLectureClick = lectureIndex => {
//     setSelectedLecture(lectureIndex);
//     setShowTest(false);
//   };

//   const handleTestSubmit = async (e, answers) => {
//     e.preventDefault();
//     try {
//       const result = {
//         courseId: params.id,
//         moduleId: modules[currentModule]._id,
//         answers,
//       };

//       // Await the dispatch and handle the returned data
//       const data = await dispatch(submitTestScore(user._id, result));
//       if (data && data.success) {
//         setTestResult({
//           score: data.testResult.score,
//           correctAnswers: data.testResult.correctAnswers,
//           wrongAnswers: data.testResult.wrongAnswers,
//         });

//         if (user.role !== 'admin') {
//           const updatedLock = [...moduleLock];
//           updatedLock[currentModule] = false;
//           if (currentModule < modules.length - 1 && data.testResult.score >= 60) {
//             updatedLock[currentModule + 1] = false;
//           }
//           setModuleLock(updatedLock);
//         }
//       }
//     } catch (error) {
//       console.error('Error submitting test score:', error);
//     }
//   };

//   if (loading || loadingPurchaseCheck) {
//     return <Loader />;
//   }

//   if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
//     return <Navigate to={'/subscribe'} />;
//   }

//   return (
//     <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
//       <Box>
//         {!showTest && modules && modules[currentModule]?.lectures && modules[currentModule].lectures.length > 0 && (
//           <>
//             <video
//               style={{ border: '5px solid', display: showTest ? 'none' : 'block' }}
//               width={'100%'}
//               controls
//               controlsList="nodownload noremoteplayback"
//               disablePictureInPicture
//               disableRemotePlayback
//               src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
//             ></video>

//             <Heading m="4" children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`} />

//             <Heading m="4" children="Description" />
//             <Text m="4" children={modules[currentModule]?.lectures[selectedLecture]?.description} />
//           </>
//         )}

//         {showTest && (
//           <Test
//             questions={modules[currentModule]?.tests || []}
//             onSubmit={handleTestSubmit}
//           />
//         )}

//         {testResult && (
//           <Box>
//             <Heading as="h2" size="lg">
//               Test Result
//             </Heading>
//             <Text>Total Score: {testResult.score}%</Text>
//             <Text>Total Correct: {testResult.correctAnswers}</Text>
//             <Text>Total Wrong: {testResult.wrongAnswers}</Text>
//           </Box>
//         )}
//       </Box>

//       <Accordion allowToggle width="100%" maxWidth="500px">
//         {modules && modules.length > 0 ? (
//           modules.map((module, moduleIndex) => (
//             <AccordionItem
//               key={moduleIndex}
//               borderWidth="2px"
//               borderColor="gray.200"
//               borderRadius="lg"
//               isDisabled={user.role !== 'admin' && moduleLock[moduleIndex]}
//             >
//               <AccordionButton
//                 _focus={{ outline: 'none' }}
//                 justifyContent="space-between"
//                 onClick={() => handleModuleChange(moduleIndex)}
//               >
//                 <Box flex="1" textAlign="left" fontSize="lg">
//                   {module.title}
//                 </Box>
//                 {user.role !== 'admin' && moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
//                 <AccordionIcon />
//               </AccordionButton>
//               <AccordionPanel pb={4} fontSize="md">
//                 <VStack align="start" mt={2}>
//                   {module.lectures && module.lectures.length > 0 && (
//                     <>
//                       <Heading size="md">Lectures:</Heading>
//                       {module.lectures.map((lecture, lectureIndex) => (
//                         <Box key={lectureIndex}>
//                           <Link onClick={() => handleLectureClick(lectureIndex)}>
//                             {lecture.title}
//                           </Link>
//                         </Box>
//                       ))}
//                     </>
//                   )}
//                   {modules[currentModule]?.tests && modules[currentModule]?.tests.length > 0 && (
//                     <>
//                       <Link onClick={() => setShowTest(!showTest)}>Test of {module.title}</Link>
//                     </>
//                   )}
//                 </VStack>
//               </AccordionPanel>
//             </AccordionItem>
//           ))
//         ) : (
//           <Heading children="No Modules" />
//         )}
//       </Accordion>
//     </Grid>
//   );
// };

// export default CoursePage;




import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Icon,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseModules, submitTestScore } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';
import Test from './Test';
import { MdLock } from 'react-icons/md';
import { server } from '../../redux/store';

const CoursePage = ({ user }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState(0);
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false);
  const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [moduleLock, setModuleLock] = useState([]);

  const { modules, loading } = useSelector(state => state.course);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseModules(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    const checkPurchasedCourse = async () => {
      if (user?._id && params.id) {
        if (user?.role !== 'admin') {
          try {
            const response = await fetch(`${server}/paymentcheck/${params.id}/${user._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`Error checking purchased course: ${response.statusText}`);
            }

            const data = await response.json();
            setHasPurchasedCourse(data.hasPurchasedCourse);
          } catch (error) {
            console.error('Error checking purchased course:', error.message);
          } finally {
            setLoadingPurchaseCheck(false);
          }
        } else {
          setHasPurchasedCourse(true);
          setLoadingPurchaseCheck(false);
        }
      }
    };

    checkPurchasedCourse();
  }, [user?._id, params.id, user?.role]);

  useEffect(() => {
    if (modules && user && user.role !== 'admin') {
      const newModuleLock = modules.map((module, index) => {
        // First module is always unlocked
        if (index === 0) return false;
  
        // Find test result for the current module
        const testResult = user.testResults.find(
          (result) => result.module.toString() === module._id.toString()
        );
  
        // Check if test result exists and score is greater than or equal to 60
        return testResult && testResult.score >= 60 ? false : true;
      });
  
      // Ensure the first module is always unlocked
      newModuleLock[0] = false;
  
      // Unlock the module following the last successfully completed module
      const lastCompletedModuleIndex = user.testResults
        .filter(result => result.score >= 60)
        .map(result => modules.findIndex(module => module._id.toString() === result.module.toString()))
        .sort((a, b) => b - a)[0];
  
      if (lastCompletedModuleIndex !== undefined && lastCompletedModuleIndex < modules.length - 1) {
        newModuleLock[lastCompletedModuleIndex + 1] = false;
      }
  
      setModuleLock([...newModuleLock]); 
    }
  }, [modules, user]); 
  
  

  const handleModuleChange = moduleIndex => {
    setCurrentModule(moduleIndex);
    setSelectedLecture(0);
    setShowTest(false);
    setTestResult(null); 
  };

  const handleLectureClick = lectureIndex => {
    setSelectedLecture(lectureIndex);
    setShowTest(false);
    setTestResult(null);
  };

  const handleTestSubmit = async (e, answers) => {
    e.preventDefault();
    try {
      const result = {
        courseId: params.id,
        moduleId: modules[currentModule]._id,
        answers,
      };

      // Await the dispatch and handle the returned data
      const data = await dispatch(submitTestScore(user._id, result));
      if (data && data.success) {
        setTestResult({
          score: data.percentageScore,
          correctAnswers: data.testResult.correctAnswers,
          wrongAnswers: data.testResult.wrongAnswers,
        });

        setShowTest(false); // Hide test after submission
        setCurrentModule(0);
        setSelectedLecture(0);

        const updatedModuleLock = [...moduleLock];
        if (data.percentageScore >= 60) {
          updatedModuleLock[currentModule] = false;
          if (currentModule < modules.length - 1) {
            updatedModuleLock[currentModule + 1] = false;
          }
        }
        setModuleLock(updatedModuleLock);
      }
      }
    catch (error) {
      console.error('Error submitting test score:', error);
    }
  };

  if (loading || loadingPurchaseCheck) {
    return <Loader />;
  }

  if (!user || (user.role !== 'admin' && !hasPurchasedCourse)) {
    return <Navigate to={'/subscribe'} />;
  }

  return (
    <Grid minH={'90vh'} m={'75px 25px'} templateColumns={['1fr', '3fr 1fr']} gap={6}>
      <Box>
        {!showTest && modules && modules[currentModule]?.lectures && modules[currentModule].lectures.length > 0 && !testResult && (
          <>
            <video
              style={{ border: '5px solid', display: showTest ? 'none' : 'block' }}
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={modules[currentModule]?.lectures[selectedLecture]?.video.url}
            ></video>

            <Heading m="4" children={`#${selectedLecture + 1} ${modules[currentModule]?.lectures[selectedLecture]?.title}`} />

            <Heading m="4" children="Description" />
            <Text m="4" children={modules[currentModule]?.lectures[selectedLecture]?.description} />
          </>
        )}

        {showTest && (
          <Test
            questions={modules[currentModule]?.tests || []}
            onSubmit={handleTestSubmit}
          />
        )}

        {testResult && (
          <Box p={4} border="1px" borderRadius="md" borderColor="gray.200" boxShadow="md">
            <Heading as="h2" size="lg" mb={4}>
              Test Result
            </Heading>
            <Text fontSize="xl">Total Score: {testResult.score}%</Text>
            <Text fontSize="lg" mt={2}>Total Correct: {testResult.correctAnswers}</Text>
            <Text fontSize="lg" mt={2}>Total Wrong: {testResult.wrongAnswers}</Text>
          </Box>
        )}
      </Box>

      <Accordion allowToggle width="100%" maxWidth="500px">
        {modules && modules.length > 0 ? (
          modules.map((module, moduleIndex) => (
            <AccordionItem
              key={moduleIndex}
              borderWidth="2px"
              borderColor="gray.200"
              borderRadius="lg"
              isDisabled={user.role !== 'admin' && moduleLock[moduleIndex]}
            >
              <AccordionButton
                _focus={{ outline: 'none' }}
                justifyContent="space-between"
                onClick={() => handleModuleChange(moduleIndex)}
              >
                <Box flex="1" textAlign="left" fontSize="lg">
                  {module.title}
                </Box>
                {user.role !== 'admin' && moduleLock[moduleIndex] && <Icon as={MdLock} color="red.500" />}
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} fontSize="md">
                <VStack align="start" mt={2}>
                  {module.lectures && module.lectures.length > 0 && (
                    <>
                      <Heading size="md">Lectures:</Heading>
                      {module.lectures.map((lecture, lectureIndex) => (
                        <Box key={lectureIndex}>
                          <Link onClick={() => handleLectureClick(lectureIndex)}>
                            {lecture.title}
                          </Link>
                        </Box>
                      ))}
                    </>
                  )}
                  {modules[currentModule]?.tests && modules[currentModule]?.tests.length > 0 && (
                    <>
                      <Button mt={4} colorScheme="teal" onClick={() => setShowTest(!showTest)}>
                        {showTest ? 'Hide Test' : `Test of ${module.title}`}
                      </Button>
                    </>
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <Heading children="No Modules" />
        )}
      </Accordion>
    </Grid>
  );
};

export default CoursePage;







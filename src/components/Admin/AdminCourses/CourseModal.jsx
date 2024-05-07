// import {
//   Box,
//   Button,
//   Grid,
//   Heading,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Stack,
//   Text,
//   VStack,
// } from '@chakra-ui/react';
// import React from 'react';
// import { useState } from 'react';
// import { RiDeleteBin7Fill } from 'react-icons/ri';
// import { fileUploadCss } from '../../Auth/register';

// const CourseModal = ({
//   isOpen,
//   onClose,
//   id,
//   deleteButtonHandler,
//   addLectureHandler,
//   courseTitle,
//   lectures =["react intro"],
//   loading,
// }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [video, setVideo] = useState('');
//   const [videoPrev, setVideoPrev] = useState('');

//   const changeVideoHandler = e => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setVideoPrev(reader.result);
//       setVideo(file);
//     };
//   };

//   const handleClose = () => {
//     setTitle('');
//     setDescription('');
//     setVideo('');
//     setVideoPrev('');
//     onClose();
//   };
//   return (
//     <Modal
//       isOpen={isOpen}
//       size="full"
//       onClose={handleClose}
//       scrollBehavior="outside"
//     >
//       <ModalOverlay />

//       <ModalContent>
//         <ModalHeader>{courseTitle}</ModalHeader>
//         <ModalCloseButton />

//         <ModalBody p="16">
//           <Grid templateColumns={['1fr', '3fr 1fr']}>
//             <Box px={['0', '16']}>
//               <Box my="5">
//                 <Heading children={courseTitle} />
//                 <Heading children={`#${id}`} size="sm" opacity={0.4} />
//               </Box>

//               <Heading children={'Lectures'} size="lg" />

//               {lectures.map((item, i) => (
//                 <VideoCard
//                   key={i}
//                   title={item.title}
//                   description={item.description}
//                   num={i + 1}
//                   lectureId={item._id}
//                   courseId={id}
//                   deleteButtonHandler={deleteButtonHandler}
//                   loading={loading}
//                 />
//               ))}
//             </Box>

//             <Box>
//               <form
//                 onSubmit={e =>
//                   addLectureHandler(e, id, title, description, video)
//                 }
//               >
//                 <VStack spacing={'4'}>
//                   <Heading
//                     children="Add Lecture"
//                     size={'md'}
//                     textTransform="uppercase"
//                   />

//                   <Input
//                     focusBorderColor="purple.300"
//                     placeholder="Title"
//                     value={title}
//                     onChange={e => setTitle(e.target.value)}
//                   />
//                   <Input
//                     focusBorderColor="purple.300"
//                     placeholder="Description"
//                     value={description}
//                     onChange={e => setDescription(e.target.value)}
//                   />

//                   <Input
//                     accept="video/mp4"
//                     required
//                     type={'file'}
//                     focusBorderColor="purple.300"
//                     css={{
//                       '&::file-selector-button': {
//                         ...fileUploadCss,
//                         color: 'purple',
//                       },
//                     }}
//                     onChange={changeVideoHandler}
//                   />

//                   {videoPrev && (
//                     <video
//                       controlsList="nodownload"
//                       controls
//                       src={videoPrev}
//                     ></video>
//                   )}

//                   <Button
//                     isLoading={loading}
//                     w="full"
//                     colorScheme={'purple'}
//                     type="submit"
//                   >
//                     Upload
//                   </Button>
//                 </VStack>
//               </form>
//             </Box>
//           </Grid>
//         </ModalBody>

//         <ModalFooter>
//           <Button onClick={handleClose}>Close</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default CourseModal;

// function VideoCard({
//   title,
//   description,
//   num,
//   lectureId,
//   courseId,
//   deleteButtonHandler,
//   loading,
// }) {
//   return (
//     <Stack
//       direction={['column', 'row']}
//       my="8"
//       borderRadius={'lg'}
//       boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
//       justifyContent={['flex-start', 'space-between']}
//       p={['4', '8']}
//     >
//       <Box>
//         <Heading size={'sm'} children={`#${num} ${title}`} />
//         <Text children={description} />
//       </Box>

//       <Button
//         isLoading={loading}
//         color={'purple.600'}
//         onClick={() => deleteButtonHandler(courseId, lectureId)}
//       >
//         <RiDeleteBin7Fill />
//       </Button>
//     </Stack>
//   );
// }



// final


import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill, RiEditFill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/register';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { getAllCourses } from '../../../redux/actions/course';
import EditLectureModal from './EditLectureModel';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [],
  modules = [],
  loading,
  courses, // Add courses as a prop
}) => {
  const [moduleId, setModuleId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');


  const changeVideoHandler = e => {
    setFile(e.target.files[0]);
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch courses when component mounts
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleModuleDelete = moduleId => {
    // Display popup/modal for confirmation
    // You can use Chakra UI Modal or any other modal library of your choice
    // Set a state to store the moduleId to be deleted and display the popup
  };
  const handleTestDelete = moduleId => {
    // Display popup/modal for confirmation
    // You can use Chakra UI Modal or any other modal library of your choice
    // Set a state to store the moduleId to be deleted and display the popup
  };
  

  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />

        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size="sm" opacity={0.4} />
                <Heading children={'Modules'} size="xl" color={'purple.400'}/>
              </Box>

              <Box px={['0', '16']}>

              {modules.map((module, moduleIndex) => (
  <Box key={moduleIndex} position="relative">
    {/* Delete icon for module */}
    <Button
      onClick={() => handleModuleDelete(module._id)} // Handler to display popup
      size="sm"
      colorScheme="red"
      variant="ghost"
      position="absolute"
      right="0" // Adjust positioning as needed
      fontSize="lg" 
    >
      <RiDeleteBin7Fill />
    </Button>
    <Heading children={`${module.title} `}
             size="lg"
             display="inline-block" // Ensures the icon and text are aligned
             pr={4} // Add padding to separate the icon from the text
    />
    {/* Iterate over lectures within the current module */}
    {module.lectures.map((lecture, lectureIndex) => (
      <VideoCard
        key={lectureIndex}
        title={lecture.title}
        description={lecture.description}
        num={lectureIndex + 1}
        lectureId={lecture._id}
        courseId={id}
        deleteButtonHandler={deleteButtonHandler}
        loading={loading}
      />
    ))}
    {/* Iterate over tests within the current module */}
    {module.tests.map((test, testIndex) => (
  <TestCard
    key={testIndex}
    moduleName={module.title} // Pass the module name as props
    testId={test._id}
    moduleId={module._id}
    deleteButtonHandler={handleTestDelete}
    loading={loading}
  />
))}
  </Box>
))}

</Box>

            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video, file, moduleId)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform="uppercase"
                  />

                  <Select value={moduleId} onChange={e => setModuleId(e.target.value)} placeholder="Select Module">
                    {/* Render options based on fetched courses and their modules */}
                    {courses
                      .filter(course => course._id === id) // Filter only the current course
                      .map(course =>
                        course.modules.map(module => (
                          <option key={module._id} value={module._id}>
                            {module.title}
                          </option>
                        ))
                      )}
                  </Select>

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <Button
                    isLoading={loading}
                    w="full"
                    colorScheme={'purple'}
                    type="submit"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

// function VideoCard({
//   title,
//   description,
//   num,
//   lectureId,
//   courseId,
//   deleteButtonHandler,
//   loading,
// }) {
//   return (
//     <Stack
//       direction={['column', 'row']}
//       my="8"
//       borderRadius={'lg'}
//       boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
//       justifyContent={['flex-start', 'space-between']}
//       p={['4', '8']}
//     >
//       <Box>
//         <Heading size={'sm'} children={`#${num} ${title}`} />
//         <Text children={description} />
//       </Box>

//       <Button
//         isLoading={loading}
//         color={'purple.600'}
//         onClick={() => deleteButtonHandler(courseId, lectureId)}
//       >
//         <RiDeleteBin7Fill />
//       </Button>

//       <Button
//         isLoading={loading}
//         color={'purple.600'}
//         onClick={() => deleteButtonHandler(courseId, lectureId)}
//       >
//         <RiDeleteBin7Fill />
//       </Button>
//     </Stack>
//   );
// }

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdateLecture = (updatedTitle, updatedDescription) => {
    // Dispatch an action to update lecture data
    console.log('Updated title:', updatedTitle);
    console.log('Updated description:', updatedDescription);
  };
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          isLoading={loading}
          color={'purple.600'}
          onClick={() => setIsEditModalOpen(true)}
          size="sm"
        >
          <RiEditFill />
        </Button>

        <Button
          isLoading={loading}
          color={'purple.600'}
          onClick={() => deleteButtonHandler(courseId, lectureId)}
          size="sm"
        >
          <RiDeleteBin7Fill />
        </Button>
      </Stack>

      <EditLectureModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={title}
        description={description}
        onUpdate={handleUpdateLecture}
      />
    </Stack>
  );
}



function TestCard({
  moduleName,
  testId,
  moduleId,
  deleteButtonHandler,
  loading,
}) {
  const cardBgColor = useColorModeValue('gray.100', 'grey.900');
  return (
    <Stack
      direction="row"
      alignItems="center"
      justify="space-between"
      my="4"
      p="4"
      borderRadius="lg"
      boxShadow="0 0 10px rgba(107,70,193,0.5)"
      bg={cardBgColor}
    >
      <Box>
        <Text fontWeight="bold" fontSize="lg">{`Module: ${moduleName}`}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.600">{`Test ID: ${testId}`}</Text>
      </Box>
      <Button
         isLoading={loading}
          color={'purple.600'}
        size="sm"
        onClick={() => deleteButtonHandler(moduleId, testId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}


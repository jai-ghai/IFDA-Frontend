// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Textarea,
// } from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
// import { getCourseModules } from '../../../redux/actions/course';
// import { editLecture } from '../../../redux/actions/admin';

// const EditLectureModal = ({
//   isOpen,
//   onClose,
//   title: initialTitle,
//   description: initialDescription,
//   onUpdate,
//   courseId, 
//   moduleId,
//   lectureId,
// }) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [description, setDescription] = useState(initialDescription);
//   const dispatch = useDispatch();

//   const handleUpdate = async () => {
//     onUpdate(title, description);
//     await dispatch(editLecture(courseId, moduleId, lectureId, title, description));
//     dispatch(getCourseModules(courseId));
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="lg">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Lecture</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Box>
//             <Textarea
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Lecture Title"
//               h="30px" 
//             />
//             <Textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Lecture Description"
//               mt={4}
//               h="150px"
//             />
//           </Box>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
//             Update
//           </Button>
//           <Button onClick={onClose}>Cancel</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default EditLectureModal;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getCourseModules } from '../../../redux/actions/course';
import { editLecture } from '../../../redux/actions/admin';
import { fileUploadCss } from '../../Auth/register';


const EditLectureModal = ({
  isOpen,
  onClose,
  title: initialTitle,
  description: initialDescription,
  courseId,
  moduleId,
  lectureId,
  loading,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    title: initialTitle,
    description: initialDescription,
    file: null,
  });

  const [videoPrev, setVideoPrev] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: initialTitle,
        description: initialDescription,
        file: null,
      });
      setVideoPrev('');
    }
  }, [isOpen, initialTitle, initialDescription]);

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
    };
  };

  const handleUpdate = async () => {
    const formDataObject = {
      title: formData.title,
      description: formData.description,
      file: formData.file,
    };
    await dispatch(editLecture(courseId, moduleId, lectureId, formDataObject));
    dispatch(getCourseModules(courseId));
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      title: initialTitle,
      description: initialDescription,
      file: null,
    });
    setVideoPrev('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Lecture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Textarea
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Lecture Title"
              h="30px"
            />
           
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Lecture Description"
              my={4}
              h="150px"
            />

            {videoPrev && (
              <Box display="flex" justifyContent="center" my={4}>
                <video
                  controlsList="nodownload"
                  controls
                  src={videoPrev}
                  style={{ width: '200px', height: '150px' }}
                ></video>
              </Box>
            )}

            <Input
              name="file"
              accept="video/mp4"
              type="file"
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={changeVideoHandler}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={loading} colorScheme="blue" mr={3} onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLectureModal;






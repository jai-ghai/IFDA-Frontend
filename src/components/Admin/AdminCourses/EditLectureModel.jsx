// EditLectureModal.js

import React, { useState } from 'react';
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
} from '@chakra-ui/react';

const EditLectureModal = ({
  isOpen,
  onClose,
  title: initialTitle,
  description: initialDescription,
  onUpdate,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleUpdate = () => {
    onUpdate(title, description);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Lecture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Lecture Title"
              h="30px" 
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lecture Description"
              mt={4}
              h="150px"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLectureModal;

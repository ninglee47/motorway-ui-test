import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  HStack
} from '@chakra-ui/react'

export default function ImageModal({ isOpen, onClose, img }) {
  if (!img) {
      return <></>
  }
  return (
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{img.alt_description}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <HStack pb='20px'>
                  <Box
                     bgImage={`${img.user.profile_image}.webp`}
                     bgSize="cover"
                     bgPosition="center"
                     bgRepeat="no-repeat"
                     border='1px'
                     borderRadius='50px'
                     w="50px"
                     h="50px"
                  />
                  <Box>
                      <Text>{img.user.name}</Text>
                      <Text>{img.user.location}</Text>
                  </Box>
              </HStack>
              <Image src={`${img.url}.jpg`} pb='10px'/>
              <Text fontWeight={'bold'} fontSize={'2xl'}>{img.user.name}</Text>
              <Text>{img.description}</Text>
        
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}


import React, { Profiler,useEffect, useState} from 'react';
import {  Text, Box, HStack, VStack, Grid, GridItem, useDisclosure,} from '@chakra-ui/react'

import ImageModal from './ImageModal';

const ItemCard = (props) => {
    const img = props.Image

    return (
        <Box 
           maxW={{base:"300px", md: "400px", lg: "400px", xl:"400px"}} 
           borderWidth='1px' 
           borderRadius='lg' 
           overflow='hidden'>
          <VStack align={'left'}>
            <Box
              bgImage={`${"data:image/webp;base64," + img.thumbnail}`}
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
              w={{base:"300px", md: "400px", lg: "400px", xl:"400px"}}
              h={{base:"300px", md: "400px", lg: "400px", xl:"400px"}}
            />
            <Box >
            <HStack> 
                <Box pb='10px'>
                  <Box
                      bgImage={`${img.user.profile_image}.webp`}
                      bgSize="cover"
                      bgPosition="center"
                      bgRepeat="no-repeat"
                      border='1px'
                      borderRadius='50px'
                      w="50px"
                      h="50px"
                      ml='5px'
                      />
                  </Box>
                <Box>
                  <Text fontSize={'2xl'}>{img.user.name}</Text>
                  <Text>Likes: {img.likes}</Text>
                </Box>
            </HStack>
            </Box>
          </VStack>
        </Box>
    )
  }
  
  const CardPopover = ({ img, onOpen }) => {
    const firstFieldRef = React.useRef(null)
    return (
      <GridItem colStart={{md:2}} 
      colSpan={{base: 3, md:1, lg:1, xl: 1}} 
      onClick={onOpen} pb='30px' 
      alignItems="start" 
      ref={firstFieldRef}>  
        <ItemCard Image={img}/>
      </GridItem>
    )
  }

export default function FetchThumbNail() {
    const [images, setImages] = useState();
    const [selectedCarImage, setSelectedCarImage] = useState();
    const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure()
    

    const renderCallback = (
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
      ) => {
        console.log("Id", id)
        console.log("Phase(Thumbnail):", phase)
        console.log("Actual duration(Thumbnail)", actualDuration)
      }
  
    useEffect(() => {
      fetch('imageThumbnails?limit=10')
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
          setImages(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);
    
    return (
        <>
        <Profiler id='Thumbnail' onRender={renderCallback}>        
        <Text mb='20px' align={'center'} fontWeight={'bold'} fontSize={'2xl'}>
           Fetch Thumbnails (optimised)
        </Text>
        
        <ImageModal 
          isOpen={isImageModalOpen} 
          onClose={onImageModalClose}
          img={selectedCarImage}
        />
        <Grid templateColumns='repeat(3, 1fr)' gap={6} pl='40px' pr='40px'>
        {
          images && images.map(img => (
            <CardPopover 
              img={img} 
              key={img.id}
              onOpen={() => {
                onImageModalOpen();
                setSelectedCarImage(img);
              }} 
            />
          ))
        }
        </Grid>
        </Profiler>
        </>
    );
}
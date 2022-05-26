import React from 'react';
import { ChakraProvider, Text, Box, Button } from '@chakra-ui/react'

import ClientForm from './components/Form';
import FetchFullSize from './components/FetchFullSize';
import FetchThumbNail from './components/FetchThumbNail';


const App = () => {
  
  return (
    <ChakraProvider>
      <Text fontWeight={'bold'} fontSize={'3xl'} mb='20px' align={'center'} mt='20px'>
         Motorway UI Test
      </Text>
      
      {/* <FetchFullSize /> */}
      <FetchThumbNail />
      
      <Box mb='30px'>
        <ClientForm/>
      </Box>

      <Box w='100%' maxW={{base:'350px', md:'800px'}} mx={'auto'} pl='10px' pr='10px' mb='20px'>
        
          <Text fontSize={'2xl'} fontWeight={'bold'}>
          Performance optimization:
          </Text>
          <Text>
          All Images for cars were resized and transformed to webp format then were stored in another json file called Image_thumbnails.json.
          A new endpoint (imageThumbnails) was implemented to send the data from Image_thumbnails.json to the client. 
          </Text>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
          Performance Measurement :
          </Text>
          <Text>
          The time spent rendering the committed update is printed in the console by using React Profiler. <br/>
          In order to compare the time spent between the optimised component (FetchThumbNail) and the unoptimised component (FetchFullSize), 
          please uncomment the FetchFullSize component in the App.js.
          </Text>
      </Box>

    </ChakraProvider>
  );
}

export default App;

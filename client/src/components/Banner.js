import React from 'react';
import SideBar from './Sidebar';

// imported from chakra UI
import { Box, Image, Text, Center, Link, Button } from '@chakra-ui/react'

function Banner() {
  return (
    // <div className="container">
      <Center>
        <Box bg='orange.300' w='100%' p={1} color='white' fontSize={'3xl'} borderRadius='xl'>
          <Center>
            <Image
              boxSize='60px'
              src='https://i.postimg.cc/TPXj84Sc/bee.png'
              alt='Bee My Friend Logo'
            />
          </Center>
          <Center>
          <Text textColor="black" >
            Bee My Friend
          </Text>
          </Center>
        </Box>
      </Center>
    // </div>
  );
}

export default Banner;
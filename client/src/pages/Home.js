import React from 'react';
import { Image } from '@chakra-ui/react'

import {
  Avatar,
  Box,
  Heading,
  Container,
  Link,
  Text,
  Flex,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

// Testimonial Card Styling Begins Here 
const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

// End of Testimonial Constants


function Home() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Find your next best friend. <br />
            <Text as={'span'} color={'orange.400'}>
              Bee My Friend
            </Text>
          </Heading>
          <Flex flex={1}>
            <Image
              alt={'Landing Page Image'}
              imageAlign={'center'}
              objectFit={'cover'}
              borderRadius='full'
              src={
                'https://images.unsplash.com/photo-1629713014426-156da15c7571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
              }
            />
          </Flex>
          <Text color={'gray.500'}>
            Insert copy about Bee My Friend Here. Insert copy about Bee My Friend Here.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Link href='/login'>
              <Button
                colorScheme={'green'}
                size="lg"
                bg={'tomato'}
                rounded={'full'}
                px={40}
                _hover={{
                  bg: 'gray.500',
                }}>
              Login
              </Button>
            </Link>
            <Button variant={'link'} colorScheme={'blue'} size={'med'}>
              <Link href='/signup'>
                Not yet registered? Sign up today!
              </Link>
            </Button>

      {/* Playing around with testimonial cards */}
      <br></br><br></br>
      <Box  bg={useColorModeValue('gray.100', 'gray.600')}>
      <Container maxW={'3xl'} py={15} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading color='tomato'>Success Stories</Heading>
          <Text>Check out what our users have to say!</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Shared Interests</TestimonialHeading>
              <TestimonialText>
                Bee My Friend matched me with Craig. 
                We clicked right away and now we go to Big Bear every winter! 
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1522542194-2c2e6ffcf7d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
              }
              name={'Simon'}
              title={'Support Staff at Tittle'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Parasocial Relationships</TestimonialHeading>
              <TestimonialText>
                Working remotely can be lonely. Bee My Friend's messaging function gives me a chance to reconnect with other game lovers like me. 
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1568431477192-52bb13a55088?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              }
              name={'Sonic The Hedgehog'}
              title={'Blogger at Game Rewiew'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
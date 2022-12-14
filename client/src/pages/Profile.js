import React from 'react';
// import SideBar from '../components/Sidebar';
import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
// imported from chakra UI
import {
  Box,
  Image,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react';

function Profile() {
  let userProfile = auth.getProfile();
  let profileId = userProfile.data._id;
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });
  const profile = data?.profile || {};
  console.log(profile.interests)

  if (loading) {
    return <div>Loading ... Please Wait a Moment</div>
  }

  return (
    <div>
      
      <Center>
        <Box bg='orange.300' w='50%' p={4} borderRadius='full'>
          Your Profile
        </Box>
      </Center>
      <Stack direction='row' h='10px' p={4}>
        <Divider />
      </Stack>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'orange.400',
                  zIndex: -1,
                }}>
                {profile.name}
              </Text>
              <br />{' '}
              <Text color={'orange.400'} as={'span'}>
                Bio
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              The project board is an exclusive resource for contract work. It's
              perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align={'center'} justify={'center'}>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'orange.300'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'14'}>
                  Interests
                </Text>
                {profile.interests.map((interest) => <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'10'}
                >{interest}</Text>)}
              </Box>
            </Stack>
            {/* <Link href='/ProfileUpdate'><Button rounded={'full'}>Edit your interests</Button></Link> */}
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            borderRadius='full'
            boxSize='550px'
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Stack>
    </div>
  );
}

export default Profile;
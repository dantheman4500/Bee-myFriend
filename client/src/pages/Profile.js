import React from 'react';
// import SideBar from '../components/Sidebar';
import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

// Import elements from chakra UI
import {
  Box,
  Image,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react';

function Profile() {
  let userProfile = auth.getProfile();
  let profileId = userProfile.data._id;
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });
  const profile = data?.profile || {};
  if (loading) {
    return <div>Loading ... Please Wait a Moment</div>
  }

  return (
    <div>
        <Box bg='orange.300' w='100%' p={4} borderRadius='xl'>
          Your Profile
        </Box>
      <Stack direction='row' h='10px' p={4}>
        <Divider />
      </Stack>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        {/* <Flex p={8} flex={1} align={'center'} justify={'center'}> */}
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
                Welcome, {profile.firstName} {profile.lastName}!
              </Text>
              <br />{' '}
              {/* <Text color={'orange.400'} as={'span'}>
                Bio
              </Text>{' '} */}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {profile.userBio}
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
                {profile.interests?.map((interest) => <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'10'}
                >{interest}</Text>)}
              </Box>
            </Stack>
            {/* <Link href='/ProfileUpdate'><Button rounded={'full'}>Edit your interests</Button></Link> */}
          </Stack>
        {/* </Flex> */}
        {/* <Flex flex={1}> */}
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            borderRadius='full'
            boxSize='350px'
            src={
              'https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80'
            }
          />
      </Stack>
    </div>
  );
}

export default Profile;
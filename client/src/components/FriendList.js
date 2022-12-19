import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button
} from '@chakra-ui/react';

const FriendList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>Nothing to show here...</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <Center py={6} key={profile._id}>
              <Box
                maxW={'270px'}
                w={'full'}
                bg={'orange.300'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                  h={'120px'}
                  w={'full'}
                  src={
                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                  }
                  objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                  <Avatar
                    size={'xl'}
                    src={
                      profile.image
                    }
                    alt={'image depicting a bumblebee icon'}
                    css={{
                      border: '2px solid white',
                    }}
                  />
                </Flex>
                <Box p={6}>
                  <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                      {profile.name}
                    </Heading>
                  </Stack>
                  <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                    Interests
                  </Heading>
                  <Stack direction={'row'} justify={'center'} spacing={6}>
                    {profile.interests && profile.interests.map((interest) => (
                      <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{interest}</Text>
                      </Stack>
                    ))}
                  </Stack>
                  <Link
                    to={`/friends/${profile._id}`}
                  >
                    <Button
                      w={'full'}
                      mt={8}
                      bg={'gray.900'}
                      color={'white'}
                      rounded={'md'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}>
                      View Profile
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Center>
          ))}
      </div>
    </div>
  );
};

export default FriendList;

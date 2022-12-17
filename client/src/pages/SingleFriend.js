import React from 'react';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    VStack,
    Button,
    Badge,
    Divider
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import FriendList from '../components/FriendList';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

const styles = {
    marginRight: "7%",
}

const SingleFriend = () => {
    const { profileId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
    });
    console.log(data)
    console.log(profileId)
    const profile = data?.profile || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Center style={styles}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={'orange.300'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={profile.image}
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {profile.firstName} {profile.lastName}
                </Heading>
                <Divider height={'50px'} borderColor='orange.300'/>
                <Text
                    textAlign={'center'}
                    color={'white.400'}
                    px={3}>
                    {profile.userBio}
                </Text>

                <VStack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    {profile.interests.map((interest) => (
                        <Badge
                            px={2}
                            py={1}
                            bg={'white.800'}
                            fontWeight={'400'}
                            fontSize={'xl'}
                            >
                            {interest}
                        </Badge>
                    ))}
                </VStack>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _hover={{
                            bg: 'yellow.500'
                        }}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        Message
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _hover={{
                            bg: 'yellow.500',
                        }}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        Add
                    </Button>
                </Stack>
            </Box>
        </Center>



    );
};

export default SingleFriend;

{/* <div>
<h2 className="card-header">
    
    {profile.image}
</h2>
</div> */}

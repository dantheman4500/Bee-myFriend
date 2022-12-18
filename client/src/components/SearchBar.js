import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css"
import {
    Heading,
    Box,
    Center,
    Image,
    Text,
    Stack,
    Button,
    Input,
    HStack
} from '@chakra-ui/react';

import { useQuery } from '@apollo/client';
import { QUERY_INTEREST } from '../utils/queries';
import { FaSearch, FaForumbee } from 'react-icons/fa';

//function to query the inputted interest and return a list of profiles that have that interest
function SearchBar({ onSearchSubmit }) {
    const [interest, setInterest] = useState('')
    const submitInterest = (e) => {
        e.preventDefault();
        onSearchSubmit(interest);
    };
    console.log(interest)
    const { loading, data } = useQuery(QUERY_INTEREST, {
        variables: { profileInterest: interest }
    })
    const profiles = data?.findProfileByInterest || [];
    return (
        <div>
            <Box>
                <Text className='search-text'><FaSearch className='search-icon' />Start by typing an interest </Text>
            </Box>
            <form onSubmit={submitInterest}>

                <Input placeholder="Hiking"
                    value={interest.toLowerCase()}
                    onChange={(e) => setInterest(e.target.value)}
                    className="search-input"
                />

                {profiles &&
                    profiles.map((profile) => (

                        <HStack spacing='30%'>
                            <Center py={1} key={profile._id}>
                                <Box
                                    maxW={'470px'}
                                    w={'300px'}
                                    bg={'orange.300'}
                                    boxShadow={'2xl'}
                                    rounded={'lg'}
                                >
                                    <Image
                                        h={'90px'}
                                        w={'full'}
                                        src={
                                            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                        }
                                        objectFit={'cover'}
                                    />
                                    <Box p={6}>
                                        <Stack spacing={0} align={'center'} mb={5}>
                                            <Heading fontSize={'5xl'} fontWeight={500} fontFamily={'body'}>
                                                {profile.firstName} {profile.lastName} was found!
                                            </Heading>
                                        </Stack>
                                        <Heading fontSize={'3xl'} fontWeight={500} fontFamily={'body'} className="friend-interest">
                                            Their interest(s) include:
                                        </Heading>
                                        {profile.interests && profile.interests.map((interest) => (
                                            <Text fontWeight={600} textTransform={"capitalize"}>{interest}</Text>
                                        ))}
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
                                                View Their Profile
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Center>
                        </HStack>
                    ))}
            </form>
            <FaForumbee className='bee-icon' /><Text>Bee My Friend</Text>
        </div>
    )
}

export default SearchBar;
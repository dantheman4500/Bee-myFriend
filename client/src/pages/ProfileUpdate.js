import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries'
import { ADD_INTEREST, DELETE_PROFILE, UPDATE_BIO } from '../utils/mutations';
import Auth from '../utils/auth';
// imported elements from chakra UI
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Center
} from '@chakra-ui/react';

// function to deal with handling adding interests, updating user bio, or deleting a user's profile
const UpdateProfile = (props) => {
  // get the profile id from the stored token
  const userId = Auth.getProfile();
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: userId.data._id }
  });
  // get the profile data from the token
  const profile = data?.profile || {};
  const [removeProfile, { error }] = useMutation(DELETE_PROFILE);
  // function to handle deleting the user's profile
  const handleDeleteProfile = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const testId = Auth.getProfile();
    if (!token) {
      return false;
    }
    try {
      const mutationResponse = await removeProfile({
        variables: {
          profileId: testId.data._id
        }

      });
    } catch (err) {
      console.error(error);
    }
    Auth.logout();
  };
  const [interest, setInterest] = useState('');
  const [addInterest, { er }] = useMutation(ADD_INTEREST);
  // function to handle adding an interest
  const handleAddingInterest = async (event) => {

    try {
      const { data } = await addInterest({
        variables: {
          profileId: userId.data._id,
          interest
        }
      });
      console.log(interest)
      setInterest('');
    } catch (err) {
      console.error(err)
    }
  }

  const [userBio, setUserBio] = useState('');
  const [updateBio, { err }] = useMutation(UPDATE_BIO);
  // Function to update user bio
  const handleBioUpdate = async (event) => {
    try {
      const { data } = await updateBio({
        variables: {
          profileId: profile._id,
          userBio
        }
      });
      console.log(userBio);
      setUserBio('');
    } catch (err) {
      console.error(err)
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
        <Text
          as={'span'}
          position={'relative'}
          _after={{
            content: "''",
            width: 'full',
            height: useBreakpointValue({ base: '20%', md: '30%' }),
            position: 'absolute',
            bottom: 1,
            left: 0,
            zIndex: -1,
          }}>
          What would you like to do, {profile.firstName}?
        </Text>
      </Heading>
      <FormControl>
        <Center>
          <FormLabel>Add more interests?</FormLabel>
        </Center>
        <Input
          placeholder="i.e. Hiking"
          name="interest"
          type="interest"
          value={interest.toLowerCase()}
          width="30%"
          onChange={(e) => setInterest(e.target.value)}
        />
        <Button onClick={() => handleAddingInterest()} margin="1%" bg={'orange.300'}>Add</Button>
      </FormControl>
      <FormControl>
        <Center>
          <FormLabel>Update your bio?</FormLabel>
        </Center>
        <Textarea
          name="userBio"
          type="userBio"
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
          width="70%"
        ></Textarea>
        <Button onClick={() => handleBioUpdate()} margin="2%" bg={'orange.300'}>Update</Button>
      </FormControl>
      {/* Delete button modal */}
      <Button bg={"red.400"} size='lg' onClick={onOpen}>
        DELETE PROFILE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Profile?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete your profile? All of your data will be permanently removed.</Text>
          </ModalBody>
          <ModalFooter>
            <Button bg={"orange.300"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' bg={"red.400"} onClick={() => handleDeleteProfile()}>Delete profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
}

export default UpdateProfile;

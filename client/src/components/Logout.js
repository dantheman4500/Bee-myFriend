import { Button, Text, Image, Center } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Logout = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const styles = {
    btn: {
      padding: "2%",
      margin: "1%"
    },
    pic: {
      borderRadius: "2%"
    },
    header: {
      marginRight: "1%"
    },
    text: {
      marginRight: "18%",
      padding: "3%",
      marginBottom: '3%'
    }

  }

  return (
    <header style={styles.header}>
      <Image src='https://i.postimg.cc/prh5P4bR/lute-f-YS-YE16-Yb0-unsplash.jpg' style={styles.pic} alt='image depicting a cat watching its owner walk away' />
      <Center>
        <Text fontSize='4xl' padding={"3"} style={styles.text} width={'full'}>
          Are you sure you want to leave?
        </Text>
      </Center>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to="/profile">
              <Button bg={'orange.300'} style={styles.text}>
                Take Me Back to My Profile
              </Button>
            </Link>
            <br />
            <Link>
              <Button bg={'orange.300'} onClick={logout} style={styles.text}>
                I want to Logout
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Text fontSize='2xl'>
              Come back soon!
            </Text>
            <Link to="/">
              <Button bg={'orange.300'} style={styles.btn}>Go back to Home</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Logout;
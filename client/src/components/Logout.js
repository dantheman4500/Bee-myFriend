import { Button, Text, Image } from '@chakra-ui/react';
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
    }

  }

  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <Image src='https://i.postimg.cc/prh5P4bR/lute-f-YS-YE16-Yb0-unsplash.jpg' style={styles.pic}/>
      <Text fontSize='4xl'>
        Are you sure you want to leave?
      </Text>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to="/profile">
              <Button bg={'orange.300'}>
                Take Me Back to My Profile
              </Button>
            </Link>
            <br />
            <Link>
              <Button bg={'orange.300'} onClick={logout} style={styles.btn}>
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
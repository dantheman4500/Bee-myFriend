import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import statement for Chakra UI components
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import Banner from './components/Banner';
import Profile from './pages/Profile';
import Login from "./pages/Login"
// import Friends from './pages/Friends';
import SingleFriend from './pages/SingleFriend';
import Donate from './pages/Donate';
import Success from './pages/Success';
import SearchBar from './components/SearchBar';
import SignUp from './pages/SignUp';
import ProfileUpdate from './pages/ProfileUpdate';
// import UserProfile from './components/UserProfile';
import SideBar from './components/Sidebar';
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Banner />
        <SideBar />
        <Router>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={0}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                  <div className="flex-column justify-flex-start min-100-vh">
                    <div className="container">
                      <Routes>
{/* This first route denotes the loading/landing page, the first page a user sees */}
                        <Route 
                          path="/" 
                          element={<Home/>} 
                        />
                        <Route 
                          path="/login" 
                          element={<Login/>} 
                        />
                        <Route 
                          path="/profile" 
                          element={<Profile/>} 
                        />
                        <Route 
                          path="/profileupdate" 
                          element={<ProfileUpdate/>} 
                        />
                        <Route 
                          path="/friends" 
                          element={<SearchBar/>} 
                        />
                        <Route 
                          path="/friends/:profileId" 
                          element={<SingleFriend/>} 
                        />
                        <Route
                        path='/donate'
                        element={<Donate/>}
                        />
                        <Route
                        path='/success'
                        element={<Success/>}
                        />                   
                        <Route 
                          path="signup" 
                          element={<SignUp/>} 
                        />                       
                      </Routes>
                    </div>
                  </div>
              </VStack>
            </Grid>
          </Box>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;


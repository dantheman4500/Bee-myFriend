import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Heading,
} from '@chakra-ui/react'

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <Heading>Login</Heading>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/profile">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    className="form-input"
                    placeholder="***************"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <FormHelperText> Make sure you don't forget your password.</FormHelperText>
                </FormControl>
                <br />
                <Button
                  size='md'
                  height='48px'
                  width='200px'
                  border='2px'
                  borderColor='orange.400'
                  bg="orange.300"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;


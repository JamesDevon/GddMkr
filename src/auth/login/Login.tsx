import React, {FormEvent, FormEventHandler, useEffect, useRef, useState} from 'react';
import {Authenticator} from '../../service/api/authentication/Authenticator';
import {FrontConfig} from '../../config/FrontConfig';
import {Navigate} from 'react-router-dom';
import {ILoginProps, LoginPage} from './LoginPage';

export const Login = () => {
  if (Authenticator.isLogin()) {
    return <Navigate to={{pathname: FrontConfig.app}} />;
  }

  const userRef = useRef<any>();
  const errorRef = useRef<any>();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if ( userRef !== null && userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await Authenticator.login(user, password);
      if (!success) {
        setError('The credentials were incorrect. Please try again.');
      } else {
        window.location.href = FrontConfig.app;
      }
    } catch (loginError) {
      setError('Login failed due to system error. Please try again.');
    }
  };

  const props : ILoginProps = {
    handleSubmit,
    error: {
      value: error,
      errorRef,
    },
    user: {
      value: user,
      userRef,
      setUser,
    },
    password: {
      value: password,
      setPassword,
    },
  };

  return (
    <LoginPage {...props}/>
  );
};

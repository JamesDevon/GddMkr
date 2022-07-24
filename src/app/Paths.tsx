import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Login} from '../auth/login/Login';
import {SignUp} from '../auth/signup/SignUp';
import {FrontConfig} from '../config/FrontConfig';
import {Project} from '../project/Project';

const Paths = () => (
  <BrowserRouter>
    <Routes>
      <Route path={FrontConfig.root} element={<Navigate replace to={FrontConfig.loginPath}/>}/>
      <Route path={FrontConfig.app} element={<Project/>}/>
      <Route path={FrontConfig.appUnique} element={<Project/>}/>
      <Route path={FrontConfig.loginPath} element={<Login/>}/>
      <Route path={FrontConfig.signUpPath} element={<SignUp/>}/>
    </Routes>
  </BrowserRouter>
);

export default Paths;

import React, {ChangeEvent, FormEvent, useRef, useState} from 'react';
import './SignUp.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Authenticator} from '../../service/api/authentication/Authenticator';
import {Modal} from 'react-bootstrap';
import {FrontConfig} from '../../config/FrontConfig';
import StatusCode from 'status-code-enum';
import {Navigate} from 'react-router-dom';

export const SignUp = () => {
  if (Authenticator.isLogin()) {
    return <Navigate to={{pathname: FrontConfig.app}} />;
  }

  // #Username
  const [userName, setUserName] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const errorRef = useRef<any>();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const targetUserName: string = e.target.value;
    setUserName(targetUserName);
    const usernameRegex : RegExp = /^[a-zA-Z0-9]+$/;
    setValidUsername((targetUserName.length > 3 && usernameRegex.test(targetUserName)));
  };

  // #Email
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const targetedEmail: string = e.target.value;
    setEmail(targetedEmail);
    const emailRegex : RegExp = /^\S+@\S+\.\S+$/;
    setValidEmail(emailRegex.test(targetedEmail));
  };

  // #Password
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const targetPassword : string = e.target.value;
    setPassword(targetPassword);
    const passwordRegex : RegExp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    setValidPassword(passwordRegex.test(targetPassword));
  };

  // #RePassowrd
  const [rePassword, setRePassword] = useState('');
  const [validRePassword, setValidRePassword] = useState(true);

  const handleRePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const targetRePassword: string = e.target.value;
    setRePassword(targetRePassword);
    setValidRePassword(targetRePassword === password);
  };

  const isValid = () : boolean => {
    return (validEmail && validRePassword && validPassword && validUsername);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success : number = await Authenticator.registerUser(userName, email, password);
    if (success == StatusCode.ClientErrorBadRequest) {
      setError('The credentials were incorrect. Please try again.');
    } else if (success == StatusCode.SuccessCreated) {
      setShowModal(true);
      setTimeout(() => {
        window.location.href = FrontConfig.loginPath;
      }, 3000);
    } else if (success == StatusCode.ClientErrorConflict) {
      setError('It seems there is already an account with the provided username or email.');
    } else {
      setError('Sign up failed due to system error. Please try again.');
    }
  };


  return (
    <div>
      <section className={error ? 'alert alert-primary error' : 'offscreen' }>
        <p ref={errorRef} aria-live='assertive'>{error}</p>
        <a href="#!" className="text-body">Forgot password?</a>
      </section>
      <Modal show={showModal} >
        <Modal.Header>
          <Modal.Title>Sign up successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Redirecting to login page in 3 seconds</Modal.Body>
      </Modal>
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row mb-4">
                          <i className={`${(validUsername) ? 'bi bi-person-check icon' : 'bi bi-person-x icon-error'} h3 translate-middle-x`}/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="username" className={`form-control ${(validUsername) ? '' : 'is-invalid'}`}
                              value={userName} required
                              autoComplete="off"
                              onChange={handleUsername}
                            />
                            <i className="bi bi-info-circle icon" data-bs-toggle="tooltip" data-bs-placement="right" title="Username should contain at least 4 characters and no special character"/>
                            <label className="form-label" htmlFor="username">Username</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row mb-4">
                          <i className={`bi ${(validEmail) ? 'bi-envelope-check icon' : 'bi-envelope-x icon-error'} h3 translate-middle-x`}/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className={`form-control ${(validEmail) ? '' : 'is-invalid'}`}
                              value={email} required
                              autoComplete="off"
                              onChange={handleEmail}/>
                            <label className="form-label" htmlFor="form3Example3c">Your
                                                            Email</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row mb-4">
                          <i className={`bi bi-lock h3 translate-middle-x ${(validPassword) ? 'icon': 'icon-error' }`}/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="password"
                              className={`form-control ${(validPassword) ? '': 'is-invalid' }`}
                              value={password} required
                              autoComplete="off"
                              onChange={handlePassword}/>
                            <i className="bi bi-info-circle icon" data-bs-toggle="tooltip" data-bs-placement="right"
                              title="Password should be at least 8 characters long while containing an upper case letter, a lower case letter and a number"/>
                            <label className="form-label"
                              htmlFor="password">Password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row mb-4">
                          <i className={`bi bi-key ${(validRePassword) ? 'icon' : 'icon-error'} h3 translate-middle-x`}/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="rePassword"
                              className={`form-control ${(validRePassword) ? '' : 'is-invalid'}`}
                              value={rePassword} required
                              autoComplete="off"
                              onChange={handleRePassword}/>
                            <label className="form-label" htmlFor="rePassword">Repeat your
                                                            password</label>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg" disabled={!isValid()}>Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

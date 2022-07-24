import {FrontConfig} from '../../config/FrontConfig';
import React, {FormEventHandler} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export interface ILoginProps {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    error: {
        value: string,
        errorRef: React.MutableRefObject<any>,
    },
    user: {
        userRef: React.MutableRefObject<any>,
        setUser: React.Dispatch<React.SetStateAction<string>>,
        value: string,
    },
    password: {
        value: string,
        setPassword: React.Dispatch<React.SetStateAction<string>>,
    }
}

export const LoginPage = (props: ILoginProps) => {
  return (
    <div>
      <section className={props.error.value ? 'alert alert-primary error' : 'offscreen' }>
        <p ref={props.error.errorRef} aria-live='assertive'>{props.error.value}</p>
        <a href="#!" className="text-body text-error">Forgot password?</a>
      </section>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="/login.jpeg"
                className="img-fluid" alt="Game Dev image"/>
            </div>

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={props.handleSubmit} autoComplete="off">
                <div className="form-outline mb-4">
                  <input type="username" ref={props.user.userRef} id="form3Example3" className="form-control form-control-lg"
                    onChange={(e) => {
                      props.user.setUser(e.target.value);
                    }} value={props.user.value} required
                    autoComplete="off"
                    placeholder="Enter your username"/>
                  <label className="form-label" htmlFor="form3Example3">Username</label>
                </div>

                <div className="form-outline mb-3">
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    onChange={(e) => {
                      props.password.setPassword(e.target.value);
                    }} value={props.password.value} required
                    autoComplete="off"
                    placeholder="Enter your password"/>
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3"/>
                    <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button disabled={(props.user.value.trim() === '' || props.password.value.trim() == '')}
                    type="submit" className="btn btn-primary btn-lg">Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account? <a href={FrontConfig.signUpPath}
                    className="link-danger">Register</a>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

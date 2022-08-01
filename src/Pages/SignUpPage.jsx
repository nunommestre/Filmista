import React, { useState, useEffect } from "react";
import "./CSS/signUp.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const SignUpPage = () => {
  // Refs
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
   const navigate = useNavigate();
   useEffect(() => {
      console.log(error);
  });
  const signUpUser = async () => {
    try {
      if (password !== passwordConfirm){
        return
      }
    await Auth.signUp(
        email,
        password);
      navigate("/signIn");
    } catch (error) {
      setError("error signing in", error);
    }
  };
  // ----- Return Statement ----- //
  return (
    // https://startbootstrap.com/snippets/login helped with styling
    <div className="container sign-up">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className=" sign-up-card card-body p-4 p-sm-5">
              <h1 className="card-title text-center fw- bold mb-2 fs-5">
                Welcome to Filmista!
              </h1>
              <p className="text-center fw-light mb-3 fs-5">
                Create an account to start ranking your favorite movies with
                friends today!
              </p>
              <form onSubmit={signUpUser}>
                <div className="mb-3">
                  <h5>Name:</h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    value={username}
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <h5>Bio:</h5>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter something about yourself..."
                    rows="4"
                    cols="30"
                    name="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <h5>Email Address</h5>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <h5>Password</h5>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <h5>Confirm Password</h5>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid mb-3">
                  <button
                    className="btn btn-dark btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="d-grid mb-3">
                <button
                  className="btn btn-dark btn-login text-uppercase fw-bold"
                  onClick={() => (window.location.href = "/signIn")}
                >
                  Already have an account? Login
                </button>
              </div>
              <div className="d-grid">
                <button className="btn btn-link text-uppercase fw-bold">
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

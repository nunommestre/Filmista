import React, {useState} from "react";
import "./CSS/signUp.css"
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";
import { Navigate } from "react-router-dom"
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const SignInPage = ({onSignIn}) => {
  // Refs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signIn = async () => {
    try {
        const user = await Auth.signIn(email, password);
        onSignIn()
    } catch (error) {
        console.log('error signing in', error);
    }
};


  // ----- Return Statement ----- //
  return (
    // https://startbootstrap.com/snippets/login helped with styling
<div className="container sign-in">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className=" sign-up-card card-body p-4 p-sm-5">
          <h1 className="card-title text-center fw- bold mb-3 fs-5">Welcome Back</h1>
              <div className="mb-3">
                <h5>Username</h5>
                <input type="email" name="username" className="form-control" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} required />
              </div>
              <div name="username" className="mb-3">
                <h5>Password</h5>
                <input type="password" className="form-control" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="d-grid mb-3">
                <button className="btn btn-dark btn-login text-uppercase fw-bold" onClick={signIn}>Sign In</button>
              </div>
              <div className="d-grid mb-3">
                <button className="btn btn-dark btn-login text-uppercase fw-bold" onClick={() => window.location.href="/signUp"}>Sign Up</button>
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
}

export default SignInPage;
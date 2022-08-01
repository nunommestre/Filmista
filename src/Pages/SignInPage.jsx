import React, {useRef} from "react";
import "./CSS/signUp.css"

const SignInPage = () => {
  // Refs
  const nameRef = useRef() 
  const bioRef = useRef() 
  const emailRef = useRef() 
  const passwordRef = useRef() 
  const passwordConfirmRef = useRef() 
  // ----- Return Statement ----- //
  return (
    // https://startbootstrap.com/snippets/login helped with styling
<div class="container sign-in">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class=" sign-up-card card-body p-4 p-sm-5">
          <h1 class="card-title text-center fw- bold mb-3 fs-5">Welcome Back</h1>
            <form>
              <div class="mb-3">
                <h5>Email Address</h5>
                <input type="email" class="form-control" placeholder="name@example.com" ref={emailRef} name="email" required />
              </div>
              <div class="mb-3">
                <h5>Password</h5>
                <input type="password" class="form-control" placeholder="Password" ref={passwordRef} name="password" required />
              </div>
              <div class="d-grid mb-3">
                <button class="btn btn-dark btn-login text-uppercase fw-bold" type="submit">Sign In</button>
              </div>
            </form>
              <div class="d-grid mb-3">
                <button class="btn btn-dark btn-login text-uppercase fw-bold" onClick={() => window.location.href="/signUp"}>Sign Up</button>
              </div>
              <div class="d-grid">
                <button class="btn btn-link text-uppercase fw-bold">
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
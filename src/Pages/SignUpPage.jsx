import React, {useRef} from "react";
import "./CSS/signUp.css"

const SignUpPage = () => {
  // Refs
  const nameRef = useRef() 
  const bioRef = useRef() 
  const emailRef = useRef() 
  const passwordRef = useRef() 
  const passwordConfirmRef = useRef() 
  // ----- Return Statement ----- //
  return (
    // https://startbootstrap.com/snippets/login helped with styling
<div class="container sign-up">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class=" sign-up-card card-body p-4 p-sm-5">
          <h1 class="card-title text-center fw- bold mb-2 fs-5">Welcome to Filmista!</h1>
          <p class="text-center fw-light mb-3 fs-5">Create an account to start ranking your favorite movies with friends today!</p>
            <form>
            <div class="mb-3">
                <h5>Name:</h5>
                <input type="text" class="form-control" placeholder="John Doe" ref={nameRef} name="name" required />
              </div>
              <div class="mb-3">
                <h5>Bio:</h5>
                <textarea type="text" class="form-control" placeholder="Enter something about yourself..." rows = "4" cols = "30" ref={bioRef} name="bio" required />
              </div>
              <div class="mb-3">
                <h5>Email Address</h5>
                <input type="email" class="form-control" placeholder="name@example.com" ref={emailRef} name="email" required />
              </div>
              <div class="mb-3">
                <h5>Password</h5>
                <input type="password" class="form-control" placeholder="Password" ref={passwordRef} name="password" required />
              </div>
              <div class="mb-3">
                <h5>Confirm Password</h5>
                <input type="password" class="form-control" placeholder="Password" ref={passwordConfirmRef} name="confirm-password" required />
              </div>
              <div class="d-grid mb-3">
                <button class="btn btn-dark btn-login text-uppercase fw-bold" type="submit">Sign Up</button>
              </div>
            </form>
              <div class="d-grid mb-3">
                <button class="btn btn-dark btn-login text-uppercase fw-bold" onClick={() => window.location.href="/signIn"}>Already have an account? Login</button>
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

export default SignUpPage;

// ----- 1. CSS Files ----- //
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ----- 2. Components ----- //
import LoadingScreen from "./Components/Loading";
import NavBarSocialLinks from "./Components/NavBarLinks";

// ----- 3. External Libraries ----- //
import { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  // ----- Properties ----- //

  // ----- Return Statement ----- //
  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        bg="primary"
        variant="dark"
        // className="navigation-bar"
        expand="lg"
      >
        {/* NAVIGATION BAR - BRAND  */}
        <Navbar.Brand className="brand" href="#">
          Filmista
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavBarSocialLinks logOut={signOut} />
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Container>
          <p>Hello {user.username}</p>
        </Container>
      </div>
    </div>
  );
}

export default withAuthenticator(App);

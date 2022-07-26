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
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  // ----- Properties ----- //

  const [loading, setLoading] = useState(true);

  // ----- Use Effect ----- //

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  // ----- Return Statement ----- //

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Navbar
          collapseOnSelect
          fixed="top"
          bg="primary"
          variant="dark"
          // className="navigation-bar"
          expand="lg"
        >
          <Container>
            {/* NAVIGATION BAR - BRAND  */}
            <Navbar.Brand style={{ fontSize: "50px" }} href="#">
              Filmista
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavBarSocialLinks logOut={signOut} />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default withAuthenticator(App);

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ----- 2. Components & Pages ----- //
import NavBarSocialLinks from "./Components/NavBarLinks";
// ----- Pages ----- //
import EditAccountPage from "./Pages/EditAccountPage";
import CreatePlaylistPage from "./Pages/CreatePlaylistPage";
import FriendsPage from "./Pages/FriendsPage";
import ExplorePage from "./Pages/ExplorePage";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
// ----- 3. External Libraries ----- //
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  // ----- Properties ----- //
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = HomePage;
      break;
    case "/signUp":
      Component = SignUpPage;
      break;
    case "/signIn":
      Component = SignInPage;
      break;
    case "/editAccount":
      Component = EditAccountPage;
      break;
    case "/createPlaylist":
      Component = CreatePlaylistPage;
      break;
    case "/friends":
      Component = FriendsPage;
      break;
    case "/explore":
      Component = ExplorePage;
      break;
  }
  // ----- Return Statement ----- //
  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        bg="dark"
        variant="dark"
        // className="navigation-bar"
        expand="lg"
      >
        {/* NAVIGATION BAR - BRAND  */}
        <Navbar.Brand className="brand" href="/">
          Filmista
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavBarSocialLinks />
          {/* logOut={signOut} */}
        </Navbar.Collapse>
      </Navbar>
      <Component />
    </div>
  );
}

export default App;

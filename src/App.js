// ----- 1. CSS Files ----- //
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
// ----- 3. External Libraries ----- //
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  // ----- Properties ----- //
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <HomePage user={user} />;
      break;
    case "/editAccount":
      component = <EditAccountPage />;
      break;
    case "/createPlaylist":
      component = <CreatePlaylistPage />;
      break;
    case "/friends":
      component = <FriendsPage />;
      break;
    case "/explore":
      component = <ExplorePage />;
      break;
  }
  // const components = {
  //   Header() {
  //     const { tokens } = All.useTheme();

  //     return (
  //       <All.View textAlign="center" padding={tokens.space.large}>
  //         <All.Image
  //           alt="Amplify logo"
  //           src="https://docs.amplify.aws/assets/logo-dark.svg"
  //         />
  //       </All.View>
  //     );
  //   },

  //   Footer() {
  //     const { tokens } = All.useTheme();

  //     return (
  //       <All.View textAlign="center" padding={tokens.space.large}>
  //         <All.Text color={tokens.colors.neutral[80]}>
  //           &copy; All Rights Reserved
  //         </All.Text>
  //       </All.View>
  //     );
  //   },

  //   SignIn: {
  //     Header() {
  //       const { tokens } = All.useTheme();

  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Sign in to your account
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       const { toResetPassword } = All.useAuthenticator();

  //       return (
  //         <All.View textAlign="center">
  //           <All.Button
  //             fontWeight="normal"
  //             onClick={toResetPassword}
  //             size="small"
  //             variation="link"
  //           >
  //             Reset Password
  //           </All.Button>
  //         </All.View>
  //       );
  //     },
  //   },

  //   SignUp: {
  //     Header() {
  //       const { tokens } = All.useTheme();

  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Create a new account
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       const { toSignIn } = All.useAuthenticator();

  //       return (
  //         <All.View textAlign="center">
  //           <All.Button
  //             fontWeight="normal"
  //             onClick={toSignIn}
  //             size="small"
  //             variation="link"
  //           >
  //             Back to Sign In
  //           </All.Button>
  //         </All.View>
  //       );
  //     },
  //   },
  //   ConfirmSignUp: {
  //     Header() {
  //       const { tokens } = All.useTheme();
  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Enter Information:
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       return <All.Text>Footer Information</All.Text>;
  //     },
  //   },
  //   SetupTOTP: {
  //     Header() {
  //       const { tokens } = All.useTheme();
  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Enter Information:
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       return <All.Text>Footer Information</All.Text>;
  //     },
  //   },
  //   ConfirmSignIn: {
  //     Header() {
  //       const { tokens } = All.useTheme();
  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Enter Information:
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       return <All.Text>Footer Information</All.Text>;
  //     },
  //   },
  //   ResetPassword: {
  //     Header() {
  //       const { tokens } = All.useTheme();
  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Enter Information:
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       return <All.Text>Footer Information</All.Text>;
  //     },
  //   },
  //   ConfirmResetPassword: {
  //     Header() {
  //       const { tokens } = All.useTheme();
  //       return (
  //         <All.Heading
  //           padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //           level={3}
  //         >
  //           Enter Information:
  //         </All.Heading>
  //       );
  //     },
  //     Footer() {
  //       return <All.Text>Footer Information</All.Text>;
  //     },
  //   },
  // };

  // const formFields = {
  //   signIn: {
  //     username: {
  //       labelHidden: false,
  //       placeholder: "Enter your email",
  //     },
  //   },
  //   signUp: {
  //     password: {
  //       labelHidden: false,
  //       label: "Password:",
  //       placeholder: "Enter your Password:",
  //       isRequired: false,
  //       order: 2,
  //     },
  //     confirm_password: {
  //       labelHidden: false,
  //       label: "Confirm Password:",
  //       order: 1,
  //     },
  //   },
  //   forceNewPassword: {
  //     password: {
  //       labelHidden: false,
  //       placeholder: "Enter your Password:",
  //     },
  //   },
  //   resetPassword: {
  //     username: {
  //       labelHidden: false,
  //       placeholder: "Enter your email:",
  //     },
  //   },
  //   confirmResetPassword: {
  //     confirmation_code: {
  //       labelHidden: false,
  //       placeholder: "Enter your Confirmation Code:",
  //       label: "New Label",
  //       isRequired: false,
  //     },
  //     confirm_password: {
  //       labelHidden: false,
  //       placeholder: "Enter your Password Please:",
  //     },
  //   },
  //   setupTOTP: {
  //     QR: {
  //       totpIssuer: "test issuer",
  //       totpUsername: "amplify_qr_test_user",
  //     },
  //     confirmation_code: {
  //       labelHidden: false,
  //       label: "New Label",
  //       placeholder: "Enter your Confirmation Code:",
  //       isRequired: false,
  //     },
  //   },
  //   confirmSignIn: {
  //     confirmation_code: {
  //       labelHidden: false,
  //       label: "New Label",
  //       placeholder: "Enter your Confirmation Code:",
  //       isRequired: false,
  //     },
  //   },
  // };
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
        <div>
          <h1>Hello {user.attributes.name}</h1>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavBarSocialLinks logOut={signOut} />
        </Navbar.Collapse>
      </Navbar>
      {component}
    </div>
  );
}

export default withAuthenticator(App);

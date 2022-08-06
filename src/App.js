// Database

import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getId,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";
// ----- 1. CSS Files ----- //
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ----- 2. Components & Pages ----- //
import NavBarSocialLinks from "./Components/NavBarLinks";
// ----- Pages ----- //
import { FriendContext } from "./friendContext";
import EditAccountPage from "./Pages/EditAccountPage";
import CreatePlaylistPage from "./Pages/CreatePlaylistPage";
import FriendsPage from "./Pages/FriendsPage";
import ViewFriendPage from "./Pages/viewFriend";
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
  // ----- User Data ------ //
  const [friendID, setFriendID] = useState("default");
  const [userID, setUserID] = useState("");
  const registerUser = async () => {
    const q = query(
      collection(db, "Users"),
      where("email", "==", user.attributes.email)
    );
    const querySnapshot = await getDocs(q);
    // If there is already a user with this email do not write them again
    if (querySnapshot.docs.length == 0) {
      const collectionRef = collection(db, "Users");
      const payload = {
        name: user.attributes.name,
        email: user.attributes.email.toLowerCase(),
        username: user.attributes.name.toLowerCase(),
        id: "default",
        pfp: "default",
        bio: "default",
        followers: [],
        following: [],
        movies: [],
        playlists: [],
      };
      const docRef = await addDoc(collectionRef, payload);
      updateDoc(docRef, "id", docRef.id);
      setUserID(docRef.id);
      window.location.href = "/editAccount";
    } else {
      console.log("User already existsss ");
      window.location.href = "/editAccount";
    }
  };
  // ----- Properties ----- //
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <HomePage user={user} docID={userID} />;
      break;
    case "/editAccount":
      component = <EditAccountPage user={user} />;
      break;
    case "/createPlaylist":
      component = <CreatePlaylistPage />;
      break;
    case "/friends":
      component = (
        <FriendContext.Provider value={{ friendID, setFriendID }}>
          <FriendsPage user={user} />
        </FriendContext.Provider>
      );
      break;
    case "/viewFriend":
      component = (
        <FriendContext.Provider value={{ friendID, setFriendID }}>
          <ViewFriendPage friendId={friendID} />
        </FriendContext.Provider>
      );
      break;
    case "/explore":
      component = <ExplorePage />;
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
        <div>
          <h1>Hello {user.attributes.name}</h1>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavBarSocialLinks logOut={signOut} register={registerUser} />
        </Navbar.Collapse>
      </Navbar>
      {component}
    </div>
  );
}

export default withAuthenticator(App);

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
import PlaylistPage from "./Pages/PlaylistPage";
import WatchedPage from "./Pages/WatchedPage";
import FollowersPage from "./Pages/FollowersPage";
import FollowingPage from "./Pages/FollowingPage";
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
import filmistaLogo from "./LogoImg/Filmista-logo.png";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  // ----- User Data ------ //
  const [userID, setUserID] = useState("");
  useEffect(() => {
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
          pfp: "https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1",
          bio: "default",
          followers: [],
          following: [],
          movies: [],
          playlists: [],
        };
        const docRef = await addDoc(collectionRef, payload);
        updateDoc(docRef, "id", docRef.id);
        setUserID(docRef.id);
      } else {
        console.log("User already existsss ");
      }
    };
    registerUser();
  }, []);
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
      component = <CreatePlaylistPage user={user} />;
      break;
    case "/friends":
      component = <FriendsPage user={user} />;
      break;
    case "/viewFriend":
      component = <ViewFriendPage />;
      break;
    case "/viewFollowers":
      component = <FollowersPage />;
      break;
    case "/viewFollowing":
      component = <FollowingPage />;
      break;
    case "/watchedMovies":
      component = <WatchedPage />;
      break;
    case "/playlist":
      component = <PlaylistPage />;
      break;
    case "/explore":
      component = <ExplorePage user={user} />;
      break;
  }
  // ----- Return Statement ----- //
  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        bg="light"
        // className="navigation-bar"
        expand="lg"
      >
        {/* NAVIGATION BAR - BRAND  */}
        <Navbar.Brand className="brand" href="/">
          <img
            alt=""
            src={filmistaLogo}
            width="200"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
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

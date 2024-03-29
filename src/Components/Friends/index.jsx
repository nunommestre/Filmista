import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import Button from "react-bootstrap/Button";
import "./friends.css";
import { ToastAlert } from "../Toast";

const FriendsDisplay = ({ user }) => {
  const [friends, setFriends] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const [searchTerm, setSearch] = useState([]);

  const FetchData = async () => {
    const q = query(
      collection(db, "Users"),
      where("email", "!=", user.attributes.email.toLowerCase())
    );
    onSnapshot(q, (snapshot) =>
      setFriends(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  useEffect(() => {
    FetchData();
  }, []);
  const formSubmission = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "Users"),
      where("username", "==", searchTerm.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    setFriends(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  const searchUpdate = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>Welcome to the Friends Page</h1>
        <p>
          <em>Search for new friends with similar interests by username.</em>
        </p>
        <form onSubmit={formSubmission}>
          <input
            className="friends-search-bar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchUpdate}
          />
        </form>
      </div>
      <div className="friends-grid">
        {friends.map((friend) => (
          <Friend key={friend.id} {...friend} user={user} />
        ))}
      </div>
    </div>
  );
};
export default FriendsDisplay;
const Friend = ({ username, name, bio, id, user, pfp }) => {
  const viewFriend = () => {
    redirect_Page(id);
  };
  return (
    <div className="friend-card">
      <img
        src={pfp}
        alt={name}
        onError={(event) => {
          event.target.src =
            "https://firebasestorage.googleapis.com/v0/b/filmista.appspot.com/o/user.png?alt=media&token=4aeb2856-a05a-42ed-baf1-d6006e776030";
          event.onerror = null;
        }}
      />
      <div className="bio">
        <h6>@{username}</h6>
        <h6>{name}</h6>
        <h6>Bio: </h6>
        <p>{bio}</p>
        <div className="friend-buttons">
          <Button
            variant="danger"
            className="friend-button-left"
            onClick={() => removeFriend(id, user)}
          >
            Unfollow
          </Button>
          <Button
            id="rate-button"
            variant="dark"
            className="friend-button-left"
            onClick={viewFriend}
          >
            View
          </Button>
          <Button
            variant="success"
            className="friend-button-left"
            onClick={() => addFriend(id, user)}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

const addFriend = async (id, user) => {
  const q = query(
    collection(db, "Users"),
    where("email", "==", user.attributes.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    const userDocRef = doc(db, "Users", document.id);
    const UserPayload = { following: arrayUnion(id) };
    updateDoc(userDocRef, UserPayload).then(function () {
      ToastAlert("You started following a new friend!", "success");
    });
    console.log("Check db :)");
    const docRef = doc(db, "Users", id);
    const payload = { followers: arrayUnion(document.id) };
    updateDoc(docRef, payload);
  });
};
const removeFriend = async (id, user) => {
  const q = query(
    collection(db, "Users"),
    where("email", "==", user.attributes.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    const userDocRef = doc(db, "Users", document.id);
    const UserPayload = { following: arrayRemove(id) };
    updateDoc(userDocRef, UserPayload).then(function () {
      ToastAlert("Successfully unfollowed", "success");
    });
    console.log("Check db :)");
    const docRef = doc(db, "Users", id);
    const payload = { followers: arrayRemove(document.id) };
    updateDoc(docRef, payload);
  });
};
let redirect_Page = (id) => {
  let tID = setTimeout(function () {
    window.location.href = "/viewFriend?id=" + id;
    window.clearTimeout(tID); // clear time out.
  }, 1500);
};

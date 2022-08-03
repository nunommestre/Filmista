/*
This video helped with pulling in API Data and some styling: https://www.youtube.com/watch?v=sZ0bZGfg_m4&t=1182s
*/
import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import Button from "react-bootstrap/Button";
import "./friends.css"

// ----- 1. API's ----- //
const SEARCH_API =
  "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
const TOPRATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";

const FriendsDisplay = () => {
  const [friends, setFriends] = useState([{ name: "Loading...", id: "initial" }]);
  useEffect(
    () =>
      onSnapshot(collection(db, "Users"), (snapshot) =>
        setFriends(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>Welcome to the Friends Page</h1>
        <p>
          <em>Search for new friends with similar interests!</em>
        </p>
        <form>
          <input
            className="friends-search-bar"
            type="text"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className="friends-grid">
      {friends.map((friend) => (
            <Friend key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
};
export default FriendsDisplay;
const Friend = ({ name, bio, poster_path}) => {
  return (
    <div className="friend-card">
      <img src="https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1" alt={name} />
      <div className="bio">
        <h6>{name}</h6>
        <h6>Bio: </h6>
        <p>
          {bio}
        </p>
        <div className="friend-buttons">
          <Button variant="danger" className="friend-button-left">
            Remove
          </Button>
          <Button variant="success" className="friend-button-left">
           Add
          </Button>
        </div>
      </div>
    </div>
  );
};

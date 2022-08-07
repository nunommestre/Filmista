import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getId,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase";
import React, { useEffect, useState } from "react";
import { Movie } from "../Components/Movie";
import "./CSS/HomePage.css";
import { Image } from "react-bootstrap";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

const ViewFriendPage = () => {
  // ----- Return Statement ----- //
  const [real_name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const FetchData = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);
    const q = query(collection(db, "Users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setName(document.data().name);
      setUsername(document.data().username);
      setBio(document.data().bio);
      setPfp(document.data().pfp);
      setFollowers(document.data().followers.length)
      setFollowing(document.data().following.length)
      setMovieCount(document.data().movies.length)
      console.log(document.data().id);
    });
  };
  FetchData();
  return (
    <div className="home-page">
      <div className="home-header">
        <Image
          className="profile-picture"
          src={pfp}
          alt="pfp"
        />
        <h1>{"@" + username}</h1>
        <h1>{real_name}</h1>
        <p>
          <em>{bio}</em>
        </p>
      </div>
      <div className="row stats-bar">
        <div className="col-sm-4 stat-section">
          <h3>Movies Watched</h3>
          <h3>{movieCount}</h3>
        </div>
        <div className="col-sm-4 stat-section">
          <h3>Followers</h3>
          <h3>{followers}</h3>
        </div>
        <div className="col-sm-4 stat-section">
          <h3>Following</h3>
          <h3>{following}</h3>
        </div>
      </div>
      <h3>Playlists</h3>
      <div className="playlist-grid">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />

      </div>
    </div>
  );
};

export default ViewFriendPage;

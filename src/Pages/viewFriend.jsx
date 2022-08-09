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
  const [id, setID] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  let redirect_Page = (id) => {
    let tID = setTimeout(function () {
      window.location.href = "/viewFollowers?id=" + id;
      window.clearTimeout(tID); // clear time out.
    }, 1500);
  };
  let redirect_Page_Following = (id) => {
    let tID = setTimeout(function () {
      window.location.href = "/viewFollowing?id=" + id;
      window.clearTimeout(tID); // clear time out.
    }, 1500);
  };
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
      setID(document.data().id);
      setFollowers(document.data().followers.length);
      setFollowing(document.data().following.length);
      setMovieCount(document.data().movies.length);
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
          onError={(event) => {
            event.target.src =
              "https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1";
            event.onerror = null;
          }}
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
        <a onClick={() => redirect_Page(id) }><h3>Followers</h3></a>
          <h3>{followers}</h3>
        </div>
        <div className="col-sm-4 stat-section">
        <a onClick={() => redirect_Page_Following(id) }><h3>Following</h3></a>
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

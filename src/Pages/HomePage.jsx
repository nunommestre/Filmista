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

const HomePage = ({ user, docID }) => {
  // ----- Return Statement ----- //
  const [isRegistered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const FetchData = async () => {
    const q = query(
      collection(db, "Users"),
      where("email", "==", user.attributes.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setUsername(document.data().name)
        setBio(document.data().bio)
        setRegistered(true);
      });
  };
  FetchData();
  return (
    <div className="home-page">
      <div className="home-header">
        <Image
          className="profile-picture"
          src="https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1"
          alt="pfp"
        />
        <h1>{isRegistered ? username : user.attributes.name}</h1>
        <p>
          <em>
            {isRegistered ? bio : "Tap the empty image icon or go to Edit Account under Account to get started!"}
          </em>
        </p>
      </div>
      <div className="row stats-bar">
        <div className="col-sm-4 stat-section">
          <h3>Movies Watched</h3>
          <h3>100</h3>
        </div>
        <div className="col-sm-4 stat-section">
          <h3>Followers</h3>
          <h3>100</h3>
        </div>
        <div className="col-sm-4 stat-section">
          <h3>Following</h3>
          <h3>100</h3>
        </div>
      </div>
      <h3>Top Movies</h3>
      <div className="row movie-bar">
        <div className="col-sm-4 stat-section">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
        </div>
        <div className="col-sm-4 stat-section">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
        </div>
        <div className="col-sm-4 stat-section">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
        </div>
      </div>
      <h3>Playlists</h3>
      <div className="row movie-bar">
        <div className="col-sm-4 stat-section">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
        </div>
        <div className="col-sm-4 stat-section">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
        </div>
        <div className="col-sm-4 stat-section">
          <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

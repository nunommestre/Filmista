import {
    onSnapshot,
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    arrayUnion,
    addDoc,
  } from "firebase/firestore";
  import React, { useContext, useEffect, useState } from "react";
  import db from "../../firebase";
  import Button from "react-bootstrap/Button";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from "@fortawesome/free-solid-svg-icons";
  import "../Friends/friends.css";
  import { ToastAlert } from "../Toast";
  
  // ----- 1. API's ----- //
  const SEARCH_API =
    "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
  const TOPRATED_API =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
  const IMAGE_API = "https://image.tmdb.org/t/p/w500";
  
  const PlaylistDisplay = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const [idArray, setIDArray] = useState([{ id: "initial"}, ]);
    const [playlist_name, setPlaylistName] = useState("");
    const [friends, setFriends] = useState([]);
    const [userID, setUserID] = useState("");
    const [real_name, setRealName] = useState("");

    const FetchData = async () => {
        const q = query(
          collection(db, "Playlists"),
          where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            setUserID(document.data().user_id)
            setPlaylistName(document.data().name);
            for(let i = 0; i < document.data().movies.length; ++i){     
                const q = query(
                    collection(db, "Movies"),
                    where("id", "==", document.data().movies[i])
                    );
                    onSnapshot(q, (snapshot) =>
                    setFriends((friends) => [...friends, {...snapshot.docs[0].data(), id: snapshot.docs[0].data().id }])
                    )
            }
      });
    };
    const getData = () => {
      const qu = query(
        collection(db, "Users"),
        where("id", "==", userID)
      );
      onSnapshot(qu, (snapshot) =>
      setRealName("author: " + snapshot.docs[0].data().name))
    }
    useEffect(() => {
        FetchData();
    }, []);

    return (
      <div className="friends-page">
        <div className="friends-header">
          <h1>{playlist_name} <FontAwesomeIcon icon={faChevronDown} onClick={getData} className="nav-icon" /></h1>
          <h1>{real_name}</h1>
        </div>
        <div className="friends-grid">
          {friends.map((friend) => (
            <Friend key={friend.id} {...friend} pfp={friend.poster} name={friend.title}/>
          ))}
        </div>
      </div>
    );
  };
  export default PlaylistDisplay;
  const Friend = ({ username, name, bio, id, pfp }) => {
    return (
      <div className="friend-card">
        <img
          src={IMAGE_API + pfp}
          alt={name}
          onError={(event) => {
            event.target.src =
              "https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1";
            event.onerror = null;
          }}
        />
        <div className="bio">
          <h6>{name}</h6>
          <div className="friend-buttons">
        </div>
        </div>
      </div>
    );
  };
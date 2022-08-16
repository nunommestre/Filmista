import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../Friends/friends.css";

// ----- 1. API's ----- //
const IMAGE_API = "https://image.tmdb.org/t/p/w500";

const PlaylistDisplay = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const [playlist_name, setPlaylistName] = useState("");
  const [movies, setMovies] = useState([]);
  const [userID, setUserID] = useState("");
  const [real_name, setRealName] = useState("");

  const FetchData = async () => {
    const q = query(collection(db, "Playlists"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setUserID(document.data().user_id);
      setPlaylistName(document.data().name);
      for (let i = 0; i < document.data().movies.length; ++i) {
        const q = query(
          collection(db, "Movies"),
          where("id", "==", document.data().movies[i])
        );
        onSnapshot(q, (snapshot) =>
          setMovies((movies) => [
            ...movies,
            { ...snapshot.docs[0].data(), id: snapshot.docs[0].data().id },
          ])
        );
      }
    });
  };
  const getData = () => {
    const qu = query(collection(db, "Users"), where("id", "==", userID));
    onSnapshot(qu, (snapshot) =>
      setRealName("author: " + snapshot.docs[0].data().name)
    );
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>
          {playlist_name}{" "}
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={getData}
            className="nav-icon"
          />
        </h1>
        <h1>{real_name}</h1>
      </div>
      <div className="friends-grid">
        {movies.map((movie) => (
          <Friend
            key={movie.id}
            {...movie}
            pfp={movie.poster}
            name={movie.title}
          />
        ))}
      </div>
    </div>
  );
};
export default PlaylistDisplay;
const Friend = ({ name, pfp }) => {
  return (
    <div className="friend-card">
      <img
        src={IMAGE_API + pfp}
        alt={name}
        onError={(e) => {
          e.target.src =
            "https://firebasestorage.googleapis.com/v0/b/filmista.appspot.com/o/movieeeeeeee.png?alt=media&token=b692fae8-702b-4f6c-925a-cc391dde2cd1";
          e.onerror = null;
        }}
      />
      <div className="bio">
        <h6>{name}</h6>
        <div className="friend-buttons"></div>
      </div>
    </div>
  );
};

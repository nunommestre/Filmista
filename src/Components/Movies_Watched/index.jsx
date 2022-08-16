import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import "../Friends/friends.css";

// ----- 1. API's ----- //

const WatchedDisplay = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const [movies, setMovies] = useState([]);
  const [real_name, setRealName] = useState("");
  const FetchData = async () => {
    const q = query(collection(db, "Users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setRealName(document.data().name);
      for (let i = 0; i < document.data().movies.length; ++i) {
        const q = query(
          collection(db, "Ratings"),
          where("movie_id", "==", document.data().movies[i]),
          where("user_id", "==", id),
          orderBy("timestamp", "desc")
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
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>{real_name + "'s"}</h1>
        <h1>Movies Watched</h1>
      </div>
      <div className="friends-grid">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
export default WatchedDisplay;
const Movie = ({ rate, title, comment, id, cover }) => {
  return (
    <div className="friend-card">
      <img
        src={cover}
        alt={"no cover picture"}
        onError={(e) => {
          e.target.src =
            "https://firebasestorage.googleapis.com/v0/b/filmista.appspot.com/o/movieeeeeeee.png?alt=media&token=b692fae8-702b-4f6c-925a-cc391dde2cd1";
          e.onerror = null;
        }}
      />
      <div className="bio">
        <h6>{title}</h6>
        <h6>
          {" "}
          Rating: <span>{rate}</span>
        </h6>
        <h6>Comment: </h6>
        <p>{comment}</p>
        <div className="friend-buttons"></div>
      </div>
    </div>
  );
};

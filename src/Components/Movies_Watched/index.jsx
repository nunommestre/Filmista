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
  import React, { useContext, useEffect, useState } from "react";
  import db from "../../firebase";
  import Button from "react-bootstrap/Button";
  import "../Friends/friends.css";
  import { ToastAlert } from "../Toast";
  
  // ----- 1. API's ----- //
  const SEARCH_API =
    "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
  const TOPRATED_API =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
  const IMAGE_API = "https://image.tmdb.org/t/p/w500";
  
  const WatchedDisplay = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const [idArray, setIDArray] = useState([{ id: "initial"}, ]);
    const [friends, setFriends] = useState([]);
    const [real_name, setRealName] = useState("");
    const FetchData = async () => {
        const q = query(
          collection(db, "Users"),
          where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          setRealName(document.data().name)
            for(let i = 0; i < document.data().movies.length; ++i){     
                const q = query(
                    collection(db, "Ratings"),
                    where("movie_id", "==", document.data().movies[i]), where("user_id", "==", id)
                    );
                    onSnapshot(q, (snapshot) =>
                    setFriends((friends) => [...friends, {...snapshot.docs[0].data(), id: snapshot.docs[0].data().id }])
                    )
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
          {friends.map((friend) => (
            <Movie key={friend.id} {...friend} />
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
          onError={(event) => {
            event.target.src =
              "https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1";
            event.onerror = null;
          }}
        />
        <div className="bio">
          <h6>{title}</h6>
          <h6> Rating: <span>{rate}</span></h6>
          <h6>Comment: </h6>
          <p>{comment}</p>
          <div className="friend-buttons">
        </div>
        </div>
      </div>
    );
  };
  let redirect_Page = () => {
    let tID = setTimeout(function () {
      window.location.href = "/explore";
      window.clearTimeout(tID); // clear time out.
    }, 1500);
  };
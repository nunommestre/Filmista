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
  
  const FollowersDisplay = () => {
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
            for(let i = 0; i < document.data().followers.length; ++i){   
                const q = query(
                    collection(db, "Users"),
                    where("id", "==", document.data().followers[i])
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
          <h1>Followers</h1>
        </div>
        <div className="friends-grid">
          {friends.map((friend) => (
            <Friend key={friend.id} {...friend} />
          ))}
        </div>
      </div>
    );
  };
  export default FollowersDisplay;
  const Friend = ({ username, name, bio, id, pfp }) => {
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
          id="rate-button"
            variant="dark"
            className="friend-button-left"
            onClick={viewFriend}
          >
            View
          </Button>
        </div>
        </div>
      </div>
    );
  };
  let redirect_Page = (id) => {
    let tID = setTimeout(function () {
      window.location.href = "/viewFriend?id=" + id;
      window.clearTimeout(tID); // clear time out.
    }, 1500);
  };
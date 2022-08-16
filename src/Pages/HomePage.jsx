import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
import React, { useEffect, useState } from "react";
import "./CSS/HomePage.css";
import { Image, Button } from "react-bootstrap";

const HomePage = ({ user }) => {
  // ----- Return Statement ----- //
  const [isRegistered, setRegistered] = useState(false);
  const [real_name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");
  const [id, setID] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [movies, setMovies] = useState([]);
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
  let redirect_Page_Movies = (id) => {
    let tID = setTimeout(function () {
      window.location.href = "/watchedMovies?id=" + id;
      window.clearTimeout(tID); // clear time out.
    }, 1500);
  };
  useEffect(() => {
    const FetchUserDetails = async () => {
      const q = query(
        collection(db, "Users"),
        where("email", "==", user.attributes.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length != 0) {
        querySnapshot.forEach((document) => {
          setName(document.data().name);
          setUsername(document.data().username);
          setBio(document.data().bio);
          setPfp(document.data().pfp);
          setID(document.data().id);
          setFollowers(document.data().followers.length);
          setFollowing(document.data().following.length);
          setMovieCount(document.data().movies.length);
          setRegistered(true);
        });
      }
    };
    FetchUserDetails();
    const FetchData = async () => {
      const q = query(
        collection(db, "Users"),
        where("email", "==", user.attributes.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        for (let i = 0; i < document.data().playlists.length; ++i) {
          const q = query(
            collection(db, "Playlists"),
            where("id", "==", document.data().playlists[i])
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
    FetchData();
  }, []);
  const Playlist = ({ name, id, pfp }) => {
    let redirect_Playlist = () => {
      let tID = setTimeout(function () {
        window.location.href = "/playlist?id=" + id;
        window.clearTimeout(tID); // clear time out.
      }, 1500);
    };
    return (
      <div className="friend-card">
        <img
          src={pfp}
          alt={name}
          onError={(e) => {
            e.target.src =
              "https://firebasestorage.googleapis.com/v0/b/filmista.appspot.com/o/movieeeeeeee.png?alt=media&token=b692fae8-702b-4f6c-925a-cc391dde2cd1";
            e.onerror = null;
          }}
        />
        <div className="bio">
          <h6>{name}</h6>
          <div className="friend-buttons">
            <Button
              id="rate-button"
              variant="dark"
              className="center-button"
              onClick={redirect_Playlist}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="home-page">
      <div className="home-header">
        <Image
          className="profile-picture"
          src={pfp}
          alt="pfp"
          onError={(event) => {
            event.target.src =
              "https://firebasestorage.googleapis.com/v0/b/filmista.appspot.com/o/user.png?alt=media&token=4aeb2856-a05a-42ed-baf1-d6006e776030";
            event.onerror = null;
          }}
        />
        <h1>
          {isRegistered ? "@" + username : "@" + user.attributes.username}
        </h1>
        <h1>{isRegistered ? real_name : user.attributes.name}</h1>
        <p>
          <em>
            {isRegistered
              ? bio
              : "Tap the empty image icon or go to Edit Account under Account to get started!"}
          </em>
        </p>
      </div>
      <div className="row stats-bar">
        <div className="col-sm-4 stat-section">
          <Button
            variant="dark"
            className="account-button"
            onClick={() => redirect_Page_Movies(id)}
          >
            Movies Watched
          </Button>
          <h3>{movieCount}</h3>
        </div>
        <div className="col-sm-4 stat-section">
          <Button
            variant="dark"
            className="account-button"
            onClick={() => redirect_Page(id)}
          >
            Followers
          </Button>
          <h3>{followers}</h3>
        </div>
        <div className="col-sm-4 stat-section">
          <Button
            variant="dark"
            className="account-button"
            onClick={() => redirect_Page_Following(id)}
          >
            Following
          </Button>
          <h3>{following}</h3>
        </div>
      </div>
      <h3>Playlists</h3>
      <div className="playlist-grid">
        {movies.map((movie) => (
          <Playlist key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

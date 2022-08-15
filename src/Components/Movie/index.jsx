/*
This video helped with pulling in API Data and some styling: https://www.youtube.com/watch?v=sZ0bZGfg_m4&t=1182s
*/
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getId,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot
} from "firebase/firestore";
import db from "../../firebase";

import React, { useEffect, useState } from "react";
import { ToastAlert } from "../Toast";
import Button from "react-bootstrap/Button";
import "./styles.css";

// ----- 1. API's ----- //
const SEARCH_API =
  "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
const TOPRATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";

const MovieDisplay = (userID) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearch] = useState([]);
  useEffect(() => {
    fetch(TOPRATED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);
  const formSubmission = (e) => {
    e.preventDefault();
    fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };
  const searchUpdate = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="explore-page">
      <div className="page-header">
        <h1>Welcome to the Explore Page</h1>
        <p>
          <em>
            Search for your favorite movies, rank them, share them to your
            favorite playlist, or click view more to see more information! Movie
            rating may requires a double click if stalled.
          </em>
        </p>
        <form onSubmit={formSubmission}>
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchUpdate}
          />
        </form>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} userID={userID["userID"]} />
        ))}
      </div>
    </div>
  );
};
export default MovieDisplay;
const Movie = ({ title, poster_path, overview, vote_average, id, userID}) => {
  const [rateStatus, setRateStatus] = useState(["movie-rank-hidden"]);
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [ratingID, setRatingID] = useState("");
  const [UIrate, setUIRate] = useState("");
  const [currentRater, setCurrentRater] = useState("");
  const [playlists, setPlaylists] = useState([]);

  // It's not getting user ID easy fix
  const showPlaylists = () => {
    const q = query(
      collection(db, "Playlists"),
      where("user_id", "==", userID)
      );
      onSnapshot(q, (snapshot) =>
      setPlaylists(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
      console.log(playlists)
    }
  const storeMovie = async () => {
    const q = query(collection(db, "Movies"), where("tmbd_id", "==", id));
    const querySnapshot = await getDocs(q);
    // If there is already a user with this email do not write them again
    if (querySnapshot.docs.length == 0) {
      const collectionRef = collection(db, "Movies");
      const payload = {
        title: title,
        description: overview,
        tmbd_rate: vote_average,
        poster: poster_path,
        tmbd_id: id,
        ratings: [],
        id: "default",
      };
      const docRef = await addDoc(collectionRef, payload);
      updateDoc(docRef, "id", docRef.id);
      createRating();
      // hideRateScreen();
    } else {
      console.log("Movie already exists in the db");
    }
  };
  const createRating = async () => {
    const q = query(collection(db, "Movies"), where("tmbd_id", "==", id));
    const querySnapshot = await getDocs(q);
    // If there is already a user with this email do not write them again
    if (querySnapshot.docs.length == 0) {
      ToastAlert(title + " has never been ranked so it is not in our database. Click Rate again to confirm your rating.", "warning");
      console.log("Movie not in db");
    } else {
      const collectionRef = collection(db, "Ratings");
      const payload = {
        rate: rate,
        comment: comment,
        user_id: userID,
        id: "default",
        movie_id: querySnapshot.docs[0].data().id,
        cover: IMAGE_API + poster_path,
        title: title
      };
      const rateRef = await addDoc(collectionRef, payload);
      updateDoc(rateRef, "id", rateRef.id);
      setRatingID(rateRef.id);
      const userDocRef = doc(db, "Users", userID);
      const UserPayload = { movies: arrayUnion(querySnapshot.docs[0].data().id) };
      updateDoc(userDocRef, UserPayload);
      ToastAlert("Successfuly rated: " + title, "success");
      console.log("Check db :)");
      hideRateScreen();
    }
  };
  
  
  const rateMovie = () => {
    storeMovie();
    createRating();
  };
  const hideRateScreen = () => {
    setRateStatus("movie-rank-hidden");
  };
  const PlaylistButton = ({name}) => {
    const hidePlaylistScreen = () => {
      setPlaylists([]);
    };
    return(
      <Button
      variant="danger"
      className="movie-button"
      onClick={hidePlaylistScreen}
      >
              {name}
            </Button>
  )
};
return (
  <div className="movie-card">
      <img src={IMAGE_API + poster_path} alt={title} />
      <div className="overview">
        <h6>{"Title: " + title}</h6>
        <h6>
          Rating: <span>{vote_average}</span>
        </h6>
        <h6>Description:</h6>
        <p>{overview}</p>
        <div className="movie-buttons">
          <Button
            variant="dark"
            className="movie-button"
            onClick={() => setRateStatus("movie-rank")}
            >
            Rate Movie
          </Button>
          <Button variant="dark" className="movie-button" onClick={showPlaylists}>
            Add to Playlist
          </Button>
              {playlists.map((playlist) => (
                <PlaylistButton key={playlist.id} {...playlist} />
                ))}
        </div>
      </div>
      <div className={rateStatus}>
        <h6>Rate (#1-10):</h6>
        <input
          className="rating-bar"
          type="text"
          defaultValue={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Rating..."
          />
        <h6>Comment: </h6>
        <textarea
          rows="4"
          cols="20"
          name="comment"
          defaultValue={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comments..."
          ></textarea>
        <div className="movie-buttons">
          <Button
            variant="danger"
            className="movie-button"
            onClick={rateMovie}
            >
            Rate
          </Button>
          <Button
            variant="danger"
            className="movie-button"
            onClick={hideRateScreen}
            >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
export { Movie };
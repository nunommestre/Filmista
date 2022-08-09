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
  arrayUnion
} from "firebase/firestore";
import db from "../../firebase";

import React, { useEffect, useState } from "react";
import { ToastAlert } from "../Toast";
import Button from 'react-bootstrap/Button';
import "./styles.css";

// ----- 1. API's ----- //
const SEARCH_API =
  "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
  const TOPRATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
  const IMAGE_API = "https://image.tmdb.org/t/p/w500"
  
  
  const MovieDisplay = (userID) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearch] = useState([]);
    useEffect(() => {
      console.log(userID["userID"])
      fetch(TOPRATED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
    });
  }, []);
  const formSubmission = (e) => {
    e.preventDefault();
    fetch(SEARCH_API + searchTerm)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
        <p><em>Search for your favorite movies, rank them, share them to your favorite playlist, or click view more to see more information!</em></p>
        <form onSubmit={formSubmission}>
        <input className="search-bar" type="text" placeholder="Search..." value={searchTerm} onChange={searchUpdate}/>
        </form>
        </div>
    <div className="movie-grid">
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} userID={userID["userID"]}/>
        ))}
    </div>
    </div>
  );
};
export default MovieDisplay;
const Movie = ({ title, poster_path, overview, vote_average, id, userID } ) => {
  const [rateStatus, setRateStatus] = useState(["movie-rank-hidden"]);
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [ratingID, setRatingID] = useState("");
  const [UIrate, setUIRate] = useState("");
    const seeRate = async () => {
    const q = query(
      collection(db, "Ratings"),
      where("movie_id", "==", id)
      );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      if (document.data().user_id == userID){
        console.log("trying")
        setUIRate(document.data().rate);
      }
    });
  }
  seeRate();

  const storeMovie = async () => {
    const q = query(
      collection(db, "Movies"),
      where("tmbd_id", "==", id)
      );
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
        id: "default"
      };
      const docRef = await addDoc(collectionRef, payload);
      updateDoc(docRef, "id", docRef.id);
      createRating();
      // hideRateScreen();
    } else {
      console.log("Movie already exists in the db");
      createRating();
    }
  }
  const createRating = async () => {
    const q = query(
      collection(db, "Movies"),
      where("tmbd_id", "==", id)
      );
      const querySnapshot = await getDocs(q);
      // If there is already a user with this email do not write them again
    if (querySnapshot.docs.length == 0) {
      console.log("Movie not in db");
    } else {
      const collectionRef = collection(db, "Ratings");
      const payload = {
        rate: rate,
        comment: comment,
        user_id: userID,
        id: "default",
        movie_id: id,
      };
      const rateRef = await addDoc(collectionRef, payload);
      updateDoc(rateRef, "id", rateRef.id);
      setRatingID(rateRef.id);
    }
  }
  const linkRating = async () => {
    const q = query(
      collection(db, "Movies"),
      where("tmbd_id", "==", id)
      );
      const querySnapshot = await getDocs(q);
      // If there is already a user with this email do not write them again
    querySnapshot.forEach((document) => {
      const userDocRef = doc(db, "Movies", document.id);
      const UserPayload = { ratings: arrayUnion(ratingID) };
      updateDoc(userDocRef, UserPayload).then(function () {
        ToastAlert("You rated" + title, "success");
        
      });
      console.log("Check db :)");
      hideRateScreen();
    });
  }
  const rateMovie = () => {
    storeMovie();
    linkRating();
  };
  const hideRateScreen = () => {
    setRateStatus("movie-rank-hidden");
  }
  return (
    <div className="movie-card">
      <img src= {IMAGE_API + poster_path} alt={title} />
      <div className="overview">
          <h6>{"Title: " + title}</h6>
          <h6>Rating:  <span>{vote_average}</span></h6>
          <h6>Your Rating:  <span>{UIrate}</span></h6>
          <h6>Description:</h6>
          <p>{overview}</p>
          <div className="movie-buttons">
          <Button variant="primary" className="movie-button" onClick={() => setRateStatus("movie-rank")}>Rate Movie</Button>
          <Button variant="primary" className="movie-button">Add to Playlist</Button>
          <Button variant="warning" className="movie-button">View More</Button>
          </div>
      </div>
      <div className={rateStatus}>
      <h6>Rate (#1-10):</h6>
        <input className="rating-bar" type="text" defaultValue={rate}
            onChange={(e) => setRate(e.target.value)}placeholder="Rating..."/>
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
        <Button variant="warning" className="movie-button" onClick={rateMovie}>Rate</Button>
        <Button variant="danger" className="movie-button" onClick={hideRateScreen}>Back</Button>
        </div>
      </div>
    </div>
  );
};
export {Movie};

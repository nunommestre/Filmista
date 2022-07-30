/*
This video helped with pulling in API Data and some styling: https://www.youtube.com/watch?v=sZ0bZGfg_m4&t=1182s
*/

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./friends.css"

// ----- 1. API's ----- //
const SEARCH_API =
  "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
const TOPRATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";

const FriendsDisplay = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearch] = useState([]);
  useEffect(() => {
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
    <div className="friends-page">
      <div className="friends-header">
        <h1>Welcome to the Friends Page</h1>
        <p>
          <em>Search for new friends with similar interests!</em>
        </p>
        <form onSubmit={formSubmission}>
          <input
            className="friends-search-bar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchUpdate}
          />
        </form>
      </div>
      <div className="friends-grid">
        {movies.map((movie) => (
          <Friend key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
export default FriendsDisplay;
const Friend = ({ title, poster_path}) => {
  return (
    <div className="friend-card">
      <img src={IMAGE_API + poster_path} alt={title} />
      <div className="bio">
        <h6>{"Title: Friend Name"}</h6>
        <h6>Bio: </h6>
        <p>
          A short description set by each use that we will access from their bio
          here for others to see!
        </p>
        <div className="friend-buttons">
          <Button variant="danger" className="friend-button-left">
            Remove
          </Button>
          <Button variant="success" className="friend-button-left">
           Add
          </Button>
        </div>
      </div>
    </div>
  );
};

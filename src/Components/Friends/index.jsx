
/*
This video helped with pulling in API Data and some styling: https://www.youtube.com/watch?v=sZ0bZGfg_m4&t=1182s
*/

import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./styles.css";

// ----- 1. API's ----- //
const SEARCH_API =
  "https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=";
const TOPRATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
const IMAGE_API = "https://image.tmdb.org/t/p/w500"

const MovieDisplay = () => {
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
      <div className="explore-page">
          <div className="page-header">
          <h1>Welcome to the Friends Page</h1>
          <p><em>Search for new friends with similar interests!</em></p>
          <form onSubmit={formSubmission}>
          <input className="search-bar" type="text" placeholder="Search..." value={searchTerm} onChange={searchUpdate}/>
          </form>
          </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
          ))}
      </div>
      </div>
    );
  };
  export default MovieDisplay;
  const Movie = ({ title, poster_path, overview, vote_average }) => {
    const [rateStatus, setRateStatus] = useState(["movie-rank-hidden"]);
    const rateMovie = () => {
      setRateStatus("movie-rank");
    }
    const hideRateScreen = () => {
      setRateStatus("movie-rank-hidden");
    }
    return (
      <div className="movie-card">
        <img src= {IMAGE_API + poster_path} alt={title} />
        <div className="overview">
            <h6>{"Title: " + title}</h6>
            <h6>Rating:  <span>{vote_average}</span></h6>
            <h6>Your Rating:  <span>N/A</span></h6>
            <h6>Description:</h6>
            <p>{overview}</p>
            <div className="movie-buttons">
            <Button variant="primary" className="movie-button" onClick={rateMovie}>Rate Movie</Button>
            <Button variant="primary" className="movie-button">Add to Playlist</Button>
            <Button variant="warning" className="movie-button">View More</Button>
            </div>
        </div>
        <div className={rateStatus}>
        <h6>Rate:</h6>
          <input className="rating-bar" type="number" placeholder="Rating..."/>
        <h6>Comment: </h6>
          <input className="comment-field" type="number" placeholder="Comments..."/>
          <div className="movie-buttons">
          <Button variant="warning" className="movie-button" onClick={hideRateScreen}>Rate</Button>
          <Button variant="danger" className="movie-button" onClick={hideRateScreen}>Back</Button>
          </div>
        </div>
      </div>
    );
  };

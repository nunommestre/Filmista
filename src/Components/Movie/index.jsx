// Top Rated for initial display: https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1
// Movie Image: https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=3989b90b8172707d9d75a1196763d35c
// Search Anything: https://api.themoviedb.org/3/search/multi?&api_key=3989b90b8172707d9d75a1196763d35c&language=en-US&page=1&query=
import React, { useEffect, useState } from "react";

const TOPRATED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=3989b90b8172707d9d75a1196763d35c&page=1";
const IMAGE_API = "https://image.tmdb.org/t/p/w500"
const MovieDisplay = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(TOPRATED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);
  const Movie = ({ title, poster_path, description, rating }) => {
    return (
      <div>
        <img src={IMAGE_API + poster_path} alt={title} />
      </div>
    );
  };
  return (
    <div>
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default MovieDisplay;

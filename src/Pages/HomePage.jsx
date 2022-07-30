import React from "react";
import "./CSS/HomePage.css"
import { Image } from "react-bootstrap";
const HomePage = () => {
  // ----- Return Statement ----- //
  return (
    <div className="home-page">
    <div className="home-header">
    <img thumbnail="true" src="../../Images/pfp.jpg" alt="pfp" />
    <h1>Professor Snape</h1>
    <p><em>I love harry potter movies!</em></p>
    </div>
</div>
  );
}

export default HomePage;

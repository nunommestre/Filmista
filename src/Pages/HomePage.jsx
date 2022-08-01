import React from "react";
import { Movie } from "../Components/Movie";
import "./CSS/HomePage.css"
import { Button, Image } from "react-bootstrap";
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";
const HomePage = () => {
  // ----- Return Statement ----- //
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <div className="home-page">
      <Button onClick={signOut}></Button>
    <div className="home-header">
    <Image className="profile-picture" src="https://img.ecelebrityfacts.com/wp-content/uploads/2016/08/elon-musk-3067-30988-1471258987.jpg" alt="pfp" />
    <h1>Welcome to Filmista!</h1>
    <p><em>Tap the empty image icon or go to "Edit Account" under Account to get started!</em></p>
    </div>
    <div className="row stats-bar">
      <div className="col-sm-4 stat-section">
        <h3>Movies Watched</h3>
        <h3>100</h3>
      </div>
      <div className="col-sm-4 stat-section">
      <h3>Followers</h3>
      <h3>100</h3>
      </div>
      <div className="col-sm-4 stat-section">
      <h3>Following</h3>
      <h3>100</h3>
      </div>
    </div>
    <h3>Top Movies</h3>
    <div className="row movie-bar">
      <div className="col-sm-4 stat-section">
        <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"/>
      </div>
      <div className="col-sm-4 stat-section">
      <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"/>
      </div>
      <div className="col-sm-4 stat-section">
      <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"/>
      </div>
    </div>
    <h3>Playlists</h3>
    <div className="row movie-bar">
      <div className="col-sm-4 stat-section">
        <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"/>
      </div>
      <div className="col-sm-4 stat-section">
      <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"/>
      </div>
      <div className="col-sm-4 stat-section">
      <Movie poster_path="/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"/>
      </div>
    </div>
</div>
  );
}

export default HomePage;

import React from "react";
import "./CSS/createPlaylist.css"
import{ Button } from "react-bootstrap";

const CreatePlaylistPage = () => {
  // ----- Return Statement ----- //
  return (
    <div className="create-playlist-page">
    <div>
    <h1>Create Playlist: </h1>
    <h3>Name: </h3>
     <input className="name-bar" type="text" placeholder="Name..."/>
    <h3>Cover Picture: </h3>
    <input className="name-bar" type="file"/>
  </div>
    <Button variant="light" className="creation-button">CREATE</Button>
    <Button variant="danger" className="cancel-button">Cancel</Button>
  </div>
  );
};

export default CreatePlaylistPage;

import React from "react";
import Button from "react-bootstrap/Button";
import "../Friends/friends.css";

const FollowingDisplay = ({ friendsArray, real_name }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>{real_name + "'s"}</h1>
        <h1>Following</h1>
      </div>
      <div className="friends-grid">
        {friendsArray.map((friend) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
};
export default FollowingDisplay;
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

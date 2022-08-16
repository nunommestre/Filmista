import React from "react";
import FriendsDisplay from "../Components/Friends";

const FriendsPage = ({ user }) => {
  return (
    <div>
      <FriendsDisplay user={user} />
    </div>
  );
};

export default FriendsPage;

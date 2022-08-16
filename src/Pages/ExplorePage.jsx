import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase";

import React, { useEffect, useState } from "react";
import MovieDisplay from "../Components/Movie";

const ExplorePage = ({ user }) => {
  // ----- Return Statement ----- //
  const [userID, setUserID] = useState("");
  const FetchData = async () => {
    const q = query(
      collection(db, "Users"),
      where("email", "==", user.attributes.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setUserID(document.data().id);
    });
  };

  useEffect(() => {
    FetchData();
    console.log(userID);
  }, []);
  return <MovieDisplay userID={userID} />;
};

export default ExplorePage;

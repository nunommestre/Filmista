import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../firebase";
import React from "react";
import FollowingDisplay from "../Components/Following";
import { useEffect } from "react";
import { useState } from "react";

const FollowingPage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const [real_name, setRealName] = useState("");
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      const q = query(collection(db, "Users"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        setRealName(document.data().name);
        for (let i = 0; i < document.data().following.length; ++i) {
          const q = query(
            collection(db, "Users"),
            where("id", "==", document.data().following[i])
          );
          if (friends.length <= document.data().following.length) {
            onSnapshot(q, (snapshot) =>
              setFriends((friends) => [
                ...friends,
                { ...snapshot.docs[0].data(), id: snapshot.docs[0].data().id },
              ])
            );
          }
        }
      });
    };
    FetchData();
  }, []);
  return (
    <div>
      <FollowingDisplay friendsArray={friends} real_name={real_name} />
    </div>
  );
};

export default FollowingPage;

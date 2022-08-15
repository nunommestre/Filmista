import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
    const [friends, setFriends] = useState([])
      const array_inside = []
              useEffect(() => {
                const FetchData = async () => {
                  const q = query(
                    collection(db, "Users"),
                    where("id", "==", id)
                  );
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((document) => {
                      for(let i = 0; i < document.data().following.length; ++i){     
                          const q = query(
                              collection(db, "Users"),
                              where("id", "==", document.data().following[i])
                              );
                              if (friends.length <= document.data().following.length){
                              onSnapshot(q, (snapshot) =>
                              setFriends((friends) => [...friends, {...snapshot.docs[0].data(), id: snapshot.docs[0].data().id }])
                              )
                              }
                      }
                    });
                  };
                  FetchData();
              }, []);
  return (
    <div>
      <FollowingDisplay friendsArray={friends} />
    </div>
  );
};
  
export default FollowingPage;
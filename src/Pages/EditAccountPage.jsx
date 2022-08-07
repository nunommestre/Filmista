import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getId,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import "./CSS/EditAccount.css";
import { Button } from "react-bootstrap";
import { ToastAlert } from "../Components/Toast/index";

// https://www.encodedna.com/javascript/redirect-page-after-a-delay-using-javascript.htm#:~:text=Try%20it%20You%20can%20call%20the%20redirect_Page%20%28%29,delay%20is%20for%205000%20milliseconds%20or%205%20seconds.
let redirect_Page = () => {
  let tID = setTimeout(function () {
    window.location.href = "/";
    window.clearTimeout(tID); // clear time out.
  }, 1500);
};

const EditAccountPage = ({ user }) => {
  const [real_name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [filePath, setFilePath] = useState("");
  const FetchData = async () => {
    const q = query(
      collection(db, "Users"),
      where("email", "==", user.attributes.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setName(document.data().name);
      setUsername(document.data().username);
      setBio(document.data().bio);
      // setPfp(document.data().pfp);
    });
  };
  useEffect(() => {
    FetchData();
  }, []);
  const uploadImage = () => {
    if (image == null) return;
    const storage = getStorage();
    const imageRef = ref(storage, `${image.name}`);
    console.log(image.name);
    uploadBytes(imageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    getDownloadURL(imageRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        // Or inserted into an <img> element
        setFilePath(url);
        console.log("url:" + filePath);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ----- Return Statement ----- //
  const editAccount = async () => {
    uploadImage();
    const que = query(
      collection(db, "Users"),
      where("username", "==", username)
    );
    const snapshot = await getDocs(que);
    if (snapshot.docs.length != 0) {
      console.log("lol");
      ToastAlert("This username is already in use.", "error");
      return;
    }
    const q = query(
      collection(db, "Users"),
      where("email", "==", user.attributes.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      const docRef = doc(db, "Users", document.id);
      const payload = {
        name: real_name,
        bio: bio,
        username: username.toLowerCase(),
        pfp: filePath,
      };
      updateDoc(docRef, payload);
      console.log("Check db :)");
      redirect_Page();
    });
    // If there is already a user with this email do not write them again
  };
  return (
    <form>
      <div className="edit-account-page">
        <div>
          <h1 className="ea-text">Edit Account: </h1>
          <h3 className="ea-text">Name: </h3>
          <input
            className="ea-text name-bar"
            defaultValue={real_name}
            name="Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name..."
          />
          <h3 className="ea-text">Username: </h3>
          <input
            className="ea-text name-bar"
            defaultValue={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username..."
          />
          <h3 className="ea-text">Bio: </h3>
          <textarea
            rows="4"
            cols="30"
            name="bio"
            defaultValue={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter something about yourself..."
          ></textarea>
          <h3 className="ea-text">Profile Picture: </h3>
          <input
            className="file-bar"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <Button
          variant="light"
          className="update-account"
          onClick={editAccount}
        >
          UPDATE
        </Button>
        <a href="/">
          <Button variant="danger" className="cancel-button">
            CANCEL
          </Button>
        </a>
      </div>
    </form>
  );
};

export default EditAccountPage;

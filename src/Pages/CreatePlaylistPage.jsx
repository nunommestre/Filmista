import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getId,
  updateDoc,
  doc,
  arrayUnion
} from "firebase/firestore";
import db from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import "./CSS/createPlaylist.css"
import { Image, Button, Col, Row, Container } from "react-bootstrap";
import { ToastAlert } from "../Components/Toast/index";

let redirect_Page = () => {
  let tID = setTimeout(function () {
    window.location.href = "/";
    window.clearTimeout(tID); // clear time out.
  }, 1500);
};

const CreatePlaylistPage = ({user}) => {
  const [real_name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [filePath, setFilePath] = useState();
  const [pfp, setPfp] = useState();

  useEffect(() => {
    ToastAlert("We are currently experiencing issues with creating playlists. Be sure to tap the CREATE button twice slowly, and wait to ensure you changes redirect you to the account page.", "info");
  },[]);

  const changeImage = (e) => {
    let file = e.target.files[0];
    setPfp(URL.createObjectURL(file));
    setImage(file);
  };
  const uploadImage = () => {
    console.log(image == "");
    if (image == "") {
      setFilePath("");
      return;
    }
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
        console.log(url);
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
  const createPlaylist = async () => {
    uploadImage();
    const q = query(
      collection(db, "Users"),
      where("email", "==", user.attributes.email)
    );
    const querySnapshot = await getDocs(q);
    // If there is already a user with this email do not write them again
    if (querySnapshot.docs.length != 0) {
      const collectionRef = collection(db, "Playlists");
      const payload = {
        name: real_name,
        id: "default",
        pfp: filePath,
        user_id: querySnapshot.docs[0].data().id,
        movies: []
      };
      const docRef = await addDoc(collectionRef, payload);
      updateDoc(docRef, "id", docRef.id);
      const userDocRef = doc(db, "Users", querySnapshot.docs[0].data().id);
      const UserPayload = { playlists: arrayUnion(docRef.id) };
      updateDoc(userDocRef, UserPayload);
      redirect_Page();
    } else {
      console.log("Error");
    }
  };
  // ----- Return Statement ----- //

  return (
    <div className="create-playlist-page">
    <div>
    <h1>Create Playlist: </h1>
    <h3>Name: </h3>
     <input className="name-bar" type="text" defaultValue={real_name}
            name="Name"
            onChange={(e) => setName(e.target.value)} placeholder="Name..."/>
    <h3>Cover Picture: </h3>
  </div>
  <Container className="g-0 p-0 m-0">
            <Row md={6}>
              <Col>
                <Image
                  width={200}
                  height={200}
                  className="col img-thumbnail"
                  src={pfp}
                  alt="pfp"
                  onError={(e) => {
                    e.target.src =
                      "https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1";
                    e.onerror = null;
                  }}
                />
              </Col>
              <Col>
                <Container>
                  <Col>
                    <input
                      className="file-bar"
                      type="file"
                      onChange={changeImage}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      className="remove-pfp"
                      onClick={() => {
                        setPfp("");
                        setImage("");
                      }}
                    >
                      Remove Picture
                    </Button>
                  </Col>
                </Container>
              </Col>
            </Row>
          </Container>
    <Button variant="light" className="creation-button" onClick={createPlaylist} >CREATE</Button>
    <a href="/"><Button variant="danger" className="cancel-button">CANCEL</Button></a>
  </div>
  );
};

export default CreatePlaylistPage;

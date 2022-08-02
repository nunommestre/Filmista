import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getId,
  updateDoc,
  doc
} from "firebase/firestore";
import db from "../firebase";
import React, {useState} from "react";
import "./CSS/EditAccount.css"
import{ Button } from "react-bootstrap";
const EditAccountPage = ({user}) => {
  const [username, setUsername] = useState([]);
  const [bio, setBio] = useState([]);
  // ----- Return Statement ----- //
  const editAccount = async () => {
  const q = query(
    collection(db, "Users"),
    where("email", "==", user.attributes.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
      const docRef = doc(db, "Users", document.id)
      const payload = {name: username, bio: bio}
      updateDoc(docRef, payload)
      console.log("Check db :)")
      window.location.href = "/";
    });
    };
  return (
        <form>
    <div className="edit-account-page">
      <div>
      <h1 className="ea-text" >Edit Account: </h1>
      <h3 className="ea-text">Name: </h3>
       <input className="ea-text name-bar"  value={username}
                    name="username"
                    onChange={e => setUsername(e.target.value)} type="text" placeholder="Name..."/>
      <h3 className="ea-text">Bio: </h3>
      <textarea rows = "4" cols = "30" name="bio"  value={bio}
                    onChange={e => setBio(e.target.value)} placeholder="Enter something about yourself...">
         </textarea>
      <h3 className="ea-text" >Profile Picture: </h3>
      <input className="file-bar" type="file"/>
    </div>
      <Button variant="light" className="update-account" onClick={editAccount}>UPDATE</Button>
      <a href="/"><Button variant="danger" className="cancel-button">CANCEL</Button></a>
    </div>
    </form>
  );
}

export default EditAccountPage;

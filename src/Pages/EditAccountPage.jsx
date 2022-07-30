import React from "react";
import "./CSS/EditAccount.css"
import{ Button } from "react-bootstrap";
const EditAccountPage = () => {
  // ----- Return Statement ----- //
  return (
    <div className="edit-account-page">
      <div>
      <h1 className="ea-text">Edit Account: </h1>
      <h3 className="ea-text">Name: </h3>
       <input className="ea-text name-bar" type="text" placeholder="Name..."/>
      <h3 className="ea-text">Bio: </h3>
      <textarea rows = "4" cols = "30" name = "description" >
           Bio...
         </textarea>
      <h3 className="ea-text" >Profile Picture: </h3>
      <input className="file-bar" type="file"/>
    </div>
      <Button variant="light" className="update-account">UPDATE</Button>
      <a href="/"><Button variant="danger" className="cancel-button">CANCEL</Button></a>
    </div>
  );
}

export default EditAccountPage;

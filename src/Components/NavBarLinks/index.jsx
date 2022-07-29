import React from "react";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faHouse, faRankingStar, faPenToSquare, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@aws-amplify/ui-react";
import { NavDropdown } from "react-bootstrap";
import "./styles.css";

const NavBarSocialLinks = ({logOut}) => {
    return (
      <Nav className="ms-auto links">
        <Nav.Link href="/explore">
          Explore 
          <FontAwesomeIcon icon={faRankingStar} className="nav-icon" />
        </Nav.Link>
        <Nav.Link href="/friends">
          Friends 
          <FontAwesomeIcon icon={faUserFriends} className="nav-icon" />
        </Nav.Link>
        <NavDropdown title="Account">
        <NavDropdown.Item href="/">
          Home 
          <FontAwesomeIcon icon={faHouse} className="nav-icon" />
        </NavDropdown.Item>
        <NavDropdown.Item href="/editAccount">
          Edit Account
          <FontAwesomeIcon icon={faPenToSquare} className="nav-icon" />
        </NavDropdown.Item>
        <NavDropdown.Item href="/createPlaylist">
          Create Playlist
          <FontAwesomeIcon icon={faCirclePlus} className="nav-icon" />
        </NavDropdown.Item>
        <NavDropdown.Divider></NavDropdown.Divider>
        <NavDropdown.Item>
        <Button onClick={logOut}>Sign Out</Button>
        </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };
  
  export default NavBarSocialLinks;
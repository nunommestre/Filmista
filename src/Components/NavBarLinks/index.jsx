import React from "react";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faHouse, faRankingStar, faPenToSquare, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { NavDropdown, Button } from "react-bootstrap";
import friends from "../../LogoImg/friends.png";
import explore from "../../LogoImg/explore.png";
import account from "../../LogoImg/popcorn.png";
import "./styles.css";
const NavBarSocialLinks = ({logOut}) => {
    return (
      <Nav className="ms-auto links">
        <Nav.Link href="/explore">
          Explore 
          <img src={explore} className="nav-icons" />
        </Nav.Link>
        <Nav.Link href="/friends">
          Friends 
          <img src={friends} className="nav-icons" />
        </Nav.Link>
        <NavDropdown title="Account" className="down">
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
        <Button variant="danger" onClick={logOut}>Sign Out</Button>
        </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };
  
  export default NavBarSocialLinks;
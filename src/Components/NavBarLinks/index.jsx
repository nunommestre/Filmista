import React from "react";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPenToSquare,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavDropdown, Button } from "react-bootstrap";
import friends from "../../LogoImg/friends.png";
import explore from "../../LogoImg/explore.png";
import "./styles.css";
const NavBarSocialLinks = ({ logOut }) => {
  return (
    <Nav className="ms-auto links nav-text">
      <Nav.Link href="/explore" className="nav-text">
        Explore
        <img src={explore} alt="rate" className="nav-icons" />
      </Nav.Link>
      <Nav.Link href="/friends" className="nav-text">
        Friends
        <img src={friends} alt="friends page" className="nav-icons" />
      </Nav.Link>
      <NavDropdown title="Account" className="down nav-text">
        <NavDropdown.Item href="/" className="nav-text">
          Home
          <FontAwesomeIcon icon={faHouse} className="nav-icon" />
        </NavDropdown.Item>
        <NavDropdown.Item href="/editAccount" className="nav-text">
          Edit Account
          <FontAwesomeIcon icon={faPenToSquare} className="nav-icon" />
        </NavDropdown.Item>
        <NavDropdown.Item href="/createPlaylist" className="nav-text">
          Create Playlist
          <FontAwesomeIcon icon={faCirclePlus} className="nav-icon" />
        </NavDropdown.Item>
        <NavDropdown.Divider></NavDropdown.Divider>
        <NavDropdown.Item>
          <Button variant="danger" onClick={logOut}>
            Sign Out
          </Button>
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default NavBarSocialLinks;

import React from "react";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faHouse, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";

const NavBarSocialLinks = ({logOut}) => {
    return (
      <Nav className="ms-auto">
        <Nav.Link href="https://google.com">
          <FontAwesomeIcon icon={faRankingStar} />
        </Nav.Link>
        <Nav.Link href="https://google.com">
          <FontAwesomeIcon icon={faUserFriends} />
        </Nav.Link>
        <Nav.Link href="https://google.com">
          <FontAwesomeIcon icon={faHouse} />
        </Nav.Link>
        <Button onClick={logOut}>Sign Out</Button>
      </Nav>
    );
  };
  
  export default NavBarSocialLinks;
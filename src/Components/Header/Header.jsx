import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import {BsFillKeyFill} from "react-icons/bs"
import "./Header.css"
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location  = useLocation().pathname
    console.log(location)
  return (
    <Navbar expand="lg" className="headerConatiner"> 
        <Navbar.Brand as={Link} className='logo'>
           logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='me-auto'>
            <Nav.Link className={location === "/" ? "navItem active" : "navItem"} as={Link} to="/" >Home</Nav.Link>
            <Nav.Link className={location === "/about-us" ? "navItem active" : "navItem"} as={Link} to="/about-us" >about us</Nav.Link>
            <Nav.Link className={location === "/teachers" ? "navItem active" : "navItem"} as={Link} to="/teachers" >Teachers</Nav.Link>
            <Nav.Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >Students</Nav.Link>
            <Nav.Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >Classes</Nav.Link>
            <Nav.Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >programs</Nav.Link>
            <Nav.Link className={location === "/auth" ? "navItem active" : "navItem"} as={Link} to="/auth" >
              <BsFillKeyFill className='login_icon'/>
            </Nav.Link>
         
          </Nav>
        </Navbar.Collapse> 
    </Navbar>
  );
}

export default Header;
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillKeyFill } from "react-icons/bs"
import "./Header.css"
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../State/State';

function Header() {
  const { getLogo, setGetLogo, isDelete } = useContext(GlobalContext)
  const location = useLocation().pathname
  const logos = getLogo[getLogo.length - 1]
  useEffect(() => {
    fetch("http://localhost:8000/api/settings/logo")
      .then(res => res.json())
      .then(data => {
        setGetLogo(data)
      })
  }, [setGetLogo, isDelete])
  return (
    <Navbar expand="lg" className="headerConatiner">
      <Navbar.Brand as={Link} to="/" className='logo'>
        <img src={logos ? logos.logo : getLogo} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='me-auto'>
          <Nav.Link className={location === "/" ? "navItem active" : "navItem"} as={Link} to="/" >Home</Nav.Link>
          <Nav.Link className={location === "/about-us" ? "navItem active" : "navItem"} as={Link} to="/about-us" >about us</Nav.Link>
          <Nav.Link className={location === "/teachers" ? "navItem active" : "navItem"} as={Link} to="/admin-dashboard" >Teachers</Nav.Link>
          <Nav.Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/user-dashboard" >Students</Nav.Link>
          <Nav.Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >Classes</Nav.Link>
          <Nav.Link className={location === "/Students" ? "navItem active" : "navItem"} as={Link} to="/Students" >programs</Nav.Link>
          <Nav.Link className={location === "/auth" ? "navItem active" : "navItem"} as={Link} to="/auth" >
            <BsFillKeyFill className='login_icon' />
          </Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
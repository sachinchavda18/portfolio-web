import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["email"]);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [isLogin, setIsLogin] = useState(Boolean(cookie.email));

  const [color, setcolor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 100) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };

  const handleLogout = () => {
    removeCookie("email");
    // setCookie("new Cookie")
    setIsLogin(false);
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <h1 className="portfolio">Portfolio</h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/project">Project</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {cookie.email && <li><Link to="/upload">Upload</Link> </li>}
        <li>
          {cookie.email ? (
            <Link onClick={ handleLogout}>Logout</Link>
          ) : (
            <Link to="/login" onClick={() => setIsLogin(true)}>
              Login
            </Link>
          )}
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React from  "react"
import "./stylesStud.css"
import logo from "./../../Resources/logo.png"
/*the navbar for all the student accounts*/
export default function StudNavbar() {
    
    return (
        <nav className="my-navbar">
          <img src={logo} alt="Logo" className="navbar__logo" />
          <div className="my-navbar__title">CASA</div>
          <div className="my-navbar__buttons">
            <ul>
                <a href="/stud/main">
                    <button className="my-button">Main</button>
                </a>
                <a href="/stud/profile">
                    <button className="my-button">Profile</button>
                </a>

                <a href="/login">
                    <button className="my-button">Logout</button>
                </a>
            </ul>
          </div>
        </nav>
      );
}
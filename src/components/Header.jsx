import React from "react";
import '../css/header/Header.css'

export default function Header({ toggleSideBar }) {
    return (
        <nav className=" d-flex navbar navbar-light bg-dark  ">
            <div className="humberger-container">
                <button onClick={toggleSideBar}   className="navbar-toggler" >
                    <i className="fa-solid fa-bars" style={{ color: "white", fontSize: "30px", }}></i>
                </button>
            </div>
            <span className="navbar-text fs-1 fw-bold mx-auto text-center header-title" >
                EUROPEAN CHAMPIONSHIP
            </span>

        </nav>
    )
}
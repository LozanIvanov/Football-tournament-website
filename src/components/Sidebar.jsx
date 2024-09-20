import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const Menu_Link = [
        { link: '/', title: "Home" },
        { link: '/germany', title: "Germany" },
        { link: '/england', title: "England" },
        { link: '/spain', title: "Spain" },
        { link: '/poland', title: "Poland" },
        { link: '/denmark', title: "Denmark" },
        { link: '/serbia', title: "Serbia" },
        { link: '/switzerland', title: "Switzerland" },
    ]

    return (
        <>
            <div className="bg-dark d-flex justify-content-center align-items-start" style={{ height: "100vh" }}>
                <div className="position-sticky">
                    <ul className="nav flex-column text-center">

                        {Menu_Link.map(i =>
                            <li className="nav-item  fs-5 text-start" key={i.link} style={{ textAlign: "center" }}>
                                <Link className="nav-link text-info fw-bold" to={i.link}>{i.title}</Link>
                            </li>  
                                
                                )}
                    </ul>
                </div>
            </div>
        </>
    )
}
import React from "react";
import { Link } from "react-router-dom";

export default function SidebarPage() {

    const Menu_Link = [
        { link: '/', title: "Home" },
        { link: '/players', title: "Players" },
        { link: '/matches', title: "Matches" },
        { link: '/germany', title: "Back" },

    ]

    return (
        <>
            <div className="bg-dark d-flex justify-content-center align-items-start" style={{ height: "100vh" }}>
                <div className="position-sticky">
                    <ul className="nav flex-column text-center">

                        {Menu_Link.map(i =>
                            <li className="nav-item fs-5 text-start">
                                <Link className="nav-link text-info fw-bold" to={i.link}>{i.title}</Link>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </>
    )
}
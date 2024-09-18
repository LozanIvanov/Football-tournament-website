import React from "react";
import { Link, useParams } from "react-router-dom";

export default function SidebarPage() {

    const { country } =useParams();

    const Menu_Link = [
        { link: '/', title: "Home" },
        { link: `/players/${country}`, title: "Players" },
        { link: `/matches/${country}`, title: "Matches" },
        { link: `/${country}`, title: "Back" },
    

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
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/sideBar/SideBar.css"

export default function SidebarPage() {

    const { country } = useParams();

    const [visible,setVisible]=useState(false);

    useEffect(()=>{
        setTimeout(()=>setVisible(true),100)
    },[])

    const Menu_Link = [
        { link: '/', title: "Home" },
        { link: `/players/${country}`, title: "Players" },
        { link: `/matches/${country}`, title: "Matches" },
        { link: `/${country}`, title: "Back" },


    ]

    return (
        <>
            <div className="bg-dark d-flex  align-items-start"
                style={{ height: "100vh", display: "flex", justifyContent: window.innerWidth >= 992 ? 'center' : 'start', width: '100%' }}>
                <div className={`position-sticky, sidebar ${visible ? "visible": ''} `}>
                    <ul className="nav flex-column ">

                        {Menu_Link.map(i =>
                            <li className="nav-item fs-5 text-start" key={i.link} style={{ textAlign: "center" }}>
                                <Link className="nav-link text-info fw-bold" to={i.link}>{i.title}</Link>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </>
    )
}
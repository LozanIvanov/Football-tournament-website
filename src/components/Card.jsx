import React from "react";

export default function Card({ title, position, age, image, bgColor = "bg-primary" })
return (
    <>
        <div className="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="..."/>
                <div className={`card-body p-3 ${bgColor}`}>
                    <h3>{title}</h3>
                    <p className="card-text">{age}</p>
                    <p className="card-text">{position}</p>
                </div>
        </div>
    </>
)
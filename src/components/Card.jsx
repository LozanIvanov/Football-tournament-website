import React from "react";

export default function Card({ title, position, age, bgColor = "bg-primary" }){
return (
    <>
        <div className="card " >
            <div style={{  height: '30px', width: '50px', overflow: 'hidden' }}>
            <img src="../images/football.jpg" className="card-img-top img-fluid" alt="..." style={{ 
                            height: '100%', 
                            width: '100%', 
                            objectFit: 'cover' ,
                            objectPosition:'top',
                            paddingLeft:'20px'

                        
                        }} />
                    </div> 
                <div className={`card-body p-1 ${bgColor}`}>
                    <p>{title}</p>
                    <p className="card-text">{age}-{position}</p>
                    
                </div>
        </div>
    </>
)
}
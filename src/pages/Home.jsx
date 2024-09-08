import React from "react";
import withMainLayout from "../layout/withMainLayout";

const style={
    background:{
         backgroundImage: "url('/images/header/stadium4.jpg')",
         height: '100vh',
         backgroundSize:'cover',
         backgroundPosition:'center',
         objectFit:'cover'

    }
}

 function HomePage(){
    return(
        <div style={style.background}>
            
            <button className="btn btn-primary ms-2">save button</button>
        </div>
    )
}
export default withMainLayout(HomePage);
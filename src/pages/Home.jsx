import React from "react";
import withMainLayout from "../layout/withMainLayout";
import Table from "../components/Table";

const style={
    background:{
         backgroundImage: "url('/images/staduim/3.jpg')",
         height: '100vh',
         backgroundSize:'cover',
         backgroundPosition:'center',
         objectFit:'cover',
         

    }
}

 function HomePage(){
    return(
        <div style={style.background}>
                 
        </div>
    )
}
export default withMainLayout(HomePage);
import React from "react";
import withMainLayout from "../layout/withMainLayout";
import Table from "../components/Table";

const style={
    background:{
         backgroundImage: "url('/images/staduim/3.jpg')",
         height: '90vh',
         backgroundPosition:'center',
         backgroundRepeat:'no-repeat',
         backgroundSize:'cover',
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
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function withMainLayout(Component){

    function layout(props){
        return(
            <>
            <Header/>
            <div className="row">
                <div className="col-3 col-lg-2 p-0 ">
                    <Sidebar/>
                </div>
                <div className="col-9 col-lg-10 p-0">
                <Component {...props} />
                </div>
            </div>
            
            </>
        )
    }
    return layout;
}
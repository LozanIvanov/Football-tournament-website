import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import SidebarPage from "../components/SideBarPage";

export default function withMainLayoutPage(WrappedComponent) {

    function layoutWrapper(props) {
        const [contentHeight, setContentHeight] = useState('100vh');
        const [isSideBarVisible, setIsSideBarVisible] = useState(false);
        const [visible,setVisible]=useState(false);
        const headerRef = useRef(null);

        useEffect(() => {
            const handleResize = () => {
                if(headerRef.current) {

                    const headerHeight = headerRef.current.offsetHeight;
                    const windowHeight = window.innerHeight;
                    setContentHeight(`${windowHeight - headerHeight}px`);
                }
                if (window.innerWidth >= 992) {
                    setIsSideBarVisible(true)
                }
                else {
                    setIsSideBarVisible(false)
                }
            };
            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };

        }, []);
        const toggleSideBar = () => {
            setIsSideBarVisible(!isSideBarVisible)
        }
        return (
            <>
                <div >
                    <div ref={headerRef}>
                        <Header toggleSideBar={toggleSideBar} />
                    </div>
                    <div className="row m-0 p-0" style={{ height: contentHeight }}
                    > 
                            <div className={`col-lg-2  p-0 sidebar-container ${isSideBarVisible ? 'visible':''}`}
                                style={{
                                    position:'fixed',
                                    width:isSideBarVisible ? '250px' : '0',
                                    height: contentHeight, overflow: 'hidden',
                                    top: headerRef.current ? headerRef.current.offsetHeight : 0,
                                }}>
                                <SidebarPage />
                            </div>

                            <div className="col-lg-10 p-0 " 
                            style={{ height: contentHeight,
                                 overflow:window.innerWidth >= 992 ?  'hidden': '',
                              marginLeft: window.innerWidth >= 992 ? '250px':'0'        
                        }}
                            >
                                <WrappedComponent {...props} />
                            </div>
                        </div>
                    </div>
                

            </>
        )
    }
    return layoutWrapper;
}
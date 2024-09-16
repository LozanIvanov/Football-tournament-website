import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import SidebarPage from "../components/SideBarPage";

export default function withMainLayoutPage(WrappedComponent) {

    function layoutWrapper(props) {
        const [contentHeight, setContentHeight] = useState('100vh');
        const headerRef = useRef(null);

        useEffect(() => {
            if (headerRef.current) {
                const handleResize = () => {

                    const headerHeight = headerRef.current.offsetHeight;
                    const windowHeight = window.innerHeight;
                    setContentHeight(`${windowHeight - headerHeight}px`);
                };
                handleResize();
                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('resize', handleResize);
                };
            }
        }, []);
        return (
            <>
                <div>
                    <div ref={headerRef}>
                        <Header />
                    </div>
                    <div className="row">
                        <div className="col-2 col-lg-2 p-0 m-0  " style={{ height: contentHeight, overflow: 'hidden' }}>
                            <SidebarPage />
                        </div>
                        <div className="col-9 col-lg-10 p-0 m-0" style={{ height: contentHeight, overflow: 'hidden' }}>
                            <WrappedComponent {...props} />
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return layoutWrapper;
}
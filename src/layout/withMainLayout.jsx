import React,{useEffect,useState,useRef} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function withMainLayout(Component) {

    function layout(props) {
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
                        <div className="col-3 col-lg-2 p-0 "style={{height: contentHeight, overflow: 'hidden' }} >
                            <Sidebar />
                        </div>
                        <div className="col-9 col-lg-10 p-0"style={{height: contentHeight, overflow: 'hidden' }} >
                            <Component {...props} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return layout;
}
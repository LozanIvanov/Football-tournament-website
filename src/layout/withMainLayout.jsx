import React,{useEffect,useState,useRef} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function withMainLayout(Component) {

    function layout(props) {
        const [contentHeight, setContentHeight] = useState('100vh');
        const[isSideBarVisible, setIsSideBarVisible]=useState(false)
        const headerRef = useRef(null);
        useEffect(() =>{
        const handleResize=()=> {
            if (headerRef.current) {
                    const headerHeight = headerRef.current.offsetHeight;
                    const windowHeight = window.innerHeight;
                    setContentHeight(`${windowHeight - headerHeight}px`);
                }
                if(window.innerWidth>=992){
                    setIsSideBarVisible(true)
                }
                else{
                    setIsSideBarVisible(false)
                }
            };
                handleResize();
                window.addEventListener('resize', handleResize);
                return () => {
                    window.removeEventListener('resize', handleResize);
                };
            
        }, []);
        const toggleSideBar=()=>{
            setIsSideBarVisible(!isSideBarVisible)
        }

        return (
            <>
                <div>
                    <div ref={headerRef}>
                        <Header toggleSideBar={toggleSideBar} />
                    </div>

                    <div className="row"style={{height:contentHeight}}>

                        <div className={`col-lg-3 p-0 sidebar-container ${isSideBarVisible ? 'visible':''}`}
                        style={{height: contentHeight, overflow: 'hidden',
                        top:headerRef.current ? headerRef.current.offsetHeight : 0,
                        }} >
                            <Sidebar />
                        </div>

                        <div className="col-lg-9 p-0 w-100"
                        style={{ height: contentHeight, overflow: 'hidden'}} >
                            <Component {...props} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return layout;
}
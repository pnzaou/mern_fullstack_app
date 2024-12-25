import { Link } from "react-router-dom";

const BottomNavBar = () => {
    return (
        <div className="w-screen fixed bottom-0 right-0 left-0 shadow-[0px_-5px_10px_rgba(0,0,0,0.2)] bg-white h-16">
            <div className="h-full relative flex justify-between items-center px-7">
                <div className="flex justify-between gap-10">
                    <div>
                        <Link to="#">
                            <img src="/images/home-svgrepo-com.svg" className="w-7 h-7"/>
                        </Link>
                    </div>
                    <div>
                        <Link to="#">
                            <img src="/images/search-svgrepo-com.svg" className="w-7 h-7"/>
                        </Link>
                    </div>
                </div>
                <div className="relative -top-5 w-16 h-16 rounded-full bg-[#4d4a3d] border-[5px] border-[#ffffff]">
                    <Link to="#">
                        <img src="/images/plus-svgrepo-com.svg"/>
                    </Link>
                </div>
                <div className="flex justify-between gap-10">
                    <div>
                        <Link to="#">
                            <img src="/images/saved-svgrepo-com.svg" className="w-7 h-7"/>
                        </Link>
                    </div>
                    <div>
                        <Link to="#">
                            <img src="/images/settings-1-svgrepo-com.svg" className="w-7 h-7"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomNavBar;

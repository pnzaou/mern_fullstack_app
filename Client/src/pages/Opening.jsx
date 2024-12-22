import { Link } from "react-router-dom";

const Opening = () => {
    return (
        <div className="relative flex h-screen w-screen flex-col justify-evenly items-center">
            <div>
                <img src="images/blog-svgrepo-com.svg" alt="logo du site" className='h-32 w-32 animate-slowbounce duration-[5000ms]'/>
            </div>
            <div className="absolute bottom-10">
                <div>
                    <Link to="/inscription" className="btn btn-wide text-white font-bold bg-[#4d4a3d] hover:bg-[#302e24]">Créer un compte</Link>
                </div>
                <div className="mt-4">
                    <Link 
                        to="/connexion" 
                        className="btn btn-wide bg-white border-[1.5px] border-[#4d4a3d] font-bold text-[#4d4a3d] hover:bg-[#f0f0f0]"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Opening;

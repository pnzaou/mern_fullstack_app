import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authStore } from "../stores/authStore";
import { themeStore } from "../stores/themeStore";
import { Link } from "react-router-dom";

const Navbar = ({page}) => {
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const { authUser } = authStore()
    const {theme} = themeStore()

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > lastScrollY && window.scrollY > 100) {
                setShowNavbar(false)
            } else if(window.scrollY < lastScrollY) {
                setShowNavbar(true)
            }

            setLastScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[lastScrollY])

    return (
        <header className={`fixed z-10 w-screen right-0 left-0 top-0 bg-base-100 bg-opacity-95 backdrop-blur-sm shadow-[0px_2px_7px_rgba(0,0,0,0.2)] ${showNavbar ? 'block' : 'hidden'} transition-all duration-300`}>
            <div className="flex">
                <div className="w-1/2 pt-4 pl-3">
                    <div className="avatar">
                        <div className="w-11 rounded-full">
                            <img src={ authUser.profilPicture || "/images/avatar.png"} />
                        </div>
                    </div>
                </div>
                <div className="w-1/2"></div>
            </div>
            <div className="mt-3 pb-4 flex justify-between">
                <div className={`
                    w-1/2 text-center font-bold
                    ${theme === "light" 
                        ? (page === "pour vous" ? "text-neutral-600" : "text-accent") 
                        : (page === "pour vous" ? "text-accent" : "text-neutral-600")
                    }`
                }>
                    <Link to="/">Pour vous</Link>
                </div>
                <div className={`
                    w-1/2 text-center font-bold
                    ${theme === "light" 
                        ? (page === "abonnements" ? "text-neutral-600" : "text-accent") 
                        : (page === "abonnements" ? "text-accent" : "text-neutral-600")
                    }`
                }>
                    <Link to="/abonnements/posts">Abonnements</Link>
                </div>
            </div>
        </header>
    );
}

Navbar.propTypes = {
    page: PropTypes.string
}

export default Navbar;

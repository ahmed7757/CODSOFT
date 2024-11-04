import lightLogo from "../assets/Jobify-light.svg";
import darkLogo from "../assets/Jobify-dark.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <header className="container">
            <nav className="flex justify-between items-center px-4 md:px-12 lg:px-24 bg-gray-200">
                <label className="swap sm:hidden swap-rotate py-1">
                    <input onChange={handleToggle} checked={theme === "dark"} type="checkbox" className="theme-controller" />

                    <svg className="swap-on h-6 w-6 sm:h-8 sm:w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    <svg className="swap-off h-6 w-6 sm:h-8 sm:w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                <ul className="sm:flex hidden items-center gap-4 sm:gap-6">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/"}>Find Job</Link></li>
                    <li><Link to={"/"}>Employers</Link></li>
                    <li><Link to={"/"}>Candidates</Link></li>
                </ul>
                <label className="swap hidden sm:flex swap-rotate py-1">
                    <input onChange={handleToggle} checked={theme === "dark"} type="checkbox" className="theme-controller" />

                    <svg className="swap-on h-6 w-6 sm:h-8 sm:w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    <svg className="swap-off h-6 w-6 sm:h-8 sm:w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                <div className="dropdown sm:hidden dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className=""><GiHamburgerMenu /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/"}>Find Job</Link></li>
                        <li><Link to={"/"}>Employers</Link></li>
                        <li><Link to={"/"}>Candidates</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="flex px-4 md:px-12 lg:px-24 justify-between items-center">
                <img src={theme === "light" ? lightLogo : darkLogo} className="w-auto h-16 sm:h-24" alt="Jobify" />
                <div className="sm:flex border-2 hidden  rounded-md pl-2 gap-2 w-1/4 md:w-1/2 items-center">
                    <FiSearch className="text-gray-500 h-6 w-6 sm:h-8 sm:w-8" />
                    <input type="search" className="border-0 text-base sm:text-lg w-full placeholder:text-base sm:placeholder:text-lg ring-0 focus:border-0 py-2 sm:py-3 px-2 focus:ring-0" placeholder="Search for job" />
                </div>
                <div className="flex gap-2">
                    <Link to={"/signin"} className="rounded px-3 py-2 border-2 text-blue-600">Sign In</Link>
                    <Link to={"/"} className="rounded px-3 py-2 text-white bg-blue-600">Post A Job</Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar
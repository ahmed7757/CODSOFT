import darkLogo from "../assets/Jobify-dark.svg";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
    return (
        <footer className="container bg-neutral-900">
            <div className="space-y-2 items-center gap-8 w-full ">
                <div className="flex flex-col md:flex-row justify-between gap-6 py-8 md:items-center w-full px-4 md:px-12 lg:px-24">
                    <div className="space-y-4 text-slate-500">
                        <img src={darkLogo} alt="" className="w-auto h-16 sm:h-24" />
                        <p>Call now: <strong className="text-white">01234567890</strong></p>
                        <address>Lorem ipsum dolor sit amet consectetur adipisicing elit.</address>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-500">
                        <div className="space-y-3">
                            <h3 className="text-white text-xl font-semibold">Quick Links</h3>
                            <ul className="flex flex-col gap-3">
                                <li>Find a Job</li>
                                <li>Find a Candidate</li>
                                <li>Find a Company</li>
                                <li>Post a Job</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-white text-xl font-semibold">Candidates</h3>
                            <ul className="flex flex-col gap-3">
                                <li>Create Account</li>
                                <li>Job Listing</li>
                                <li>Resume Listing</li>
                                <li>Job Alerts</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-white text-xl font-semibold">Employers</h3>
                            <ul className="flex flex-col gap-3">
                                <li>Create Account</li>
                                <li>Post a Job</li>
                                <li>Find Candidates</li>
                                <li>Resume Alerts</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-white text-xl font-semibold">Support</h3>
                            <ul className="flex flex-col gap-3">
                                <li>About Us</li>
                                <li>Our Services</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="flex justify-between items-center px-4 py-4 md:px-12 lg:px-24">
                    <p className="text-slate-500">&copy; 2024 Jobify. All rights reserved </p>
                    <div className="flex gap-3">
                        <a href="https://www.facebook.com"><FaFacebookF className="h-6 w-6 text-white" /></a>
                        <a href="https://www.linkedin.com"><FaYoutube className="h-6 w-6 text-white" /></a>
                        <a href="https://www.instagram.com"><FaInstagram className="h-6 w-6 text-white" /></a>
                        <a href="https://www.x.com"><FaXTwitter className="h-6 w-6 text-white" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
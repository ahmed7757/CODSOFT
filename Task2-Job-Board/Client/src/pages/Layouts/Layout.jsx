// Description: Layout component for the job board application.

import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

const Layout = () => {
    return (
        <div className="container overflow-x-hidden mx-auto">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout
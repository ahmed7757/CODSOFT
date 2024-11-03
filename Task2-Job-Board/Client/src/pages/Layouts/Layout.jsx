// Description: Layout component for the job board application.

import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

const Layout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
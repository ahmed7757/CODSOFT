// Description: Layout component for the job board application.

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Layout = () => {
  return (
    <div className=" overflow-x-hidden mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

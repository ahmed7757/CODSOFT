import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import RegLogLayout from "./pages/Layouts/regLogLayout";
import Signin from "./pages/Signin/Signin";
import { useState } from "react";
import { UserContext } from "./context/user";
import Layout from "./pages/Layouts/Layout";
import Home from "./pages/Home/Home";
import FindJop from "./pages/FindJop/FindJop";
import JobDetails from "./pages/JobDetails/JobDetails";

const App = () => {
  const userData = localStorage.getItem("token")
  const userData2 = sessionStorage.getItem("token")
  const [loggedUser, setLoggedUser] = useState(userData ? userData : userData2);
  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }} >
      <BrowserRouter>
        <Routes>
          <Route element={<RegLogLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/findjop" element={<FindJop />} />
            <Route path="/findjop/jobdetails/:id" element={<JobDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
import { Link, useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import validator from "validator";
import axios from "../../api/axios"
import { UserContext } from "../../context/user"

const Signin = () => {
    const Signin_URL = "/users/login";
    const loggedInData = useContext(UserContext);
    const navigate = useNavigate();
    const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;

    const [user, setUser] = useState("")
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [password, setPassword] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("");
    const [stayLoggedIn, setStayLoggedIn] = useState(false);


    const onUserChange = (e) => {
        setUser(e.target.value);
        setValidUser(USER_REGEX.test(e.target.value) || validator.isEmail(e.target.value));
    };

    const onPwdChange = (e) => {
        setPassword(e.target.value);
        setValidPwd(validator.isStrongPassword(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validUser || !validPwd) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const payload = USER_REGEX.test(user)
                ? { userName: user, password }
                : { email: user, password };

            const response = await axios.post(Signin_URL, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const token = response.data.token;
            if (token) {
                if (stayLoggedIn) {
                    localStorage.setItem("token", token);
                } else {
                    sessionStorage.setItem("token", token);
                }
                loggedInData.setLoggedUser(token);
                navigate("/landing");
            }
        } catch (error) {
            console.error(error);
            setErrMsg(error.response?.data?.message || "Login failed");
        }
    };



    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-semibold">Sign in</h1>
                <p className="text-gray-400">Don't have account? <Link to={"/signup"} className="text-info dark:text-gray-300 dark:hover:text-gray-200 font-semibold">Create Account</Link></p>
            </div>
            {errMsg && <div role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errMsg}</span>
            </div>}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
                <div className="relative space-y-1 col-span-2">
                    <label htmlFor="userName" className="absolute top-4 right-2 z-10">
                        <FaCheck
                            className={validUser ? "visible text-green-500" : "hidden"}
                        />
                        <FaTimes
                            className={
                                validUser || !user ? "hidden" : "visible text-red-600"
                            }
                        />
                    </label>
                    <input
                        type="text"
                        value={user}
                        name="userName"
                        id="userName"
                        onChange={onUserChange}
                        placeholder="Username or Email"
                        autoComplete="off"
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        className="px-3 py-2 rounded-md border w-full border-gray-300"
                    />
                    <p
                        id="uidnote"
                        className={
                            userFocus && !validUser
                                ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                : "hidden"
                        }
                    >
                        <FaInfoCircle />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>

                <div className="relative space-y-1 col-span-2">
                    <label htmlFor="password" className="absolute top-4 right-2 z-10">
                        <FaCheck
                            className={validPwd ? "visible text-green-500" : "hidden"}
                        />
                        <FaTimes
                            className={validPwd || !password ? "hidden" : "visible text-red-600"}
                        />
                    </label>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        id="password"
                        onChange={onPwdChange}
                        placeholder="Password"
                        autoComplete="off"
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        className="px-3 py-2 rounded-md w-full border border-gray-300"
                    />
                    <p
                        id="pwdnote"
                        className={
                            pwdFocus && password && !validPwd
                                ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                : "hidden"
                        }
                    >
                        <FaInfoCircle />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number and a
                        special character.
                        <br />
                        Allowed special characters:{" "}
                        <span aria-label="exclamation mark">!</span>{" "}
                        <span aria-label="at symbol">@</span>{" "}
                        <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span>{" "}
                        <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="flex justify-between items-center col-span-2">
                    <div className="flex items-center gap-1">
                        <input onChange={() => setStayLoggedIn(!stayLoggedIn)} type="checkbox" id="remember" className="h-4 w-4 cursor-pointer rounded" />
                        <label htmlFor="remember" className="block text-sm text-current">Remember me</label>
                    </div>
                    <Link to={"#"} className="text-sm font-semibold text-right text-info dark:text-gray-300">Forgot Password?</Link>
                </div>
                <button
                    type="submit"
                    disabled={
                        !validUser || !validPwd
                            ? true
                            : false
                    }
                    className="py-3 text-white col-span-2 bg-[#0a65cc] disabled:bg-[#0a90cc] hover:bg-[#0a90cc] dark:hover:bg-[#042852] dark:bg-[#042258] dark:disabled:bg-[#042852]  rounded font-semibold flex items-center justify-center gap-2">Sign In<IoArrowForward className="text-xl" /></button>
            </form>
            <p className="col-span-2 text-center text-neutral-400">OR</p>
            <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-2 col-span-2">
                <button className="p-2 border-2 border-neutral-content text-lg text-current shadow-sm col-span-1 rounded-md flex items-center justify-center gap-2"><FaFacebookF className="text-blue-700 text-xl" />Continue with Facebook</button>
                <button className="p-2 border-2 border-neutral-content text-lg text-current shadow-sm col-span-1 rounded-md flex items-center justify-center gap-2"><FcGoogle className="text-xl" />Continue with Google</button>
            </div>
        </div>
    )
}

export default Signin
import { Link, useNavigate } from "react-router-dom";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { IoArrowForward } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import validator from "validator";
import axios from "../../api/axios"

const Signup = () => {
    const Signup_URL = "/users/register";
    const navigate = useNavigate();
    const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
    const FULLNAME_REGEX = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*){1,3}$/;
    const [userType, setUserType] = useState("candidate")
    const [genderValue, setGenderValue] = useState("male");

    const [fullName, setFullName] = useState("")
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)

    const [username, setUsername] = useState("")
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [terms, setTerms] = useState(false)
    const [companyName, setCompanyName] = useState("")
    const [errMsg, setErrMsg] = useState("");
    const handleChange = () => {
        setTerms(!terms);
    };

    const onFullNameChange = (e) => {
        setFullName(e.target.value);
        setValidName(FULLNAME_REGEX.test(e.target.value));
    };

    const onUserChange = (e) => {
        setUsername(e.target.value);
        setValidUser(USER_REGEX.test(e.target.value));
    };

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setValidEmail(validator.isEmail(e.target.value));
    };

    const onPwdChange = (e) => {
        setPassword(e.target.value);
        setValidPwd(validator.isStrongPassword(e.target.value));
    };

    const onMatchChange = (e) => {
        setConfirmPassword(e.target.value);
        setValidMatch(password === e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validEmail || !validPwd) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(Signup_URL, JSON.stringify({
                userName: username,
                email: email,
                password: password,
                name: fullName,
                role: userType,
                companyName: companyName,
                gender: genderValue
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            navigate("/signin")
        } catch (error) {
            console.error(error)
            setErrMsg(error.response.data.message);
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-semibold">Create account.</h1>
                <p className="text-gray-400">Already have an account? <Link to={"/signin"} className="text-info dark:text-gray-300 dark:hover:text-gray-200 font-semibold">Log In</Link></p>
            </div>
            <div className="flex flex-col p-3 gap-2 rounded-md bg-gray-200 dark:bg-neutral items-center">
                <p>CREATE ACCOUNT AS A</p>
                <div className="flex flex-col w-full md:flex-row">
                    <button onClick={(e) => setUserType(e.target.value)} value={"candidate"} className={`px-16 py-2 text-xl flex items-center justify-center  gap-2 font-semibold rounded ${userType === "candidate" ? "bg-[#042852] text-white" : ""}`}><RxAvatar />Candidate</button>
                    <button onClick={(e) => setUserType(e.target.value)} value={"employer"} className={`px-16 py-2 text-xl flex items-center  justify-center gap-2 font-semibold rounded ${userType === "employer" ? "bg-[#042852] text-white" : ""}`}><PiBuildingOfficeBold />Employer</button>
                </div>
            </div>
            <form className="grid grid-cols-2 gap-3">
                <div className="relative space-y-1 col-span-1">
                    <label htmlFor="fullname" className="absolute top-4 right-2 z-10">
                        <FaCheck
                            className={validName ? "visible text-green-500" : "hidden"}
                        />
                        <FaTimes
                            className={
                                validName || !fullName ? "hidden" : "visible text-red-600"
                            }
                        />
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={fullName}
                        onChange={onFullNameChange}
                        placeholder="Full Name"
                        autoComplete="off"
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        className="px-3 py-2 rounded-md border w-full border-gray-300"
                    />
                    <p
                        id="uidnote"
                        className={
                            nameFocus && fullName && !validName
                                ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                : "hidden"
                        }
                    >
                        <FaInfoCircle />
                        Starts with an uppercase letter.
                    </p>
                </div>

                <div className="relative space-y-1 col-span-1">
                    <label htmlFor="username" className="absolute top-4 right-2 z-10">
                        <FaCheck
                            className={validUser ? "visible text-green-500" : "hidden"}
                        />
                        <FaTimes
                            className={
                                validUser || !username ? "hidden" : "visible text-red-600"
                            }
                        />
                    </label>
                    <input
                        type="text"
                        value={username}
                        name="username"
                        id="username"
                        onChange={onUserChange}
                        placeholder="Username"
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
                            userFocus && username && !validUser
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
                    <label htmlFor="email" className="absolute top-4 right-2 z-10">
                        <FaCheck
                            className={validEmail ? "visible text-green-500" : "hidden"}
                        />
                        <FaTimes
                            className={
                                validEmail || !email ? "hidden" : "visible text-red-600"
                            }
                        />
                    </label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        id="email"
                        onChange={onEmailChange}
                        placeholder="Email address"
                        autoComplete="off"
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uemailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        className="px-3 py-2 rounded-md border w-full border-gray-300"
                    />
                    <p
                        id="uidnote"
                        className={
                            emailFocus && email && !validEmail
                                ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                : "hidden"
                        }
                    >
                        <FaInfoCircle />
                        use this form &apos;your@domain-name.domain&apos;.
                        <br />
                        Can include letters, numbers, underscores (_), hyphens (-), and
                        dots (.) before the @ symbol.
                    </p>
                </div>

                {userType === "employer" && (<input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" className="px-3 py-2 col-span-2 rounded-md border border-gray-300" />)}
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

                <div className="relative space-y-1 col-span-2">
                    <label
                        htmlFor="confirm_pwd"
                        className="absolute top-4 right-2 z-10"
                    >
                        <FaCheck
                            className={
                                validMatch && confirmPassword ? "visible text-green-500" : "hidden"
                            }
                        />
                        <FaTimes
                            className={
                                validMatch || !confirmPassword ? "hidden" : "visible text-red-600"
                            }
                        />
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        name="confirm_pwd"
                        id="confirm_pwd"
                        onChange={onMatchChange}
                        placeholder="Confirm Password"
                        autoComplete="off"
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className="px-3 py-2 rounded-md w-full border border-gray-300"
                    />
                    <p
                        id="confirmnote"
                        className={
                            matchFocus && !validMatch
                                ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                : "hidden"
                        }
                    >
                        <FaInfoCircle />
                        Must match the first password input field.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="gender" className="font-semibold">Gender:</label>
                    <select name="gender" value={genderValue} onChange={(e) => setGenderValue(e.target.value)} className="text-black rounded bg-neutral-content" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="flex items-center col-span-2 gap-2">
                    <input type="checkbox" onChange={handleChange} checked={terms} name="terms" id="terms" />
                    <label htmlFor="terms" className="text-gray-400">I agree to the <a href="/terms" className="text-info dark:text-gray-300 dark:hover:text-gray-200 font-semibold">terms and conditions</a></label>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={
                        !validEmail || !validMatch || !validName || !validPwd || !validUser || !terms
                            ? true
                            : false
                    }
                    className="py-3 text-white col-span-2 bg-[#0a65cc] disabled:bg-[#0a90cc] hover:bg-[#0a90cc] dark:hover:bg-[#042852] dark:bg-[#042258] dark:disabled:bg-[#042852]  rounded font-semibold flex items-center justify-center gap-2">Create Account<IoArrowForward className="text-xl" /></button>
            </form>
            <p className="col-span-2 text-center text-neutral-400">OR</p>
            <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-2 col-span-2">
                <button className="py-2 border-2 border-neutral-content text-lg text-current shadow-sm col-span-1 rounded-md flex items-center justify-center gap-2"><FaFacebookF className="text-blue-700 text-xl" />Sign up with Facebook</button>
                <button className="py-2 border-2 border-neutral-content text-lg text-current shadow-sm col-span-1 rounded-md flex items-center justify-center gap-2"><FcGoogle className="text-xl" />Sign up with Google</button>
            </div>
        </div>
    )
}

export default Signup
import logo from "../../assets/Jobify-light.svg"
const Signup = () => {
    return (
        <section className="container flex justify-center h-screen">
            <div className="flex flex-col items-start min-w-52 gap-6 text-left h-full">
                <img src={logo} alt="Jobify" className="w-32 h-32" />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-semibold">Create account.</h1>
                        <p className="text-gray-500">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
                    </div>
                    <div className="flex flex-col p-4 rounded-md bg-gray-200 items-center">
                        <p>CREATE ACCOUNT AS A</p>
                        <div className="flex">
                            <button className="px-6 py-2 text-xl font-semibold rounded">Candidate</button>
                            <button className="px-6 py-2 text-xl font-semibold rounded">Employer</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
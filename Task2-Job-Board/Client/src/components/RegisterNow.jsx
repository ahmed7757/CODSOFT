import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

const RegisterNow = () => {
    return (
        <section className="container py-12 bg-gray-100 ">
            <div className="px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="p-10 rounded-lg flex flex-col gap-3 bg-card-img-1 bg-cover bg-neutral-300">
                    <h2 className="text-3xl font-semibold">Become a Candidate</h2>
                    <p className="w-1/2 text-base text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, ipsam.</p>
                    <Link className="px-5 py-3 rounded-md flex items-center gap-1 bg-slate-50 w-fit text-md">Register Now <IoArrowForward /></Link>
                </div>
                <div className="p-10 rounded-lg flex flex-col gap-3 bg-card-img-2 bg-cover bg-neutral-300">
                    <h2 className="text-3xl font-semibold">Become a Employer</h2>
                    <p className="w-1/2 text-base text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, ipsam.</p>
                    <Link className="px-5 py-3 rounded-md flex items-center gap-1 bg-slate-50 w-fit text-md">Register now <IoArrowForward /></Link>
                </div>
            </div>
        </section>
    )
}

export default RegisterNow
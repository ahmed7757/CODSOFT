import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PiMapTrifoldDuotone } from "react-icons/pi";

const JobDetails = () => {
    const [job, setJob] = useState(null);
    const { id } = useParams();
    const GETJOP_URL = `/jobs/getJob/${id}`;

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(GETJOP_URL, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setJob(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJob();
    }, [id]);

    return (
        <section className="pt-12 flex justify-center">
            <div className="px-4 md:px-12 lg:px-24 flex flex-col gap-8 w-full lg:w-[90%] max-w-[1920px]">
                <div className="flex w-full justify-between">
                    <div>
                        <h2>{job?.title}</h2>
                        <div className="flex gap-3">
                            <p>at {job?.companyName}</p>
                            <p className="p-1 rounded text-blue-400 text-sm bg-blue-50">
                                {job?.jobType}
                            </p>
                        </div>
                    </div>
                    <button className="flex gap-1 px-6 py-3 bg-blue-700 text-white items-center justify-center rounded" onClick={() => document.getElementById('my_modal_3').showModal()}>Apply Now <IoArrowForward /></button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Apply job: {job?.title}</h3>
                            <input type="text" name="" id="" />
                            <p className="py-4">Press ESC key or click on ✕ button to close</p>
                        </div>
                    </dialog>
                </div>
                <div className="grid grid-cols-5">
                    <div className="col-span-3 start-0">
                        <h2>Jop Description</h2>
                        <p>{job?.description}</p>
                    </div>
                    <div className="flex items-center justify-center border-2 p-4 col-span-2 start-3 rounded-md">
                        <div className="flex flex-col justify-center gap-2 items-center p-1 w-full border-r-2 h-full">
                            <h2>Salary (EGP)</h2>
                            <p>{job?.salaryRange}</p>
                            <p>Monthly salary</p>
                        </div>
                        <div className="flex flex-col justify-center gap-2 items-center p-1 w-full border-l-2 h-full">
                            <PiMapTrifoldDuotone />
                            <h2>Job location</h2>
                            <p>{job?.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JobDetails
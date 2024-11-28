import { FiSearch } from "react-icons/fi";
import { PiFadersBold } from "react-icons/pi";
import { IoArrowForward } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import PaginationNav from "../../components/Pagination";
import { Link } from "react-router-dom";

const FindJop = () => {
    const GETJOP_URL = "/jobs/getJobs";
    const [Jobs, setJobs] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(GETJOP_URL, {
                    params: {
                        limit: 10,
                        page: pageIndex,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setJobs(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobs();
    }, [pageIndex]);

    function PaginationNav1Presentation() {
        const pageCount = 10;
        return (
            <div className="flex gap-3 flex-wrap p-6 py-12">
                <PaginationNav
                    gotoPage={setPageIndex}
                    canPreviousPage={pageIndex > 0}
                    canNextPage={pageIndex < pageCount - 1}
                    pageCount={pageCount}
                    pageIndex={pageIndex}
                />
            </div>
        );
    }

    return (
        <section className="pt-12 flex justify-center">
            <div className="px-4 md:px-12 lg:px-24 flex flex-col gap-8 w-full lg:w-[90%] max-w-[1920px]">
                <div className="flex border-2  justify-between rounded-md px-2  w-full items-center">
                    <div className="flex items-center w-full">
                        <FiSearch className="text-gray-500 h-6 w-6 sm:h-8 sm:w-8" />
                        <input
                            type="search"
                            className="border-0 text-base sm:text-lg w-full placeholder:text-base sm:placeholder:text-lg ring-0 focus:border-0 py-2 sm:py-3 px-2 focus:ring-0"
                            placeholder="Search for job"
                        />
                    </div>
                    <div className="flex gap-3 w-full justify-end">
                        <button className="flex items-center gap-2 rounded px-4 py-2 text-lg font-semibold bg-gray-300"><PiFadersBold /> Filters</button>
                        <button className="rounded px-3 py-2 text-lg font-semibold bg-blue-500 text-white">Find Jop</button>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {Jobs &&
                            Jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="flex flex-col bg-gradient-to-r from-blue-200 to-blue-50 shadow-md px-4 py-3 rounded-md gap-4"
                                >
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg md:text-xl">{job.title}</h3>
                                        <div className="flex gap-2 items-center">
                                            <p className="p-1 rounded text-blue-400 text-sm bg-blue-50">
                                                {job.jobType}
                                            </p>
                                            <p>Salary: {job.salaryRange}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-between items-center">
                                        <div>
                                            <p>{job.companyName}</p>
                                            <p>{job.location}</p>
                                        </div>
                                        <Link to={`/findjop/jobdetails/${job._id}`}><IoArrowForward /></Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <PaginationNav1Presentation />
                </div>
            </div>
        </section>
    )
}

export default FindJop
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import { useState, useEffect } from 'react'
const FeaturedJob = () => {
    const GETJOP_URL = '/jobs//getJobs'
    const [featuredJob, setFeaturedJob] = useState(null)
    useEffect(() => {
        const fetchFeaturedJob = async () => {
            try {
                const response = await axios.get(GETJOP_URL, {
                    params: {
                        limit: 10,
                        page: 1
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setFeaturedJob(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchFeaturedJob()
    }, [])
    return (
        <section className="py-12 container">
            <div className="px-4 md:px-12 lg:px-24 flex flex-col gap-8 w-full">
                <div className='flex justify-between items-center'>
                    <h2 className="text-4xl font-semibold">Featured Jobs</h2>
                    <Link to='/jobs' className='text-blue-500'>View all</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredJob && featuredJob.map(job => (
                        <div key={job._id} className="flex flex-col bg-gradient-to-r from-blue-200 to-blue-50 shadow-md px-4 py-3 rounded-md gap-4">
                            <div className='space-y-2'>
                                <h3 className="font-bold text-lg md:text-xl">{job.title}</h3>
                                <div className='flex gap-2 items-center'>
                                    <p className='p-1 rounded text-blue-400 text-sm bg-blue-50'>{job.jobType}</p>
                                    <p>Salary: {job.salaryRange}</p>
                                </div>
                            </div>
                            <div>
                                <p>{job.companyName}</p>
                                <p>{job.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedJob
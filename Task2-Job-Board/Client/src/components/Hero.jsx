import HeroImg from "../assets/HeroImg.svg";
import { PiBriefcaseDuotone } from "react-icons/pi";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { PiUsersDuotone } from "react-icons/pi";
const Hero = () => {
  return (
    <section className="bg-gray-100 py-12  ">
      <div className="px-4 md:px-12 lg:px-24 flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6 md:gap-0 md:flex-row lg:flex-row justify-between items-center lg:items-start">
          <div className="flex flex-col gap-3 sm:gap-6 text-center items-center md:items-start md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-xl leading-snug">
              Find a job that suits your interest & skills.
            </h1>
            <p className="text-sm md:text-base text-neutral-500">
              Get the job you deserve
            </p>
            <button className="w-32 md:w-36 py-3 rounded bg-blue-600 text-white">
              Get Started
            </button>
          </div>
          <img
            src={HeroImg}
            alt="img"
            className="h-60 md:h-72 lg:h-96 w-auto"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiBriefcaseDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">50</h3>
              <p>Live Job</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiBuildingOfficeDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">50</h3>
              <p>Companies</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiUsersDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">50</h3>
              <p>Candidates</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiBriefcaseDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">50</h3>
              <p>New Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

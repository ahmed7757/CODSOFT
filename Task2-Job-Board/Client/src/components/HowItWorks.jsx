import { PiUserPlusDuotone } from "react-icons/pi";
import { PiCloudArrowUpDuotone } from "react-icons/pi";
import { PiSealCheckDuotone } from "react-icons/pi";
import { PiMagnifyingGlassPlusDuotone } from "react-icons/pi";

const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="px-4 md:px-12 lg:px-24 flex flex-col items-center gap-8 w-full">
        <h2 className="font-bold text-5xl">How Jobify work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100 text-4xl flex justify-center items-center">
              <PiUserPlusDuotone />
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <h3 className="text-xl font-semibold">Create account</h3>
              <p className="text-base text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, architecto!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100 text-4xl flex justify-center items-center">
              <PiCloudArrowUpDuotone />
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <h3 className="text-xl font-semibold">Upload CV/Resume</h3>
              <p className="text-base text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Provident, aut?
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100 text-4xl flex justify-center items-center">
              <PiMagnifyingGlassPlusDuotone />
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <h3 className="text-xl font-semibold">Find suitable job</h3>
              <p className="text-base text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                vel?
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100 text-4xl flex justify-center items-center">
              <PiSealCheckDuotone />
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <h3 className="text-xl font-semibold">Apply job</h3>
              <p className="text-base text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt, voluptatum!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

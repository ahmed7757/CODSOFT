import { PiPenNibDuotone } from "react-icons/pi";
import { PiCode } from "react-icons/pi";
import { PiMegaphoneSimpleDuotone } from "react-icons/pi";
import { PiVideoDuotone } from "react-icons/pi";
import { PiMusicNotesDuotone } from "react-icons/pi";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { PiFirstAidKitDuotone } from "react-icons/pi";
import { PiDatabaseDuotone } from "react-icons/pi";
const PopularCategory = () => {
  return (
    <section className="bg-gray-100 py-12 flex justify-center">
      <div className="px-4 md:px-12 lg:px-24 flex flex-col gap-8 w-full lg:w-[90%] max-w-[1920px]">
        <h2 className="text-4xl font-semibold">Popular categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiPenNibDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">
                Graphics & Design
              </h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiCode className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">
                Code & Programing
              </h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiMegaphoneSimpleDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">
                Digital Marketing
              </h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiVideoDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">
                Video & Animation
              </h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiMusicNotesDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">Music & Audio</h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiBuildingOfficeDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">
                Account & Finance
              </h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiFirstAidKitDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">Health & Care</h3>
              <p>357 Open position</p>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 rounded flex-row bg-gray-50 gap-4">
            <PiDatabaseDuotone className="h-12 md:h-16 rounded w-auto p-2 bg-blue-100" />
            <div>
              <h3 className="font-bold text-lg md:text-xl">Data & Science</h3>
              <p>357 Open position</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;

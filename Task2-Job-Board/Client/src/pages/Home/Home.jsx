import FeaturedJob from "../../components/FeaturedJob";
import Hero from "../../components/Hero";
import HowItWorks from "../../components/HowItWorks";
import PopularCategory from "../../components/PopularCategory";
import RegisterNow from "../../components/RegisterNow";

const Home = () => {
  return (
    <main className=" ">
      <Hero />
      <HowItWorks />
      <PopularCategory />
      <FeaturedJob />
      <RegisterNow />
    </main>
  );
};

export default Home;

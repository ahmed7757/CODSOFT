import Hero from "../../components/Hero"
import HowItWorks from "../../components/HowItWorks"
import RegisterNow from "../../components/RegisterNow"

const Home = () => {
    return (
        <main className="container">
            <Hero />
            <HowItWorks />
            <RegisterNow />
        </main>
    )
}

export default Home
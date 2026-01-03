import Contact from "./pages/Contact";
import Hero from "./pages/Hero";
import Impact from "./pages/Impact";
import Solutions from "./pages/Solution";
import VillageHighlights from "./pages/VillageHightlight";

const Home = () => {
    return (
        <>
            <Hero/>
            <Solutions/>
            <Impact/>
            <VillageHighlights/>
            <Contact/>
        </>
    );
};

export default Home;
import Navbar from "@/components/Navbar";
import Landing from "@/pages/landing";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar
                list={["Home", "Features", "Working", "Why_Us", "Contact_Us"]}
                button="Profiler"
            />
            <Landing />
        </div>
    );
}

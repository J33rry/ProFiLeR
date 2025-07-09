"use client";
import Button from "@/components/Button";

import Navbar from "@/components/Navbar";
import Landing from "@/pages/landing";
import { RiContactsFill, RiHome9Fill } from "react-icons/ri";
import {
    FaSuperpowers,
    FaGithub,
    FaCode,
    FaChartLine,
    FaTrophy,
} from "react-icons/fa";
import {
    SiPaloaltonetworks,
    SiTrustpilot,
    SiLeetcode,
    SiCodeforces,
} from "react-icons/si";
import { GiRamProfile } from "react-icons/gi";
import { GrGallery, GrTechnology } from "react-icons/gr";

export default function Home() {
    return (
        <div className="overflow-hidden h-screen flex isolate relative">
            {/* Background Grid and Floating Elements */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

                {/* Floating Logo Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 text-4xl text-purple-400 opacity-15 animate-pulse">
                        <FaGithub />
                    </div>
                    <div className="absolute top-40 right-32 text-3xl text-yellow-400 opacity-15 animate-pulse">
                        <SiLeetcode />
                    </div>
                    <div className="absolute bottom-40 left-40 text-3xl text-blue-400 opacity-15 animate-pulse">
                        <SiCodeforces />
                    </div>
                    <div className="absolute bottom-20 right-20 text-2xl text-green-400 opacity-15 animate-pulse">
                        <FaCode />
                    </div>
                    <div className="absolute top-1/2 left-1/4 text-2xl text-pink-400 opacity-15 animate-pulse">
                        <FaChartLine />
                    </div>
                    <div className="absolute top-3/4 right-1/3 text-xl text-orange-400 opacity-15 animate-pulse">
                        <FaTrophy />
                    </div>
                </div>

                {/* Floating Code Snippets */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-16 left-10 text-purple-400/10 font-mono text-sm rotate-12 animate-pulse">
                        {'{ code: "amazing" }'}
                    </div>
                    <div className="absolute top-32 right-16 text-pink-400/10 font-mono text-sm -rotate-12 animate-pulse">
                        {'function() { return "awesome"; }'}
                    </div>
                    <div className="absolute bottom-32 left-16 text-blue-400/10 font-mono text-sm rotate-6 animate-pulse">
                        {'console.log("ProfiLer");'}
                    </div>
                    <div className="absolute bottom-16 right-32 text-green-400/10 font-mono text-sm -rotate-6 animate-pulse">
                        {'const skills = ["react", "node"];'}
                    </div>
                    <div className="absolute top-2/3 left-1/3 text-yellow-400/10 font-mono text-sm rotate-3 animate-pulse">
                        {"if (coding) return true;"}
                    </div>
                </div>

                {/* Parallax Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="parallax-bg absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="parallax-bg absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
                    <div className="parallax-bg absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                    <div className="parallax-bg absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="parallax-bg absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full opacity-25 animate-pulse"></div>
                    <div className="parallax-bg absolute top-3/4 right-1/2 w-2 h-2 bg-orange-400 rounded-full opacity-35 animate-pulse"></div>
                </div>
            </div>

            {/* <CustomCursor /> */}
            <Navbar
                list={[
                    "Home",
                    "Features",
                    "Gallery",
                    "Working",
                    "Technology",
                    "Why_Us",
                    "Contact_Us",
                ]}
                ListIcons={[
                    <RiHome9Fill key="Home" />,
                    <FaSuperpowers key="Features" />,
                    <GrGallery key="Gallery" />,
                    <SiPaloaltonetworks key="Working" />,
                    <GrTechnology key="Technology" />,
                    <SiTrustpilot key="Why_Us" />,
                    <RiContactsFill key="Contact_Us" />,
                ]}
            />
            <div className="relative z-10 ml-16 md:ml-20 lg:ml-65 flex-1 overflow-y-auto h-screen">
                <Landing />
            </div>

            <Button
                buttonIcon={<GiRamProfile />}
                button="ProfiLer"
                link="/dashboard"
            />
        </div>
    );
}

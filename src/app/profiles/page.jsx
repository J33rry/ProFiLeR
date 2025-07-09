"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import {
    FaGithub,
    FaCode,
    FaChartLine,
    FaTrophy,
    FaUser,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

import { RiHome9Fill } from "react-icons/ri";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import UserForm from "@/components/UserForm";
import { MdCompare } from "react-icons/md";
import MainProfile from "./MainProfile";
import { BiSolidDashboard } from "react-icons/bi";

function page() {
    const [AddForm, setAddForm] = useState(false);
    return (
        <div className="flex overflow-hidden relative">
            {/* Background Grid and Floating Elements */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

                {/* Floating Logo Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-24 left-24 text-3xl text-purple-400 opacity-10 animate-pulse">
                        <FaGithub />
                    </div>
                    <div className="absolute top-48 right-28 text-2xl text-yellow-400 opacity-10 animate-pulse">
                        <SiLeetcode />
                    </div>
                    <div className="absolute bottom-48 left-36 text-2xl text-blue-400 opacity-10 animate-pulse">
                        <SiCodeforces />
                    </div>
                    <div className="absolute bottom-24 right-24 text-xl text-green-400 opacity-10 animate-pulse">
                        <FaCode />
                    </div>
                    <div className="absolute top-1/3 left-1/3 text-2xl text-pink-400 opacity-10 animate-pulse">
                        <FaUser />
                    </div>
                    <div className="absolute top-2/3 right-1/4 text-xl text-orange-400 opacity-10 animate-pulse">
                        <FaTrophy />
                    </div>
                </div>

                {/* Floating Code Snippets */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-12 text-purple-400/8 font-mono text-xs rotate-15 animate-pulse">
                        {"profile.render();"}
                    </div>
                    <div className="absolute top-36 right-20 text-pink-400/8 font-mono text-xs -rotate-15 animate-pulse">
                        {"user.achievements.show();"}
                    </div>
                    <div className="absolute bottom-36 left-20 text-blue-400/8 font-mono text-xs rotate-8 animate-pulse">
                        {"stats.calculate();"}
                    </div>
                    <div className="absolute bottom-20 right-36 text-green-400/8 font-mono text-xs -rotate-8 animate-pulse">
                        {"portfolio.display();"}
                    </div>
                    <div className="absolute top-3/5 left-2/5 text-yellow-400/8 font-mono text-xs rotate-5 animate-pulse">
                        {"skills.map(skill => skill);"}
                    </div>
                </div>
            </div>

            <Navbar
                list={["Home", "Dashboard", "Profiles", "Compare"]}
                ListIcons={[
                    <RiHome9Fill key="home" />,
                    <BiSolidDashboard key="dashboard" />,
                    <GiPlagueDoctorProfile key="profiles" />,
                    <MdCompare key="compare" />,
                ]}
                currentPage="Profiles"
            />
            <div
                className={`ml-12 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-2 lg:p-8 relative z-10 ${
                    AddForm ? "blur-sm" : ""
                }`}
            >
                <MainProfile AddForm={AddForm} setAddForm={setAddForm} />
            </div>
            <UserForm AddForm={AddForm} setAddForm={setAddForm} />
        </div>
    );
}

export default page;

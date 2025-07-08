"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import {
    FaGithub,
    FaCode,
    FaChartLine,
    FaTrophy,
    FaUsers,
    FaBalanceScale,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

import { RiHome9Fill } from "react-icons/ri";
import { GiPlagueDoctorProfile } from "react-icons/gi";

import UserForm from "@/pages/UserForm";
import { MdCompare } from "react-icons/md";
import MainCompare from "./MainCompare";
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
                    <div className="absolute top-28 left-28 text-3xl text-purple-400 opacity-10 animate-pulse">
                        <FaGithub />
                    </div>
                    <div className="absolute top-52 right-32 text-2xl text-yellow-400 opacity-10 animate-pulse">
                        <SiLeetcode />
                    </div>
                    <div className="absolute bottom-52 left-32 text-2xl text-blue-400 opacity-10 animate-pulse">
                        <SiCodeforces />
                    </div>
                    <div className="absolute bottom-28 right-28 text-xl text-green-400 opacity-10 animate-pulse">
                        <FaCode />
                    </div>
                    <div className="absolute top-1/4 left-1/2 text-2xl text-pink-400 opacity-10 animate-pulse">
                        <FaUsers />
                    </div>
                    <div className="absolute top-3/4 right-1/2 text-xl text-orange-400 opacity-10 animate-pulse">
                        <FaBalanceScale />
                    </div>
                    <div className="absolute top-1/2 left-1/5 text-2xl text-cyan-400 opacity-10 animate-pulse">
                        <FaChartLine />
                    </div>
                </div>

                {/* Floating Code Snippets */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-24 left-16 text-purple-400/8 font-mono text-xs rotate-12 animate-pulse">
                        {"compare(user1, user2);"}
                    </div>
                    <div className="absolute top-40 right-24 text-pink-400/8 font-mono text-xs -rotate-12 animate-pulse">
                        {"let winner = getBest();"}
                    </div>
                    <div className="absolute bottom-40 left-24 text-blue-400/8 font-mono text-xs rotate-6 animate-pulse">
                        {"analytics.compare();"}
                    </div>
                    <div className="absolute bottom-24 right-40 text-green-400/8 font-mono text-xs -rotate-6 animate-pulse">
                        {"rankings.update();"}
                    </div>
                    <div className="absolute top-2/3 left-1/3 text-yellow-400/8 font-mono text-xs rotate-3 animate-pulse">
                        {"vs.battle.start();"}
                    </div>
                    <div className="absolute top-1/3 right-1/3 text-cyan-400/8 font-mono text-xs -rotate-3 animate-pulse">
                        {"match.results();"}
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
                currentPage="Compare"
            />
            <div
                className={`ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 ${
                    AddForm ? "blur-md" : ""
                }`}
            >
                <MainCompare />
            </div>
            <UserForm AddForm={AddForm} setAddForm={setAddForm} />
        </div>
    );
}

export default page;

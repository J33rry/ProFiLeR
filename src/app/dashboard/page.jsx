"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { RiHome9Fill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { MdCompare } from "react-icons/md";
import MainProfile from "../profiles/MainProfile";
import { useData } from "@/context/Datacontext";
import Button from "@/components/Button";
import {
    FaGithub,
    FaCode,
    FaChartLine,
    FaTrophy,
    FaUserPlus,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import UserForm from "@/pages/UserForm";
import MainDashboard from "./MainDashboard";

function Page() {
    const [addForm, setAddForm] = useState(false);
    const { data, loading, error } = useData();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Error loading data: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex overflow-hidden relative">
            {/* Background Grid and Floating Elements */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

                {/* Floating Logo Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 text-3xl text-purple-400 opacity-10 animate-pulse">
                        <FaGithub />
                    </div>
                    <div className="absolute top-40 right-32 text-2xl text-yellow-400 opacity-10 animate-pulse">
                        <SiLeetcode />
                    </div>
                    <div className="absolute bottom-40 left-40 text-2xl text-blue-400 opacity-10 animate-pulse">
                        <SiCodeforces />
                    </div>
                    <div className="absolute bottom-20 right-20 text-xl text-green-400 opacity-10 animate-pulse">
                        <FaCode />
                    </div>
                    <div className="absolute top-1/2 left-1/4 text-2xl text-pink-400 opacity-10 animate-pulse">
                        <FaChartLine />
                    </div>
                    <div className="absolute top-3/4 right-1/3 text-xl text-orange-400 opacity-10 animate-pulse">
                        <FaTrophy />
                    </div>
                </div>

                {/* Floating Code Snippets */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-16 left-10 text-purple-400/8 font-mono text-xs rotate-12 animate-pulse">
                        {"const dashboard = () => {};"}
                    </div>
                    <div className="absolute top-32 right-16 text-pink-400/8 font-mono text-xs -rotate-12 animate-pulse">
                        {'let progress = "tracking";'}
                    </div>
                    <div className="absolute bottom-32 left-16 text-blue-400/8 font-mono text-xs rotate-6 animate-pulse">
                        {"analytics.display();"}
                    </div>
                    <div className="absolute bottom-16 right-32 text-green-400/8 font-mono text-xs -rotate-6 animate-pulse">
                        {"user.stats.update();"}
                    </div>
                    <div className="absolute top-2/3 left-1/3 text-yellow-400/8 font-mono text-xs rotate-3 animate-pulse">
                        {"if (coding) return true;"}
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
                currentPage="Dashboard"
            />
            <div
                className={`ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 ${
                    addForm ? "blur-lg" : ""
                }`}
            >
                <MainDashboard />
            </div>
            <Button
                button="Add User"
                buttonIcon={<FaUserPlus />}
                setAddForm={setAddForm}
                link="/addUser"
            />
            <UserForm AddForm={addForm} setAddForm={setAddForm} />
        </div>
    );
}

export default Page;

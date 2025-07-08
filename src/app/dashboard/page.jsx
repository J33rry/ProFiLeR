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
import { FaUserPlus } from "react-icons/fa";
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
        <div className="flex overflow-hidden">
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
                className={`ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-4 lg:p-8 ${
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

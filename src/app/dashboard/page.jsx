"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { RiHome9Fill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { GiPlagueDoctorProfile } from "react-icons/gi";

import UserForm from "@/pages/UserForm";
import { MdCompare } from "react-icons/md";
function page() {
    const [AddForm, setAddForm] = useState(false);
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
                className={`ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-4 lg:p-8  ${
                    AddForm ? "blur-lg" : ""
                }`}
            >
                <div className="h-[200vh]">
                    <h1 className="text-4xl font-bold mb-4">Main Content</h1>
                    <p>This area scrolls independently of the sidebar.</p>
                </div>
            </div>
            <UserForm AddForm={AddForm} setAddForm={setAddForm} />
        </div>
    );
}

export default page;

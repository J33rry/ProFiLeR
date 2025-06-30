import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import React from "react";
import { RiHome9Fill } from "react-icons/ri";

import { BiSolidDashboard } from "react-icons/bi";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { MdGroupAdd } from "react-icons/md";

function page() {
    return (
        <div className="flex overflow-hidden">
            <Navbar
                list={["Home", "Dashboard", "Profiles", "Info"]}
                ListIcons={[
                    <RiHome9Fill key="home" />,
                    <BiSolidDashboard key="dashboard" />,
                    <GiPlagueDoctorProfile key="profiles" />,
                    <BsFillInfoSquareFill key="info" />,
                ]}
                currentPage="Info"
            />
            <div className="ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-4 lg:p-8bg-green-400">
                <div className="h-[200vh]">
                    <h1 className="text-4xl font-bold mb-4">Main Content</h1>
                    <p>This area scrolls independently of the sidebar.</p>
                </div>
            </div>
            <Button
                button="Add New Profile"
                link="/addUser"
                buttonIcon={<MdGroupAdd />}
            />
        </div>
    );
}

export default page;

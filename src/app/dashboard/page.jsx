import Navbar from "@/components/Navbar";
import React from "react";

function page() {
    return (
        <div className="bg-red-800 h-screen w-screen">
            <Navbar
                list={["Home", "Dashboard", "Profiles", "Info"]}
                button="Add User"
                currentPage="Dashboard"
            />
        </div>
    );
}

export default page;

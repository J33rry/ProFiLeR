import Navbar from "@/components/Navbar";
import React from "react";

function page() {
    return (
        <div className="bg-yellow-600 h-screen w-screen">
            <Navbar
                list={["Home", "Dashboard", "Profiles", "Info"]}
                button="Add User"
                currentPage="Profiles"
            />
        </div>
    );
}

export default page;

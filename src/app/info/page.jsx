import Navbar from "@/components/Navbar";
import React from "react";

function page() {
    return (
        <div>
            <Navbar
                list={["Home", "Dashboard", "Profiles", "Info"]}
                button="Add User"
                currentPage="Info"
            />
        </div>
    );
}

export default page;

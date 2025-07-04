import Search from "@/components/Search";
import React from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";

function MainProfile() {
    return (
        <div className="border-2 border-zinc-500 rounded-2xl border-l-0 min-h-[90vh] rounded-l-md">
            <div className="flex justify-between items-center mx-4 p-2 mt-8 bg-gradient-to-l from-zinc-300/40 to-zinc-300/0 rounded-2xl">
                <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest flex items-center gap-3 ">
                    Profiles :
                    <GiPlagueDoctorProfile />
                </h1>
                <Search />
            </div>
        </div>
    );
}

export default MainProfile;

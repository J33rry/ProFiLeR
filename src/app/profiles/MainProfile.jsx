"use client";
import RandomUser from "@/components/RandomUser";
import Search from "@/components/Search";
import { useData } from "@/context/Datacontext";
import React, { useEffect, useState } from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import Github from "./Github";
import Codeforces from "./Codeforces";
import Leetcode from "./Leetcode";
import { FaUserAlt } from "react-icons/fa";

function MainProfile({ AddForm, setAddForm }) {
    const { data } = useData();
    const [search, setSearch] = useState("");
    const handleClick = () => {
        setAddForm(true);
    };

    const filteredProfiles = data?.filter(
        (user) =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.github_username
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            user.leetcode_username
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            user.codeforces_username
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    console.log("Data in MainProfile:", data);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (data !== null) {
            setLoading(false);
        }
    }, [data]);

    return (
        <div className="border-2 border-zinc-500 rounded-2xl border-l-0 min-h-[90vh] rounded-l-md">
            <div className="flex justify-between items-center mx-2 lg:mx-4 p-2 mt-4 lg:mt-8 bg-gradient-to-l from-zinc-300/40 to-zinc-300/0 rounded-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest flex items-center gap-3 ">
                    Profiles :
                    <GiPlagueDoctorProfile />
                </h1>
                <Search setSearch={setSearch} search={search} />
            </div>
            <div
                className="flex gap-2 bg-white/20 backdrop-blur-lg m-2 lg:m-4 p-1 md:p-3 lg:p-1 xl:p-3 rounded-2xl shadow-lg items-center justify-center text-2xl md:text-3xl lg:text-4xl cursor-pointer hover:shadow-lg hover:shadow-white/30 transition-all duration-300 text-zinc-300 hover:text-white"
                onClick={handleClick}
                data-cursor
            >
                <FaUserAlt />
                ADD PROFILE
            </div>
            {loading && (
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                </div>
            )}
            {!loading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-2 md:p-4 lg:p-2 xl:p-4">
                    {filteredProfiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="grid grid-cols-3 md:grid-cols-[39%_20%_39%] lg:grid-cols-3 xl:grid-cols-[39%_20%_39%] grid-rows-3 gap-2 bg-white/20 backdrop-blur-lg p-1 md:p-3 lg:p-1 xl:p-3 rounded-2xl shadow-lg"
                            // onClick={() => {
                            //     console.log("Profile clicked:", profile);
                            // }}
                        >
                            {/* Avatar */}
                            <div className="bg-white col-start-2 col-span-1 row-start-2 row-span-1 rounded-lg shadow-md">
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.name}
                                    className="rounded-lg"
                                />
                            </div>
                            {/* User Info */}
                            <div className="bg-white/40 backdrop-blur-lg rounded-xl p-1 md:p-4 lg:p-1 xl:p-4 shadow-md flex items-end justify-between text-center col-span-2 col-start-1 row-span-1 row-start-1">
                                <RandomUser />
                                <div className="text-xl leading-5 md:leading-7 md:text-3xl lg:text-xl xl:text-3xl font-bold text-right lg:leading-5 xl:leading-7">
                                    <h1>{profile.name}</h1>
                                </div>
                            </div>

                            {/* GitHub Info */}
                            <Github profile={profile} />
                            {/* Codeforces Info */}
                            <Codeforces profile={profile} />
                            {/* LeetCode Info */}
                            <Leetcode profile={profile} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainProfile;

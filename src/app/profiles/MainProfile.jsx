"use client";
import RandomUser from "@/components/RandomUser";
import Search from "@/components/Search";
import { useData } from "@/context/Datacontext";
import React, { useEffect, useState } from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";

function MainProfile() {
    const { data } = useData();
    console.log("Data in MainProfile:", data);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (data !== null) {
            setLoading(false);
        }
    }, [data]);
    return (
        <div className="border-2 border-zinc-500 rounded-2xl border-l-0 min-h-[90vh] rounded-l-md">
            <div className="flex justify-between items-center mx-4 p-2 mt-8 bg-gradient-to-l from-zinc-300/40 to-zinc-300/0 rounded-2xl">
                <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest flex items-center gap-3 ">
                    Profiles :
                    <GiPlagueDoctorProfile />
                </h1>
                {/* <Search /> */}
            </div>
            {loading && (
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                </div>
            )}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    {data.map((profile) => (
                        <div
                            key={profile.id}
                            className="grid grid-cols-[39%_20%_39%] grid-rows-3 gap-2 bg-white/20 backdrop-blur-lg p-3 rounded-2xl shadow-lg"
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
                            <div className="bg-white/40 backdrop-blur-lg rounded-xl p-4 shadow-md flex items-end justify-between text-center col-span-2 col-start-1 row-span-1 row-start-1">
                                <div className="">
                                    {/* <FaUserAstronaut className="size-18" /> */}
                                    <RandomUser />
                                </div>
                                <div className="text-3xl font-bold text-right">
                                    <h1>{profile.name}</h1>
                                </div>
                            </div>

                            {/* GitHub Info */}
                            <div className="bg-white rounded-xl p-4 shadow-md col-start-3 col-span-1 row-start-1 row-span-2">
                                <h3 className="font-semibold text-md mb-2 text-gray-700">
                                    GitHub: {profile.github_username}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Public Repos: {profile.public_repos}
                                </p>
                                <ul className="text-xs mt-2 list-disc list-inside">
                                    {profile.github_repos
                                        ?.slice(0, 3)
                                        .map((repo, i) => (
                                            <li key={i}>{repo.name}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* Codeforces Info */}
                            <div className="bg-white rounded-xl p-4 shadow-md col-start-1 col-span-1 row-start-2 row-span-2">
                                <h3 className="font-semibold text-md mb-2 text-purple-600">
                                    Codeforces: {profile.codeforces_username}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Rank: {profile.cf_rank} • Rating:{" "}
                                    {profile.cf_rating}
                                </p>
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500">
                                        Recent Contests:
                                    </p>
                                    <ul className="text-xs list-disc list-inside">
                                        {profile.contests
                                            ?.slice(-2)
                                            .map((contest, i) => (
                                                <li key={i}>
                                                    {contest.contestName}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>

                            {/* LeetCode Info */}
                            <div className="bg-white rounded-xl p-4 shadow-md col-start-2 col-span-2 row-start-3 row-span-1">
                                <h3 className="font-semibold text-md mb-2 text-orange-600">
                                    LeetCode: {profile.leetcode_username}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Easy: {profile.problemEasy} • Medium:{" "}
                                    {profile.problemMedium} • Hard:{" "}
                                    {profile.problemHard}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Global Ranking: #{profile.ranking}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainProfile;

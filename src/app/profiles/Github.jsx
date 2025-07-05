import React from "react";
import Lottie from "lottie-react";
import githubAnim from "./github.json";
import { FaRegDotCircle } from "react-icons/fa";
import { FiMaximize } from "react-icons/fi";

function Github({ profile }) {
    return (
        <div className="bg-white/30 rounded-xl p-3 shadow-md col-start-3 col-span-1 row-start-1 row-span-2 flex flex-col items-start justify-between">
            <div className="">
                <div className="flex items-center justify-center h-20">
                    <div className="w-22 h-22">
                        <Lottie animationData={githubAnim} loop autoplay />
                    </div>
                    <div className="">
                        <h3 className="font-bold text-xl text-gray-700">
                            {profile.github_username}
                        </h3>
                        <p className="leading-4 text-gray-600 font-semibold">
                            {profile.github_name}
                        </p>
                    </div>
                </div>
                <div className="tracking-tight m-0 leading-4">
                    {profile.github_bio
                        ? `"${profile.github_bio.slice(0, 40)}..."`
                        : `"No Bio"`}
                </div>
                <div className="text-white/80 font-semibold">
                    Public Repos : {profile.public_repos}
                </div>
            </div>
            {/* 
            <div className="text-lg h-[35%] w-full bg-white/20 rounded-lg flex flex-col items-start justify-center p-3 leading-5 gap-2 relative">
                <ul className="w-full list-disc list-inside space-y-1">
                    {profile.repos?.slice(0, 2).map((repo, i) => (
                        <li key={i} className="flex items-center gap-2">
                            {repo.name}
                        </li>
                    ))}
                </ul>

                <div className="absolute bottom-0 right-0 p-1 bg-white/40 rounded-lg m-1 hover:bg-white/60 transition-all border border-white/30 hover:shadow-md hover:shadow-black/20 cursor-pointer">
                    <FiMaximize size={25} />
                </div>
            </div> */}
            <div className="h-[35%] w-full bg-white/20 rounded-lg p-2 relative">
                <div className="text-md text-zinc-300 font-semibold">
                    Repos:
                </div>
                <ul className="list-disc list-inside text-sm text-zinc-100 leading-5">
                    {profile.repos?.slice(0, 2).map((repo, i) => (
                        <li key={i}>{repo.name}</li>
                    ))}
                </ul>
                <div className="absolute bottom-0 right-0 p-1 bg-white/40 rounded-lg m-1 hover:bg-white/60 transition-all border border-white/30 hover:shadow-md hover:shadow-black/20 cursor-pointer text-zinc-800">
                    <FiMaximize size={25} />
                </div>
            </div>
        </div>
    );
}

export default Github;

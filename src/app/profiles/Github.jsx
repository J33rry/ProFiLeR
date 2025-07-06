import React from "react";
import Lottie from "lottie-react";
import githubAnim from "./github.json";
import { FiMaximize } from "react-icons/fi";

function Github({ profile }) {
    return (
        <div className="bg-white/30 rounded-xl p-0.5 md:p-3 lg:p-0.5 xl:p-3 shadow-md col-start-3 col-span-1 row-start-1 row-span-2 flex flex-col items-start justify-between">
            <div className="">
                <div className="flex flex-row items-start pt-2 md:p-0 lg:pt-2 xl:p-0 justify-start">
                    <div className="w-8 md:w-20 lg:w-8 xl:w-20 h-8 md:h-20 lg:h-8 xl:h-20">
                        <Lottie animationData={githubAnim} loop autoplay />
                    </div>
                    <div className="">
                        <h3 className="font-bold text-xs md:text-xl lg:text-xs xl:text-xl text-gray-700">
                            {profile.github_username}
                        </h3>
                        <p className="leading-4 text-xs md:text-xl lg:text-xs xl:text-xl text-gray-600 font-semibold text-wrap">
                            {profile.github_name}
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex lg:hidden xl:flex tracking-tight text-sm md:text-lg m-0 leading-4">
                    {profile.github_bio
                        ? `"${profile.github_bio.slice(0, 40)}..."`
                        : `"No Bio"`}
                </div>
                <div className="text-white/80 text-sm md:text-lg lg:text-sm xl:text-lg font-semibold">
                    Repos: {profile.public_repos}
                </div>
            </div>
            <div className="h-[45%] w-full bg-white/20 rounded-xl md:rounded-md p-1 md:p-2 lg:p-1 xl:p-2 lg:rounded-xl xl:rounded-md relative">
                <div className="text-sm md:text-lg lg:text-sm xl:text-lg text-zinc-300 font-semibold">
                    Repos:
                </div>
                <ul className="list-disc list-inside text-xs md:text-sm lg:text-xs xl:text-sm text-zinc-100 leading-3 md:leading-5 lg:leading-3 xl:leading-5">
                    {profile.repos?.slice(0, 2).map((repo, i) => (
                        <li key={i}>{repo.name}</li>
                    ))}
                </ul>
                <div className="absolute bottom-0 right-0 p-1 bg-white/40 rounded-lg m-1 hover:bg-white/60 transition-all border border-white/30 hover:shadow-md hover:shadow-black/20 cursor-pointer text-zinc-800">
                    <FiMaximize className="size-4 md:size-5 lg:size-4 xl:size-5" />
                </div>
            </div>
        </div>
    );
}

export default Github;

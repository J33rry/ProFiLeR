import React from "react";
import { FiMaximize } from "react-icons/fi";
import { SiCodeforces } from "react-icons/si";

function Codeforces({ profile }) {
    return (
        <div className="bg-[#435e9d]/30 rounded-xl p-2 md:p-3 lg:p-2 xl:p-3 shadow-md col-start-2 col-span-2 row-start-3 row-span-1 flex items-start justify-between">
            <div className="flex flex-col items-start justify-between">
                <SiCodeforces className="md:w-12 md:h-12 lg:w-auto lg:h-auto  text-zinc-300 xl:w-12 xl:h-12" />
                <h3 className="font-bold text-xs md:text-xl lg:text-xs xl:text-xl text-zinc-300">
                    {profile.codeforces_username}
                </h3>

                <p className="text-xs md:text-md lg:text-xs xl:text-md text-zinc-300/70">
                    {profile.codeforces_rank
                        ? profile.codeforces_rank
                        : "unranked"}{" "}
                    • #
                    {profile.codeforces_rating
                        ? profile.codeforces_rating
                        : "unrated"}
                </p>
            </div>
            <div className="w-[60%] h-[100%] rounded-lg p-1 md:p-2 lg:p-1 xl:p-2 bg-white/10 relative">
                <p className="text-sm md:text-lg lg:text-sm xl:text-lg text-zinc-400">
                    Recent Contest:
                </p>
                <div className="text-xs md:text-sm lg:text-xs xl:text-sm text-zinc-300">
                    {profile.codeforces_contest?.slice(-1).map((contest, i) => (
                        <div key={i}>{contest.contestName}</div>
                    ))}
                </div>
                <div className="absolute bottom-0 right-0 p-1 bg-white/40 rounded-lg m-1 hover:bg-white/60 transition-all border border-white/30 hover:shadow-md hover:shadow-black/20 cursor-pointer text-zinc-300">
                    <FiMaximize className="size-4 md:size-5 lg:size-4 xl:size-5" />
                </div>
            </div>
        </div>
    );
}

export default Codeforces;

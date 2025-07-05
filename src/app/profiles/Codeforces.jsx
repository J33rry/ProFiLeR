import React from "react";
import { FiMaximize } from "react-icons/fi";
import { SiCodeforces } from "react-icons/si";

function Codeforces({ profile }) {
    const data = [
        {
            contestId: 2,
            contestName: "Codeforces Beta Round 2",
            handle: "tourist",
            rank: 14,
            ratingUpdateTimeSeconds: 1267124400,
            oldRating: 0,
            newRating: 1602,
        },
        {
            contestId: 8,
            contestName: "Codeforces Beta Round 8",
            handle: "tourist",
            rank: 5,
            ratingUpdateTimeSeconds: 1270748700,
            oldRating: 1602,
            newRating: 1764,
        },
        {
            contestId: 10,
            contestName: "Codeforces Beta Round 10",
            handle: "tourist",
            rank: 18,
            ratingUpdateTimeSeconds: 1271353500,
            oldRating: 1764,
            newRating: 1878,
        },
        {
            contestId: 13,
            contestName: "Codeforces Beta Round 13",
            handle: "tourist",
            rank: 11,
            ratingUpdateTimeSeconds: 1273161600,
            oldRating: 1878,
            newRating: 1967,
        },
        {
            contestId: 19,
            contestName: "Codeforces Beta Round 19",
            handle: "tourist",
            rank: 2,
            ratingUpdateTimeSeconds: 1277398800,
            oldRating: 1967,
            newRating: 2063,
        },
        {
            contestId: 23,
            contestName: "Codeforces Beta Round 23",
            handle: "tourist",
            rank: 15,
            ratingUpdateTimeSeconds: 1278694800,
            oldRating: 2063,
            newRating: 2081,
        },
        {
            contestId: 24,
            contestName: "Codeforces Beta Round 24",
            handle: "tourist",
            rank: 20,
            ratingUpdateTimeSeconds: 1280156400,
            oldRating: 2081,
            newRating: 2098,
        },
        {
            contestId: 28,
            contestName: "Codeforces Beta Round 28 (Codeforces format)",
            handle: "tourist",
            rank: 11,
            ratingUpdateTimeSeconds: 1284742800,
            oldRating: 2098,
            newRating: 2128,
        },
        {
            contestId: 33,
            contestName: "Codeforces Beta Round 33 (Codeforces format)",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1286470800,
            oldRating: 2128,
            newRating: 2203,
        },
        {
            contestId: 37,
            contestName: "Codeforces Beta Round 37",
            handle: "tourist",
            rank: 3,
            ratingUpdateTimeSeconds: 1288026000,
            oldRating: 2203,
            newRating: 2256,
        },
        {
            contestId: 38,
            contestName:
                "School Personal Contest #1 (Winter Computer School 2010/11) - Codeforces Beta Round 38 (ACM-ICPC Rules)",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1288454400,
            oldRating: 2256,
            newRating: 2270,
        },
        {
            contestId: 40,
            contestName: "Codeforces Beta Round 39",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1288980000,
            oldRating: 2270,
            newRating: 2311,
        },
        {
            contestId: 42,
            contestName: "Codeforces Beta Round 41",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1290103200,
            oldRating: 2311,
            newRating: 2341,
        },
        {
            contestId: 46,
            contestName:
                "School Personal Contest #2 (Winter Computer School 2010/11) - Codeforces Beta Round 43 (ACM-ICPC Rules)",
            handle: "tourist",
            rank: 2,
            ratingUpdateTimeSeconds: 1291546800,
            oldRating: 2341,
            newRating: 2351,
        },
        {
            contestId: 51,
            contestName: "Codeforces Beta Round 48",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1293561000,
            oldRating: 2351,
            newRating: 2388,
        },
        {
            contestId: 57,
            contestName: "Codeforces Beta Round 53",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1295978400,
            oldRating: 2388,
            newRating: 2419,
        },
        {
            contestId: 60,
            contestName: "Codeforces Beta Round 56",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1298138400,
            oldRating: 2419,
            newRating: 2438,
        },
        {
            contestId: 62,
            contestName: "Codeforces Beta Round 58",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1298656800,
            oldRating: 2438,
            newRating: 2455,
        },
        {
            contestId: 67,
            contestName: "Manthan 2011",
            handle: "tourist",
            rank: 1,
            ratingUpdateTimeSeconds: 1300044600,
            oldRating: 2455,
            newRating: 2491,
        },
        {
            contestId: 73,
            contestName: "Codeforces Beta Round 66",
            handle: "tourist",
            rank: 3,
            ratingUpdateTimeSeconds: 1302431400,
            oldRating: 2491,
            newRating: 2494,
        },
    ];

    return (
        <div className="bg-[#435e9d]/30 rounded-xl p-3 shadow-md col-start-2 col-span-2 row-start-3 row-span-1 flex items-start justify-between">
            <div className="flex flex-col items-start">
                <SiCodeforces className="w-12 h-12 text-zinc-300" />
                <h3 className="font-bold text-xl text-zinc-300">
                    {profile.codeforces_username}
                </h3>

                <p className="text-md text-zinc-300/70">
                    {profile.codeforces_rank
                        ? profile.codeforces_rank
                        : "unranked"}{" "}
                    • #
                    {profile.codeforces_rating
                        ? profile.codeforces_rating
                        : "unrated"}
                </p>
            </div>
            <div className="w-[60%] h-[100%] rounded-lg p-2 bg-white/10 relative">
                <p className="text-md text-zinc-400">Recent Contests:</p>
                <ul className="text-sm list-disc text-zinc-300 list-inside">
                    {profile.codeforces_contest?.slice(-2).map((contest, i) => (
                        <li key={i}>{contest.contestName}</li>
                    ))}
                </ul>
                <div className="absolute bottom-0 right-0 p-1 bg-white/40 rounded-lg m-1 hover:bg-white/60 transition-all border border-white/30 hover:shadow-md hover:shadow-black/20 cursor-pointer text-zinc-300">
                    <FiMaximize size={25} />
                </div>
            </div>
        </div>
    );
}

export default Codeforces;

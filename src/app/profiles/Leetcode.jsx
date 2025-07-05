import React from "react";
import { SiLeetcode } from "react-icons/si";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function Leetcode({ profile }) {
    // const data = {
    //     labels: ["Easy", "Medium", "Hard"],
    //     datasets: [
    //         {
    //             label: "LeetCode Problems",
    //             data: [
    //                 profile.problem_easy,
    //                 profile.problem_medium,
    //                 profile.problem_hard,
    //             ],
    //             backgroundColor: ["#00C49F", "#FFBB28", "#FF8042"],
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    // const options = {
    //     rotation: -135,
    //     circumference: 270,
    //     cutout: "92%",
    //     size: {
    //         width: "60",
    //         height: "60%",
    //     },
    //     plugins: {
    //         legend: {
    //             display: false,
    //             position: "bottom",
    //         },
    //     },
    // };
    const solved =
        profile.problem_easy + profile.problem_medium + profile.problem_hard;
    const totaleasy = 884;
    const totalmedium = 1874;
    const totalhard = 847;

    const data = {
        labels: [
            "Easy",
            "Easy_Left",
            "Medium",
            "Medium_Left",
            "Hard",
            "Hard_Left",
        ],
        datasets: [
            {
                data: [
                    profile.problem_easy,
                    totaleasy - profile.problem_easy,
                    profile.problem_medium,
                    totalmedium - profile.problem_medium,
                    profile.problem_hard,
                    totalhard - profile.problem_hard,
                ],
                backgroundColor: [
                    "#1dbbbb", // Easy - Teal
                    "#294c4b", // Unsolved - Dark gray background arc
                    "#ffb600", // Medium - Yellow
                    "#5e4a25", // Unsolved - Dark gray background arc
                    "#f63836", // Hard - Red
                    "#5a2b2b", // Unsolved - Dark gray background arc
                ],
                borderWidth: 0,
                // cutout: "90%",
                spacing: 2,
                borderRadius: {
                    outerStart: 5,
                    outerEnd: 5,
                    innerStart: 5,
                    innerEnd: 5,
                },
            },
        ],
    };

    const options = {
        cutout: "92%",
        rotation: -135,
        circumference: 270,
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="bg-[#282828]/30 rounded-xl shadow-md col-start-1 col-span-1 row-start-2 row-span-2 flex flex-col items-center">
            <div className="w-[100%] flex items-center justify-start p-4 gap-2">
                <SiLeetcode size={62} className="text-[#e2911c]" />
                <div className="text-right ">
                    <h3 className="font-bold text-xl text-[#e2911c]">
                        {profile.leetcode_username}
                    </h3>
                    <p className="text-lg font-semibold text-[#e2911c]/70">
                        #{profile.leetcode_ranking}
                    </p>
                </div>
            </div>
            <div className="w-[60%]">
                <div className="relative">
                    <Doughnut data={data} options={options} className="" />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center leading-2">
                        <div className="flex items-baseline">
                            <div className="text-3xl font-bold">{solved}</div>
                            <div className="">
                                /{totaleasy + totalmedium + totalhard}
                            </div>
                        </div>
                        <div className="">Solved</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leetcode;

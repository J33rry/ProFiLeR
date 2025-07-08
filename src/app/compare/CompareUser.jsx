import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaGithub, FaCode, FaKeyboard } from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function CompareUser({ user, setUser, setOpen }) {
    if (!user) {
        return null;
    }

    const handleClose = () => {
        setUser(null);
        setOpen(false);
    };

    // Data for LeetCode Doughnut Chart
    const leetcodeChartData = {
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
            {
                label: "Problems Solved",
                data: [
                    user.problem_easy ?? 0,
                    user.problem_medium ?? 0,
                    user.problem_hard ?? 0,
                ],
                backgroundColor: [
                    "rgba(0, 184, 163, 0.7)",
                    "rgba(255, 192, 30, 0.7)",
                    "rgba(239, 71, 67, 0.7)",
                ],
                borderColor: [
                    "rgba(0, 184, 163, 1)",
                    "rgba(255, 192, 30, 1)",
                    "rgba(239, 71, 67, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Data for Codeforces Line Chart
    const codeforcesChartData = {
        labels:
            user.codeforces_contest?.map((c) => c.contestName).slice(-10) || [], // Show last 10 contests
        datasets: [
            {
                label: "Rating",
                data:
                    user.codeforces_contest
                        ?.map((c) => c.newRating)
                        .slice(-10) || [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "white", // Legend text color
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "white", // Y-axis labels
                },
            },
            x: {
                ticks: {
                    color: "white", // X-axis labels
                },
            },
        },
    };

    return (
        <div className="relative flex flex-col gap-4 p-4 border border-white/20 rounded-lg bg-white/5 w-full h-full overflow-y-auto">
            {/* Close Button */}
            <div
                className="absolute top-2 right-2 text-2xl lg:text-3xl p-1 rounded-lg hover:bg-white/10 transition-colors"
                data-cursor
                onClick={handleClose}
            >
                <MdOutlineClose />
            </div>

            {/* General Info */}
            <div className="flex flex-col items-center gap-2 border-b border-white/10 pb-4">
                <img
                    src={user.avatar_url}
                    alt={user.id}
                    className="w-24 h-24 rounded-full"
                />
                <h2 className="text-2xl font-bold">{user.name}</h2>
            </div>

            {/* Stats Sections */}
            <div className="flex flex-col gap-6 pt-2">
                {/* GitHub Stats */}
                {user ? (
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FaGithub /> GitHub
                        </h3>
                        <p>Public Repos: {user.public_repos ?? "N/A"}</p>
                    </div>
                ) : (
                    <p>No GitHub data available.</p>
                )}

                {/* LeetCode Stats */}
                {user.leetcode_problems ? (
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FaKeyboard /> LeetCode
                        </h3>
                        <p>Total Solved: {user.leetcode_problems ?? "N/A"}</p>
                        <div className="max-w-[250px] mx-auto">
                            <Doughnut
                                data={leetcodeChartData}
                                options={{
                                    plugins: {
                                        legend: { labels: { color: "white" } },
                                    },
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <p>No LeetCode data available.</p>
                )}

                {/* Codeforces Stats */}
                {user.codeforces_username ? (
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FaCode /> Codeforces
                        </h3>
                        <p>Rating: {user.codeforces_rating ?? "N/A"}</p>
                        <p>Rank: {user.codeforces_rank ?? "N/A"}</p>
                        {user.codeforces_contest &&
                            user.codeforces_contest.length > 0 && (
                                <Line
                                    data={codeforcesChartData}
                                    options={chartOptions}
                                />
                            )}
                    </div>
                ) : (
                    <p>No Codeforces data available.</p>
                )}
            </div>
        </div>
    );
}

export default CompareUser;

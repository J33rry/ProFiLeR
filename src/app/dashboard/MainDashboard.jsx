"use client";
import React from "react";
import { useData } from "@/context/Datacontext";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { BiSolidDashboard } from "react-icons/bi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function MainDashboard() {
    const { data, loading, error } = useData();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-red-500 text-center">Error: {error}</p>
            </div>
        );
    }

    // --- Data Processing ---

    // Key Metrics
    const totalUsers = data?.length || 0;
    const totalPublicRepos =
        data?.reduce((sum, user) => sum + (user.public_repos || 0), 0) || 0;
    const totalLeetcodeSolved =
        data?.reduce((sum, user) => sum + (user.leetcode_problems || 0), 0) ||
        0;

    // Leaderboards
    const githubLeaderboard = [...(data || [])]
        .sort((a, b) => (b.followers || 0) - (a.followers || 0))
        .slice(0, 5);

    // Codeforces Rank Distribution
    const rankCounts = data?.reduce((acc, user) => {
        const rank = user.codeforces_rank || "Unranked";
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
    }, {});

    const rankChartData = {
        labels: Object.keys(rankCounts || {}),
        datasets: [
            {
                label: "Number of Users",
                data: Object.values(rankCounts || {}),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    // LeetCode Problem Distribution
    const leetcodeDistribution = data?.reduce(
        (acc, user) => {
            acc.easy += user.problem_easy || 0;
            acc.medium += user.problem_medium || 0;
            acc.hard += user.problem_hard || 0;
            return acc;
        },
        { easy: 0, medium: 0, hard: 0 }
    );

    const leetcodeChartData = {
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
            {
                data: [
                    leetcodeDistribution?.easy,
                    leetcodeDistribution?.medium,
                    leetcodeDistribution?.hard,
                ],
                backgroundColor: [
                    "rgba(0, 184, 163, 0.7)",
                    "rgba(255, 192, 30, 0.7)",
                    "rgba(239, 71, 67, 0.7)",
                ],
            },
        ],
    };

    const chartOptions = {
        plugins: { legend: { labels: { color: "white" } } },
        scales: {
            y: { ticks: { color: "white" } },
            x: { ticks: { color: "white" } },
        },
    };

    return (
        <div className="border-2 border-zinc-500 rounded-2xl border-l-0 min-h-[90vh] rounded-l-md">
            {/* Header */}
            <div className="flex justify-between items-center mx-2 lg:mx-4 p-2 mt-4 lg:mt-8 bg-gradient-to-l from-zinc-300/40 to-zinc-300/0 rounded-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest flex items-center gap-3">
                    Dashboard :
                    <BiSolidDashboard />
                </h1>
            </div>

            <div className="p-2 md:p-4 lg:p-2 xl:p-4 space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg text-center">
                        <h3 className="text-xl font-bold">Total Users</h3>
                        <p className="text-3xl">{totalUsers}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg text-center">
                        <h3 className="text-xl font-bold">
                            Total Public Repos
                        </h3>
                        <p className="text-3xl">{totalPublicRepos}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg text-center">
                        <h3 className="text-xl font-bold">
                            Total LeetCode Solved
                        </h3>
                        <p className="text-3xl">{totalLeetcodeSolved}</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            Codeforces Rank Distribution
                        </h3>
                        <Bar data={rankChartData} options={chartOptions} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            LeetCode Problem Distribution
                        </h3>
                        <div className="w-full max-w-[300px]">
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
                </div>

                {/* Leaderboard */}
                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">
                        GitHub Followers Leaderboard
                    </h3>
                    <ul className="space-y-2">
                        {githubLeaderboard.map((user, index) => (
                            <li
                                key={user.id}
                                className="flex justify-between items-center bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300"
                            >
                                <span>
                                    {index + 1}. {user.name}
                                </span>
                                <span className="font-semibold">
                                    {user.followers} Followers
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MainDashboard;

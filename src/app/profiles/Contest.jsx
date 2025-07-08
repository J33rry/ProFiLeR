import {
    Chart as ChartJS,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { IoClose } from "react-icons/io5";
import { SiCodeforces } from "react-icons/si";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

function Contest({ contestRef, profile }) {
    if (
        !profile?.codeforces_contest ||
        profile.codeforces_contest.length === 0
    ) {
        return (
            <div
                ref={contestRef}
                className="z-1000 fixed opacity-100 scale-0 shadow-2xl bg-zinc-900/95 backdrop-blur-2xl text-white border border-white/40 w-[90%] h-[90%] max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-2xl"
            >
                <div className="flex items-center justify-center flex-1">
                    <div className="text-center">
                        <SiCodeforces className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                        <div className="text-xl font-semibold text-zinc-300">
                            No contests found
                        </div>
                        <div className="text-sm text-zinc-400 mt-2">
                            This user hasn't participated in any contests yet
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const labels = profile.codeforces_contest
        .slice(-20)
        .map((c) => c.contestName);
    const ratings = profile.codeforces_contest
        .slice(-20)
        .map((c) => c.newRating);

    if (ratings.length > 20) {
        ratings.unshift(profile.codeforces_contest[20]?.oldRating);
        labels.unshift(
            profile.codeforces_contest[profile.codeforces_contest.length - 21]
                ?.contestName
        );
    } else {
        ratings.unshift(
            profile.codeforces_contest[profile.codeforces_contest.length - 1]
                ?.oldRating
        );
        labels.unshift(
            profile.codeforces_contest[profile.codeforces_contest.length - 1]
                ?.contestName
        );
    }

    const data = {
        labels,
        datasets: [
            {
                label: "Rating",
                data: ratings,
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                segment: {
                    borderColor: (ctx) => {
                        const { p0, p1 } = ctx;
                        if (!p0 || !p1) return "#64748b";
                        return p1.parsed.y > p0.parsed.y
                            ? "#22c55e"
                            : "#ef4444";
                    },
                },
                backgroundColor: (ctx) => {
                    const { p0, p1 } = ctx;
                    if (!p0 || !p1) return "#64748b";
                    return p1.parsed.y > p0.parsed.y ? "#22c55e" : "#ef4444";
                },
                fill: false,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "white",
                bodyColor: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                borderWidth: 1,
                callbacks: {
                    label: (context) => `Rating: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: "white",
                },
                title: {
                    display: true,
                    text: "Rating",
                    color: "white",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
        },
    };

    // Calculate statistics
    const totalContests = profile.codeforces_contest.length;
    const currentRating =
        profile.codeforces_contest[profile.codeforces_contest.length - 1]
            ?.newRating || 0;
    const maxRating = Math.max(
        ...profile.codeforces_contest.map((c) => c.newRating)
    );
    const ratingChange =
        profile.codeforces_contest.length > 1
            ? currentRating -
              profile.codeforces_contest[profile.codeforces_contest.length - 2]
                  ?.newRating
            : 0;
    return (
        <div
            ref={contestRef}
            className="z-1000 fixed opacity-100 scale-0 shadow-2xl bg-zinc-900/95 backdrop-blur-2xl text-white border border-white/40 w-[90%] h-[90%] max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-2xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <SiCodeforces className="w-8 h-8 text-[#435e9d]" />
                    <h2 className="text-2xl font-bold">Contest History</h2>
                </div>
                <button
                    onClick={() => {
                        // This will be handled by the parent component's click outside logic
                        const event = new MouseEvent("mousedown", {
                            bubbles: true,
                            cancelable: true,
                        });
                        document.dispatchEvent(event);
                    }}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                    data-cursor
                >
                    <IoClose className="w-6 h-6" />
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-white/20">
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold">{totalContests}</div>
                    <div className="text-sm text-zinc-300">Total Contests</div>
                </div>
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold">{currentRating}</div>
                    <div className="text-sm text-zinc-300">Current Rating</div>
                </div>
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold">{maxRating}</div>
                    <div className="text-sm text-zinc-300">Max Rating</div>
                </div>
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div
                        className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                            ratingChange >= 0
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {ratingChange >= 0 ? (
                            <FiTrendingUp />
                        ) : (
                            <FiTrendingDown />
                        )}
                        {ratingChange >= 0 ? "+" : ""}
                        {ratingChange}
                    </div>
                    <div className="text-sm text-zinc-300">Last Change</div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0">
                {/* Chart Section */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">
                        Rating Progress (Last 20 Contests)
                    </h3>
                    <div className="h-64 lg:h-full min-h-[200px]">
                        <Line data={data} options={options} />
                    </div>
                </div>

                {/* Contest List */}
                <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-white/20 p-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">
                        Recent Contests
                    </h3>
                    <div className="space-y-2 max-h-96 lg:max-h-full overflow-y-auto">
                        {profile.codeforces_contest
                            .slice(-10)
                            .reverse()
                            .map((contest, i) => {
                                const ratingDiff =
                                    contest.newRating - contest.oldRating;
                                return (
                                    <div
                                        key={i}
                                        className="bg-zinc-800/60 p-3 rounded-xl hover:bg-zinc-700/60 transition-all duration-200"
                                    >
                                        <div className="font-medium text-sm mb-1 line-clamp-2">
                                            {contest.contestName}
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-300">
                                                Rank: {contest.rank}
                                            </span>
                                            <span
                                                className={`font-medium ${
                                                    ratingDiff >= 0
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }`}
                                            >
                                                {ratingDiff >= 0 ? "+" : ""}
                                                {ratingDiff}
                                            </span>
                                        </div>
                                        <div className="text-xs text-zinc-400 mt-1">
                                            {contest.oldRating} →{" "}
                                            {contest.newRating}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contest;

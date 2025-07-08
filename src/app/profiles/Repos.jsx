import React from "react";
import { FaGithub } from "react-icons/fa6";
import { GrDeploy } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { FiStar, FiGitBranch, FiEye } from "react-icons/fi";

function Repos({ profile, repoRef }) {
    if (!profile?.repos || profile.repos.length === 0) {
        return (
            <div
                ref={repoRef}
                className="z-1000 fixed opacity-100 scale-0 shadow-2xl bg-zinc-900/95 backdrop-blur-2xl text-white border border-white/40 w-[90%] h-[90%] max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-2xl"
            >
                <div className="flex items-center justify-center flex-1">
                    <div className="text-center">
                        <FaGithub className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                        <div className="text-xl font-semibold text-zinc-300">
                            No repositories found
                        </div>
                        <div className="text-sm text-zinc-400 mt-2">
                            This user doesn't have any public repositories yet
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const totalRepos = profile.repos.length;
    const totalStars = profile.repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count || 0),
        0
    );
    const totalForks = profile.repos.reduce(
        (sum, repo) => sum + (repo.forks_count || 0),
        0
    );
    const languages = [
        ...new Set(profile.repos.map((repo) => repo.language).filter(Boolean)),
    ];

    return (
        <div
            className="z-1000 fixed opacity-100 scale-0 shadow-2xl bg-zinc-900/95 backdrop-blur-2xl text-white border border-white/40 w-[90%] h-[90%] max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-2xl"
            ref={repoRef}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <FaGithub className="w-8 h-8 text-white" />
                    <h2 className="text-2xl font-bold">Repositories</h2>
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
                    <div className="text-2xl font-bold">{totalRepos}</div>
                    <div className="text-sm text-zinc-300">Total Repos</div>
                </div>
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        <FiStar className="w-5 h-5" />
                        {totalStars}
                    </div>
                    <div className="text-sm text-zinc-300">Total Stars</div>
                </div>
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        <FiGitBranch className="w-5 h-5" />
                        {totalForks}
                    </div>
                    <div className="text-sm text-zinc-300">Total Forks</div>
                </div>
                <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold">{languages.length}</div>
                    <div className="text-sm text-zinc-300">Languages</div>
                </div>
            </div>

            {/* Repository List */}
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Repository List</h3>
                <div className="space-y-3">
                    {profile.repos.map((repo, i) => (
                        <div
                            className="bg-zinc-800/60 p-4 rounded-xl hover:bg-zinc-700/60 transition-all duration-200 border border-zinc-700/30"
                            key={i}
                        >
                            {/* Repository Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <h4 className="text-lg font-semibold text-white break-words">
                                        {repo.name}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <a
                                        href={repo.html_url}
                                        className="p-1 hover:bg-white/10 rounded-lg transition-all duration-200"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        data-cursor
                                        title="View on GitHub"
                                    >
                                        <FaGithub className="w-4 h-4" />
                                    </a>
                                    {repo.homepage && (
                                        <a
                                            href={repo.homepage}
                                            className="p-1 hover:bg-white/10 rounded-lg transition-all duration-200"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            data-cursor
                                            title="View Live Demo"
                                        >
                                            <GrDeploy className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Repository Description */}
                            {repo.description && (
                                <p className="text-sm text-zinc-300 mb-3 break-words">
                                    {repo.description}
                                </p>
                            )}

                            {/* Repository Stats and Language */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-4 text-sm text-zinc-400 flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <FiStar className="w-4 h-4" />
                                        {repo.stargazers_count || 0}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiGitBranch className="w-4 h-4" />
                                        {repo.forks_count || 0}
                                    </div>
                                    {repo.watchers_count !== undefined && (
                                        <div className="flex items-center gap-1">
                                            <FiEye className="w-4 h-4" />
                                            {repo.watchers_count}
                                        </div>
                                    )}
                                </div>
                                {repo.language && (
                                    <div className="bg-zinc-700/60 px-2 py-1 rounded-lg text-xs text-zinc-200 flex-shrink-0">
                                        {repo.language}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Repos;

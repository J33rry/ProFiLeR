import React from "react";
import { FaGithub } from "react-icons/fa6";
import { GrDeploy } from "react-icons/gr";

function Repos({ profile, repoRef }) {
    return (
        <div
            className="z-1000 fixed opacity-100 scale-0 shadow-2xl bg-[#151b22]/80 backdrop-blur-2xl text-[#eff6fc] border border-white/40 w-[100%] h-[100%] overflow-scroll flex flex-col right-0 top-0 p-2 md:p-4 rounded-xl overflow-x-hidden"
            ref={repoRef}
        >
            {profile?.repos.map((repo, i) => (
                <div
                    className="bg-white/30 backdrop-blur-lg my-2 rounded-lg p-2"
                    key={i}
                >
                    <div className="text-xl md:text-2xl lg:text-3xl flex gap-2 items-center">
                        {repo.name}
                        <a
                            href={repo.html_url}
                            className=""
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <FaGithub />
                        </a>
                        {repo.homepage ? (
                            <a
                                href={repo.homepage}
                                className=""
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <GrDeploy />
                            </a>
                        ) : (
                            <div className="hidden"></div>
                        )}
                    </div>
                    <div className="text-md text-[#eff6fc]/60">
                        {repo.description}
                    </div>

                    <div className="bg-white/20 inline-block p-1 rounded-lg">
                        {repo.langauge}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Repos;

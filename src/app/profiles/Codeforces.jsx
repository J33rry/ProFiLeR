import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { FiMaximize } from "react-icons/fi";
import { SiCodeforces } from "react-icons/si";
import Contest from "./Contest";

function Codeforces({ profile }) {
    const [open, setOpen] = useState(false);
    const contestRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!contestRef.current.contains(event.target) && open) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    const handleClose = () => {
        gsap.to(contestRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "back.in(1.7)",
            onComplete: () => {
                gsap.set(contestRef.current, {
                    display: "none",
                    visibility: "hidden",
                    pointerEvents: "none",
                });
                setOpen(false);
            },
        });
    };

    const handleclick = () => {
        setOpen(true);

        const tl = gsap.timeline({
            defaults: { ease: "power2.out", duration: 0.3 },
        });

        tl.set(contestRef.current, {
            display: "flex",
            visibility: "visible",
            pointerEvents: "auto",
            zIndex: 100,
            opacity: 0.1,
            scaleX: 0.2,
            scaleY: 0.2,
            transformOrigin: "90% 90%",
        });

        tl.to(contestRef.current, {
            scaleX: 1,
            duration: 0.3,
        }).to(contestRef.current, {
            opacity: 1,
            scaleY: 1,
            duration: 0.3,
        });
    };

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
                <div
                    className="absolute bottom-0 right-0 p-1 bg-white/40 rounded-lg m-1 hover:bg-white/60 transition-all border border-white/30 hover:shadow-md hover:shadow-black/20 text-zinc-300"
                    onClick={handleclick}
                    data-cursor
                >
                    <FiMaximize className="size-4 md:size-5 lg:size-4 xl:size-5" />
                </div>
                <Contest contestRef={contestRef} profile={profile} />
            </div>
        </div>
    );
}

export default Codeforces;

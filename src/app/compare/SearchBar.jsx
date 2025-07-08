import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaUserAlt } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";

function SearchBar({ open, setOpen, data, user }) {
    const formRef = useRef(null);
    const [search, setSearch] = useState("");

    const filteredProfiles = data?.filter(
        (user) =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.github_username
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            user.leetcode_username
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            user.codeforces_username
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    const handleClose = () => {
        if (formRef.current) {
            gsap.to(formRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: "back.in(1.7)",
                onComplete: () => {
                    setOpen(false);
                },
            });
        } else {
            setOpen(false);
        }
    };
    return (
        open && (
            <div className="absolute top-2 right-2 w-[90%]">
                <div
                    className=" bg-white/30 w-full h-10 rounded-xl text-right"
                    ref={formRef}
                    data-cursor
                >
                    <input
                        type="text"
                        className="w-full h-full text-right outline-none text-xl p-2 lg:p-4"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="bg-white/20 backdrop-blur-lg rounded-xl mt-2 text-white p-2 overflow-y-scroll h-[30vh]">
                    {filteredProfiles?.map((profile) => (
                        <div
                            className="bg-white/10 m-2 rounded-lg text-sm lg:text-lg flex p-2 justify-between items-center
                            hover:shadow-lg hover:shadow-white/30 transition-all duration-300 text-zinc-300 hover:text-white"
                            key={profile.id}
                            onClick={() => {
                                user(profile);
                            }}
                        >
                            <div className="">
                                <div className="flex items-baseline gap-1">
                                    <FaUserAlt />
                                    {profile.name}
                                </div>
                                <div className="flex items-center gap-1">
                                    <SiLeetcode />
                                    {profile.leetcode_username}
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center gap-1">
                                    <FaGithub />
                                    {profile.github_username}
                                </div>
                                <div className="flex items-center gap-1">
                                    <SiCodeforces />
                                    {profile.codeforces_username}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}

export default SearchBar;

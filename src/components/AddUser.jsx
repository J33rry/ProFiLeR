"use client";
import { SaveDataBase } from "@/util/SaveDataBase";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import AvatarUpload from "./AvatarUpload";
import { LeetcodeUser } from "@/util/LeetcodeUser";
import { GithubUser } from "@/util/GithubUser";
import gsap from "gsap";

function AddUser({ setAddForm, AddForm }) {
    const [file, setFile] = useState(null);
    const [LeetcodeData, setLeetcodeData] = useState(null);
    const [GithubData, setGithubData] = useState(null);
    const [GitMessage, setGitMessage] = useState("");
    const [LeetcodeMessage, setLeetcodeMessage] = useState("");
    const GitRef = useRef(null);
    const LeetcodeRef = useRef(null);
    const NameRef = useRef(null);
    const PortfolioRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            Name: NameRef.current.value,
            github_username: GitRef.current.value,
            leetcode_username: LeetcodeRef.current.value,
            portfolio_url: PortfolioRef.current.value,
            avatar: file,
        };
        SaveDataBase(userData, LeetcodeData, GithubData);
    };

    const LeetcodeUserCheck = async (username) => {
        if (username === "") {
            setLeetcodeMessage("");
            return;
        }
        const user = await LeetcodeUser(username);
        if (user === "User Not Found") {
            setLeetcodeMessage("User Not Found");
            return;
        } else if (user === "User Already Exists") {
            setLeetcodeMessage("User Already Exists");
            return;
        }
        setLeetcodeMessage("");
        setLeetcodeData(user);
    };
    const GithubUserCheck = async (username) => {
        if (username === "") {
            setGitMessage("");
            return;
        }
        const user = await GithubUser(username);
        if (user === "User Not Found") {
            setGitMessage("User Not Found");
            return;
        } else if (user === "User Already Exists") {
            setGitMessage("User Already Exists");
            return;
        }
        setGitMessage("");
        setGithubData(user);
    };
    const formRef = useRef(null);

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
    }, [AddForm]);
    const handleClose = () => {
        if (formRef.current) {
            gsap.to(formRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: "back.in(1.7)",
                onComplete: () => {
                    setAddForm(false);
                },
            });
        } else {
            setAddForm(false);
        }
    };

    useEffect(() => {
        if (formRef.current) {
            gsap.to(formRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
            });
        }
    }, [AddForm]);
    return (
        <div className="">
            <div
                className="flex items-center justify-center p-5 md:p-15 lg:p-20 z-20 rounded-lg shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 opacity-0 scale-90"
                ref={formRef}
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 text-black text-md lg:text-lg"
                >
                    <AvatarUpload file={file} setFile={setFile} />
                    <input
                        type="text"
                        name="Name"
                        placeholder="Name"
                        className="border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300"
                        ref={NameRef}
                    />
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="text"
                            name="github_username"
                            id="github_id"
                            placeholder="GitHub Username"
                            ref={GitRef}
                            className={`border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300 ${
                                GitMessage ? "border-red-500" : "border-black"
                            } ${GithubData ? "border-green-400" : ""}
                            `}
                            onBlur={() => {
                                GithubUserCheck(GitRef.current.value);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="text"
                            id="leetcode_id"
                            name="leetcode_username"
                            placeholder="LeetCode Username"
                            className={`border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300 ${
                                LeetcodeMessage
                                    ? "border-red-500"
                                    : "border-black"
                            } ${LeetcodeData ? "border-green-400" : ""} 
                            `}
                            ref={LeetcodeRef}
                            onBlur={() => {
                                LeetcodeUserCheck(LeetcodeRef.current.value);
                            }}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Your Portfolio URL"
                        name="portfolio_url"
                        className="border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300"
                        ref={PortfolioRef}
                    />
                    <button
                        type="submit"
                        className="flex gap-2 text-md md:text-lg lg:text-xl font-bold transition-all duration-300 cursor-pointer text-white items-center bg-blue-800/70 hover:bg-blue-700 mt-5 p-2 rounded-lg justify-center hover:scale-105"
                    >
                        Search
                    </button>
                </form>
            </div>
            <Button
                button="Close"
                buttonIcon={<IoClose />}
                handleClose={handleClose}
            />
        </div>
    );
}

export default AddUser;

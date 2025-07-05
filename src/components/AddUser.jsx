"use client";
import { SaveDataBase } from "@/util/SaveDataBase";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import AvatarUpload from "./AvatarUpload";
import { LeetcodeUser } from "@/util/LeetcodeUser";
import { GithubUser } from "@/util/GithubUser";
import { CodeforcesUser } from "@/util/CodeforcesUser";
import gsap from "gsap";
import { toast } from "react-toastify";
import { FaUserLarge } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { BiError, BiLoader } from "react-icons/bi";
import { useData } from "@/context/Datacontext";

function AddUser({ setAddForm, AddForm }) {
    const [file, setFile] = useState(null);
    const [LeetcodeData, setLeetcodeData] = useState(null);
    const [GithubData, setGithubData] = useState(null);
    const [CodeforcesData, setCodeforcesData] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const GitRef = useRef(null);
    const LeetcodeRef = useRef(null);
    const NameRef = useRef(null);
    const codeforcesRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        LeetcodeUserCheck(LeetcodeRef.current.value);
        GithubUserCheck(GitRef.current.value);
        codeforcesUserCheck(codeforcesRef.current.value);
        const userData = {
            Name: NameRef.current.value,
            github_username: GitRef.current.value,
            leetcode_username: LeetcodeRef.current.value,
            codeforces_username: codeforcesRef.current.value,
            avatar: file,
        };
        const { message } = await SaveDataBase(
            userData,
            LeetcodeData,
            GithubData,
            CodeforcesData
        );
        if (message === "User and stats saved successfully") {
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <FaUserLarge className="text-green-500" />
                    <span className="font-semibold">User added!</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            setSaving(false);
            refreshData();
            handleClose();
        } else {
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <FaUserLarge className="text-red-500" />
                    <span className="font-semibold">Error Adding!!</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
        }
    };

    const LeetcodeUserCheck = async (username) => {
        if (username === "") {
            setLeetcodeData(null);
            return;
        }
        if (username === LeetcodeData?.username) {
            return;
        }
        setLeetcodeLoading(true);
        setLeetcodeErr(false);
        setDisabled(true);
        const user = await LeetcodeUser(username);
        if (user === "User Not Found") {
            setLeetcodeLoading(false);
            setLeetcodeErr(true);
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <SiLeetcode />
                    <span className="font-semibold">User Not Found</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            return;
        } else if (user === "User Already Exists") {
            setLeetcodeLoading(false);
            setLeetcodeErr(true);
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <SiLeetcode />
                    <span className="font-semibold">Already Register</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            return;
        }
        setLeetcodeLoading(false);
        setLeetcodeData(user);
        setDisabled(false);
    };

    const codeforcesUserCheck = async (username) => {
        if (username === "") {
            setCodeforcesData(null);
            return;
        }
        if (username === CodeforcesData?.username) {
            return;
        }
        setCodeforcesLoading(true);
        setCodeforcesErr(false);
        setDisabled(true);
        const user = await CodeforcesUser(username);
        // console.log("Codeforces User:", user);
        if (user === "User Not Found") {
            setDisabled(true);
            setCodeforcesLoading(false);
            setCodeforcesErr(true);
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <SiCodeforces />
                    <span className="font-semibold">User Not Found</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            return;
        } else if (user === "User Already Exists") {
            setDisabled(true);
            setCodeforcesLoading(false);
            setCodeforcesErr(true);
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <SiCodeforces />
                    <span className="font-semibold">Already Register</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            return;
        }
        setCodeforcesData(user);
        setCodeforcesLoading(false);
        setDisabled(false);
    };

    const GithubUserCheck = async (username) => {
        if (username === "") {
            setGithubData(null);
            return;
        }
        if (username === GithubData?.username) {
            return;
        }
        setGitLoading(true);
        setGitErr(false);
        setDisabled(true);
        const user = await GithubUser(username);
        if (user === "User Not Found") {
            setDisabled(true);
            setGitLoading(false);
            setGitErr(true);
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <FaGithub />
                    <span className="font-semibold">User Not Found</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            return;
        } else if (user === "User Already Exists") {
            setDisabled(true);
            setGitLoading(false);
            setGitErr(true);
            toast(
                <div className="backdrop-blur-lg bg-white/10 border border-white/30 w-full h-full text-white px-3 py-4 md:px-2 lg:px-4 rounded-lg shadow-lg flex items-center gap-2 ml-20 mr-2 md:ml-12 lg:mx-0">
                    <FaGithub />
                    <span className="font-semibold">Already Register</span>
                </div>,
                {
                    className:
                        "!bg-transparent !shadow-none !p-0 !m-0 border-none",
                    closeOnClick: true,
                    hideProgressBar: true,
                }
            );
            return;
        }
        setGithubData(user);
        setGitLoading(false);
        setDisabled(false);
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

    const [gitLoading, setGitLoading] = useState(false);
    const [leetcodeLoading, setLeetcodeLoading] = useState(false);
    const [codeforcesLoading, setCodeforcesLoading] = useState(false);
    const [gitErr, setGitErr] = useState(false);
    const [leetcodeErr, setLeetcodeErr] = useState(false);
    const [codeforcesErr, setCodeforcesErr] = useState(false);

    const [saving, setSaving] = useState(false);
    const { refreshData } = useData();
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
                        required
                        placeholder="Name"
                        className="border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300 active:bg-white focus:bg-white"
                        ref={NameRef}
                    />
                    <div className="flex items-center justify-center gap-2">
                        {gitLoading ? (
                            <BiLoader className="text-white size-10 md:size-12 lg:size-14" />
                        ) : (
                            <div className="hidden"></div>
                        )}
                        {gitErr ? (
                            <BiError className="text-red-600/50 size-10 md:size-12 lg:size-14" />
                        ) : (
                            <div className="hidden"></div>
                        )}
                        <input
                            type="text"
                            name="github_username"
                            id="github_id"
                            required
                            placeholder="GitHub Username"
                            ref={GitRef}
                            className="border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300 active:bg-white focus:bg-white"
                            onBlur={() => {
                                GithubUserCheck(GitRef.current.value);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        {leetcodeLoading ? (
                            <BiLoader className="text-white size-10 md:size-12 lg:size-14" />
                        ) : (
                            <div className="hidden"></div>
                        )}
                        {leetcodeErr ? (
                            <BiError className="text-red-600/50 size-10 md:size-12 lg:size-14" />
                        ) : (
                            <div className="hidden"></div>
                        )}
                        <input
                            type="text"
                            id="leetcode_id"
                            required
                            name="leetcode_username"
                            placeholder="LeetCode Username"
                            className="border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300 active:bg-white focus:bg-white"
                            ref={LeetcodeRef}
                            onBlur={() => {
                                LeetcodeUserCheck(LeetcodeRef.current.value);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        {codeforcesLoading ? (
                            <BiLoader className="text-white size-10 md:size-12 lg:size-14" />
                        ) : (
                            <div className="hidden"></div>
                        )}
                        {codeforcesErr ? (
                            <BiError className="text-red-600/50 size-10 md:size-12 lg:size-14" />
                        ) : (
                            <div className="hidden"></div>
                        )}
                        <input
                            type="text"
                            required
                            placeholder="CodeForces Username"
                            name="codeforces_username"
                            className="border-2 border-zinc-600/30 p-1 md:p-2 lg:p-3 rounded-xl shadow-2xl shadow-zinc-600/30 bg-white/80 w-full text-right active:outline-none focus:outline-none active:scale-105 focus:scale-105 transition-all duration-300 active:bg-white focus:bg-white"
                            ref={codeforcesRef}
                            onBlur={() => {
                                codeforcesUserCheck(
                                    codeforcesRef.current.value
                                );
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`flex gap-2 text-md md:text-lg lg:text-xl font-bold transition-all duration-300 cursor-pointer text-white items-center bg-blue-800/70 hover:bg-blue-700 mt-4 lg:mt-5 p-2 py-4 rounded-lg justify-center hover:scale-105 disabled:bg-red-600/40 disabled:cursor-not-allowed ${
                            saving ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={disabled}
                    >
                        Add User
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

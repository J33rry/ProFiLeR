"use client";
import React, { useRef, useState } from "react";

function page() {
    const UserRef = useRef(null);
    const leetcodeRef = useRef(null);
    const [user, setUser] = useState({ name: "", github: "", leetcode: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const github = await fetch(
            `/api/github?username=${UserRef.current.value}`
        );
        const leetcode = await fetch(
            `/api/leetcode?username=${leetcodeRef.current.value}`
        );
        const leetcodeData = await leetcode.json();
        const githubData = await github.json();
        console.log(githubData);
        console.log(leetcodeData);
        UserRef.current.value = "";
        leetcodeRef.current.value = "";
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    ref={UserRef}
                    placeholder="Enter GitHub username"
                />
                <input
                    type="text"
                    ref={leetcodeRef}
                    placeholder="Enter YOur Leetcode Username"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default page;

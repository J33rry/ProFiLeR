"use client";
import { SaveDataBase } from "@/util/SaveDataBase";
import React, { useRef } from "react";

function page() {
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const userData = Object.fromEntries(formData.entries());
        SaveDataBase(userData);
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 "
                ref={formRef}
            >
                <input
                    type="text"
                    name="github_username"
                    placeholder="Enter GitHub username"
                />
                <input
                    type="text"
                    name="leetcode_username"
                    placeholder="Enter YOur Leetcode Username"
                />
                <input type="text" name="Name" placeholder="Name" />
                <input
                    type="text"
                    placeholder="Your Portfolio URL"
                    name="portfolio_url"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default page;

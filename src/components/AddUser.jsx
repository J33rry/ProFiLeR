"use client";
import { SaveDataBase } from "@/util/SaveDataBase";
import React, { useRef } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";

function AddUser({ setAddForm }) {
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const userData = Object.fromEntries(formData.entries());
        SaveDataBase(userData);
    };
    return (
        <div className="flex items-center justify-center m-auto z-20 ">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-red-800"
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
            <Button
                button="close"
                buttonIcon={<IoClose />}
                setAddForm={setAddForm}
            />
        </div>
    );
}

export default AddUser;

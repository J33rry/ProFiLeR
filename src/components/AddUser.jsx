"use client";
import { SaveDataBase } from "@/util/SaveDataBase";
import React, { useRef, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import AvatarUpload from "./AvatarUpload";

function AddUser({ setAddForm }) {
    const formRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const userData = Object.fromEntries(formData.entries());
        userData.avatar = file;
        SaveDataBase(userData);
    };
    return (
        <div className="flex items-center justify-center p-10 z-20 bg-red-900">
            <AvatarUpload file={file} setFile={setFile} />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-white"
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

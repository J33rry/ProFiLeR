import React, { useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

function AvatarUpload({ file, setFile }) {
    const [preview, setPreview] = useState("");
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex items-center flex-col">
                {/* Invisible input */}
                <input
                    type="file"
                    id="avatar_id"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    ref={inputRef}
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-34 h-34 md:w-36 md:h-36 lg:w-42 lg:h-42 object-cover rounded border"
                    />
                )}
                {!preview && (
                    <div className="w-34 h-34 md:w-36 md:h-36 lg:w-42 lg:h-42 object-cover rounded-md bg-white/30 flex items-center justify-center ">
                        <FaUserAlt size={50} />
                    </div>
                )}
                <label htmlFor="avatar_id">
                    <div
                        className={`flex gap-2 text-md md:text-lg lg:text-xl font-bold transition-all duration-300 text-white items-center bg-blue-800/70 hover:bg-blue-700 mt-5 p-2 rounded-lg hover:scale-105`}
                        data-cursor
                    >
                        Upload Avatar
                    </div>
                </label>
                <div className="text-white/70 text-sm w-60 md:w-75 lg:w-90 text-center">
                    *By default your GitHub Avatar will be Used
                </div>
            </div>
        </div>
    );
}

export default AvatarUpload;

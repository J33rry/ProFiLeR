import React, { useState } from "react";

function AvatarUpload({ file, setFile }) {
    const [preview, setPreview] = useState(null);

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
        <div className="flex flex-col gap-4 items-start">
            <label htmlFor="avatar_id">Upload Avatar</label>
            <input
                type="file"
                id="avatar_id"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
            />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                />
            )}
        </div>
    );
}

export default AvatarUpload;

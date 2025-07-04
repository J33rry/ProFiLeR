import { GetData } from "@/util/GetData";
import React from "react";
import { MdPersonSearch } from "react-icons/md";

function Search() {
    const handleSearch = async () => {
        const data = await GetData();
        console.log(data);
    };
    return (
        <div className="">
            <div
                className="text-2xl text-zinc-300 md:text-3xl lg:text-4xl mr-4 md:mr-6 lg:mr-8 hover:cursor-pointer transition-all duration-300 p-1 rounded-lg bg-white/10 backdrop-blur-md hover:shadow-md hover:shadow-white/20 hover:text-white"
                onClick={handleSearch}
            >
                <MdPersonSearch />
            </div>
        </div>
    );
}

export default Search;

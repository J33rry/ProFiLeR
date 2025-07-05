import { GetData } from "@/util/GetData";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";

function Search() {
    const handleSearch = async () => {
        const data = await GetData();
        console.log(data);
    };
    return (
        <div className="relative">
            <div
                className="text-2xl text-zinc-300 md:text-3xl lg:text-4xl mr-4 md:mr-6 lg:mr-8 hover:cursor-pointer transition-all duration-300 p-1 rounded-lg bg-white/10 backdrop-blur-md hover:shadow-md hover:shadow-white/20 hover:text-white"
                onClick={handleSearch}
            >
                <MdPersonSearch />
            </div>
            <div className="absolute -bottom-14 md:-bottom-16 lg:-bottom-18 -right-2 shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 flex w-[60vw] md:w-[50vw] lg:w-[40vw] items-center justify-end gap-4 px-3 py-1 lg:py-2 rounded-xl text-right text-2xl md:text-3xl lg:text-4xl">
                <input
                    type="text"
                    placeholder="Search"
                    className="text-right w-full focus:outline-none active:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="text-2xl text-zinc-300 md:text-3xl lg:text-4xl  hover:cursor-pointer transition-all duration-300 p-1 rounded-lg bg-white/10 backdrop-blur-md hover:shadow-md hover:shadow-white/20 hover:text-white"
                >
                    <BiSearch />
                </button>
            </div>
        </div>
    );
}

export default Search;

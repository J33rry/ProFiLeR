import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdCompare } from "react-icons/md";
import SearchBar from "./SearchBar";
import { useData } from "@/context/Datacontext";
import CompareUser from "./CompareUser";

function MainCompare() {
    const { data } = useData();
    const [userA, setUserA] = useState(null);
    const [userB, setUserB] = useState(null);
    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);

    return (
        <div className="border-2 border-zinc-500 rounded-2xl border-l-0 min-h-[90vh] rounded-l-md flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mx-2 lg:mx-4 p-2 mt-4 lg:mt-8 bg-gradient-to-l from-zinc-300/40 to-zinc-300/0 rounded-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest flex items-center gap-3 ">
                    Compare : <MdCompare />
                </h1>
            </div>

            {/* Colored Side Bars */}
            <div className="flex-1 flex flex-col lg:flex-row  m-4 gap-2">
                <div className="flex-1 flex bg-gradient-to-b backdrop-blur-lg from-white/10 to-white/0 rounded-xl items-center justify-center relative">
                    {!openA && !userA && (
                        <div
                            className="text-2xl lg:text-4xl flex  items-center justify-center p-4 bg-white/10 rounded-lg hover:shadow-lg hover:shadow-white/30 transition-all duration-300 text-zinc-300 hover:text-white"
                            onClick={() => {
                                setOpenA(true);
                            }}
                            data-cursor
                        >
                            <FaPlus />
                        </div>
                    )}
                    {userA && (
                        <CompareUser
                            user={userA}
                            setUser={setUserA}
                            open={openA}
                            setOpen={setOpenA}
                        />
                    )}
                    <SearchBar
                        open={openA}
                        setOpen={setOpenA}
                        data={data}
                        user={setUserA}
                    />
                </div>
                <div className="h-1 lg:h-auto lg:w-1 bg-gradient-to-t  from-white/10 to-white/0 rounded-full"></div>
                <div className="flex-1 flex bg-gradient-to-b backdrop-blur-lg from-white/10 to-white/0 rounded-xl items-center justify-center relative">
                    {!openB && !userB && (
                        <div
                            className="text-2xl lg:text-4xl flex  items-center justify-center p-4 bg-white/10 rounded-lg hover:shadow-lg hover:shadow-white/30 transition-all duration-300 text-zinc-300 hover:text-white"
                            onClick={() => {
                                setOpenB(true);
                            }}
                            data-cursor
                        >
                            <FaPlus />
                        </div>
                    )}
                    {userB && (
                        <CompareUser
                            user={userB}
                            setUser={setUserB}
                            open={openB}
                            setOpen={setOpenB}
                        />
                    )}
                    <SearchBar
                        open={openB}
                        setOpen={setOpenB}
                        data={data}
                        user={setUserB}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainCompare;

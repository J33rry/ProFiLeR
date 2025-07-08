import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";

function Search({ setSearch, search }) {
    const [open, setOpen] = useState(false);

    const searchRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                open
            ) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    const handleClose = () => {
        gsap.to(searchRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "back.in(1.7)",
            onComplete: () => {
                gsap.set(searchRef.current, {
                    display: "none",
                    visibility: "hidden",
                    pointerEvents: "none",
                });
                setOpen(false);
            },
        });
    };

    const handleclick = () => {
        setOpen(true);

        gsap.to(searchRef.current, {
            display: "flex",
            visibility: "visible",
            pointerEvents: "auto",
            zIndex: 10,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            onComplete: () => {
                inputRef.current.focus();
            },
        });
    };

    return (
        <div className="relative">
            <div
                className="text-2xl text-zinc-300 md:text-3xl lg:text-4xl mr-4 md:mr-6 lg:mr-8 transition-all duration-300 p-1 rounded-lg bg-white/10 backdrop-blur-md hover:shadow-md hover:shadow-white/20 hover:text-white"
                onClick={handleclick}
                data-cursor
            >
                <MdPersonSearch />
            </div>
            <div
                className="-z-50 absolute -bottom-14 md:-bottom-16 lg:-bottom-18 -right-2 opacity-0 scale-0 shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 w-[60vw] md:w-[50vw] lg:w-[40vw] items-center justify-end gap-4 px-3 py-1 lg:py-2 rounded-xl text-right text-2xl md:text-3xl lg:text-4xl"
                ref={searchRef}
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="text-right w-full focus:outline-none active:outline-none"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    ref={inputRef}
                />
                <button className="text-2xl text-zinc-300 md:text-3xl lg:text-4xl transition-all duration-300 p-1 rounded-lg bg-white/10 backdrop-blur-md hover:shadow-md hover:shadow-white/20 hover:text-white ">
                    <BiSearch />
                </button>
            </div>
        </div>
    );
}

export default Search;

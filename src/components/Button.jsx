"use client";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";

function Button({
    button,
    link,
    buttonIcon,
    addForm,
    setAddForm,
    handleClose,
}) {
    const router = useTransitionRouter();

    function slideInOut() {
        document.documentElement.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 1000,
            easing: "cubic-bezier(.12,1,.88,.47)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        });
        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
                },
                {
                    clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
                },
            ],
            {
                duration: 1000,
                easing: "cubic-bezier(.12,1,.88,.47)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }
    const handleClick = () => {
        if (link === "/addUser") {
            setAddForm(true);
        } else if (button === "Close") {
            handleClose();
        } else {
            router.push(link, { onTransitionReady: slideInOut });
        }
    };

    return (
        <div className="fixed bottom-5 lg:bottom-10 right-5 lg:right-10 z-10">
            {/* Large screens */}
            <div
                className="hidden lg:flex items-center justify-center bg-zinc-500 text-white rounded-xl p-2 lg:rounded-2xl lg:p-4 border border-zinc-600 shadow-lg/30 shadow-zinc-500 hover:shadow-lg/50 transition-all duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-zinc-300 cursor-pointer"
                onClick={handleClick}
                data-cursor
            >
                <div className="text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-2">
                    {buttonIcon}
                    {button}
                </div>
            </div>

            {/* Mobile screens */}
            <div
                className="flex lg:hidden text-4xl bg-zinc-500 text-white rounded-xl p-2 border border-zinc-600 shadow-lg/30 shadow-zinc-500 hover:shadow-lg/50 transition-all duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-zinc-300 cursor-pointer"
                onClick={() => {
                    if (link === "/addUser") {
                        setAddForm(!addForm);
                    } else if (button === "Close") {
                        handleClose();
                    } else {
                        router.push(link, { onTransitionReady: slideInOut });
                    }
                }}
                data-cursor
            >
                {buttonIcon}
            </div>
        </div>
    );
}

export default Button;

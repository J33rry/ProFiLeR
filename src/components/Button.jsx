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
            <button
                onClick={handleClick}
                className="hidden lg:flex items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 font-semibold text-white shadow-lg shadow-zinc-800/20 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-zinc-700 hover:shadow-xl hover:shadow-zinc-800/30 active:scale-100"
                data-cursor
            >
                {buttonIcon}
                <span className="text-lg">{button}</span>
            </button>
            <div
                className="flex lg:hidden items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 font-semibold text-white shadow-lg shadow-zinc-800/20 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-zinc-700 hover:shadow-xl hover:shadow-zinc-800/30 active:scale-100"
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

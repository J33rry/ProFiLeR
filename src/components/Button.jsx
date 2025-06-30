"use client";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";
import { IoPersonAddSharp } from "react-icons/io5";

function Button({ button, link, buttonIcon }) {
    const router = useTransitionRouter();
    function slideInOut() {
        document.documentElement.animate(
            [
                { opacity: 1 },
                {
                    opacity: 0,
                },
            ],
            {
                duration: 1000,
                easing: "cubic-bezier(.12,1,.88,.47)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );
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
    return (
        <div>
            <div className="fixed bottom-5 lg:bottom-10 right-5 lg:right-10">
                <div
                    className="hidden lg:flex items-center justify-center bg-zinc-500 text-white rounded-xl p-2 lg:rounded-2xl lg:p-4 border-1 border-zinc-600 shadow-lg/30 shadow-zinc-500 hover:shadow-lg/50 transition-all duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-zinc-300 z-10 cursor-pointer"
                    onClick={() => {
                        router.push(link, {
                            onTransitionReady: slideInOut,
                        });
                    }}
                >
                    <div className="text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-2">
                        {buttonIcon}
                        {button}
                    </div>
                </div>
                <div
                    className="flex lg:hidden text-4xl bg-zinc-500 text-white rounded-xl p-2 lg:rounded-2xl lg:p-4 border-1 border-zinc-600 shadow-lg/30 shadow-zinc-500 hover:shadow-lg/50 transition-all duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-zinc-300 z-10 cursor-pointer"
                    onClick={() => {
                        router.push(link, {
                            onTransitionReady: slideInOut,
                        });
                    }}
                >
                    {buttonIcon}
                </div>
            </div>
        </div>
    );
}

export default Button;

"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger);

function Navbar({ list, button, currentPage }) {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                threshold: 0.51,
            }
        );

        list.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            list.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    }, []);

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
        <div className="relative">
            <div className="fixed left-1 md:left-2 lg:left-5 top-0 bottom-0">
                <div className="flex items-start flex-col min-h-screen gap-6 lg:gap-12 justify-center text-left">
                    {list.map((item, index) => {
                        const isActive = activeSection === item;

                        return (
                            <div
                                key={index}
                                className={`text-md md:text-lg lg:text-2xl font-bold transition-all duration-300 cursor-pointer text-white  ${
                                    isActive || currentPage === item
                                        ? "scale-110 pl-5 bg-gradient-to-r from-white/10 to-white/0 rounded-xl"
                                        : "opacity-50 hover:opacity-80 hover:scale-105"
                                }
                            
                                `}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!currentPage) {
                                        const section =
                                            document.getElementById(item);
                                        if (section) {
                                            section.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                            });
                                        }
                                    } else {
                                        const page = item.toLowerCase();
                                        if (page === "home") {
                                            router.push("/", {
                                                onTransitionReady: slideInOut,
                                            });
                                        } else {
                                            router.push(`/${page}`, {
                                                onTransitionReady: slideInOut,
                                            });
                                        }
                                    }
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="fixed bottom-5 lg:bottom-10 right-5 lg:right-10">
                <div
                    className="flex items-center justify-center bg-zinc-500 text-white rounded-xl p-2 lg:rounded-2xl lg:p-4 border-1 border-zinc-600 shadow-lg/30 shadow-zinc-500 hover:shadow-lg/50 transition-all duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-zinc-300 z-10 cursor-pointer"
                    onClick={() => {
                        router.push("/dashboard", {
                            onTransitionReady: slideInOut,
                        });
                    }}
                >
                    <div className="text-lg md:text-xl lg:text-2xl font-bold ">
                        {button}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

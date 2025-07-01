"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger);

function Navbar({ list, currentPage, ListIcons }) {
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
                duration: 500,
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
                duration: 500,
                easing: "cubic-bezier(.12,1,.88,.47)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }
    return (
        <div className="fixed top-0 h-[100vh] ml-2 lg:ml-4">
            <div className="flex items-start flex-col h-screen gap-12 justify-center">
                {list.map((item, index) => {
                    const isActive = activeSection === item;

                    return (
                        <div
                            key={index}
                            className={`hidden lg:flex gap-2 text-md md:text-lg lg:text-2xl font-bold transition-all duration-300 cursor-pointer text-white items-center ${
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
                            {ListIcons?.[index] || null}
                            {item}
                        </div>
                    );
                })}
                {ListIcons?.map((Icon, index) => {
                    const item = list[index];

                    return (
                        <div
                            key={item}
                            className={`block lg:hidden text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer text-white ${
                                activeSection === item || currentPage === item
                                    ? "scale-110 pl-5 bg-gradient-to-r from-white/10 to-white/0 rounded-xl"
                                    : "opacity-50 hover:opacity-80 hover:scale-105"
                            }`}
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
                            {Icon}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Navbar;

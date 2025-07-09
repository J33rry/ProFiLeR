"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState, useCallback } from "react";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger);

function Navbar({ list = [], currentPage, ListIcons = [] }) {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (!list || list.length === 0) return;

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

        const elementsToObserve = [];

        list.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                observer.observe(el);
                elementsToObserve.push(el);
            }
        });

        return () => {
            elementsToObserve.forEach((el) => {
                observer.unobserve(el);
            });
            observer.disconnect();
        };
    }, [list]);

    const router = useTransitionRouter();

    const slideInOut = useCallback(() => {
        requestAnimationFrame(() => {
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
        });
    }, []);
    return (
        <div className="fixed transition-all opacity-70 top-0 h-[100vh] ml-2 lg:ml-4">
            <div className="flex items-start flex-col h-screen gap-12 justify-center">
                {list.map((item, index) => {
                    const isActive = activeSection === item;

                    return (
                        <div
                            key={index}
                            className={`hidden lg:flex gap-2 text-md md:text-lg lg:text-2xl font-bold transition-all duration-300 text-white items-center rounded-xl ${
                                isActive || currentPage === item
                                    ? "scale-125 ml-10 pl-2 bg-gradient-to-r from-white/10 to-white/0"
                                    : "opacity-50 hover:opacity-80 hover:scale-105 "
                            }
                            
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                try {
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
                                } catch (error) {
                                    console.error("Navigation error:", error);
                                }
                            }}
                            data-cursor
                        >
                            {ListIcons?.[index] || null}
                            {item}
                        </div>
                    );
                })}
                {list.map((item, index) => {
                    const isActive = activeSection === item;

                    return (
                        <div
                            key={index}
                            className={`block lg:hidden text-md md:text-lg lg:text-2xl font-bold transition-all duration-300 text-white items-center rounded-xl ${
                                isActive || currentPage === item
                                    ? "scale-110 ml-5 pl-2  bg-gradient-to-r from-white/10 to-white/0"
                                    : "opacity-50 hover:opacity-80 hover:scale-105"
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                try {
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
                                } catch (error) {
                                    console.error("Navigation error:", error);
                                }
                            }}
                            data-cursor
                        >
                            {ListIcons?.[index] || null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Navbar;

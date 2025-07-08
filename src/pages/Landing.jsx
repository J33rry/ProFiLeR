"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useTransitionRouter } from "next-view-transitions";
import {
    FaGithub,
    FaCode,
    FaChartLine,
    FaRocket,
    FaTrophy,
    FaUsers,
    FaShieldAlt,
    FaLightbulb,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { BiCodeCurly, BiTrendingUp, BiUser } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Landing() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const floatingElementsRef = useRef([]);
    const featuresRef = useRef([]);
    const workingStepsRef = useRef([]);
    const whyUsCardsRef = useRef([]);
    const contactFormRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef(null);
    const progressRef = useRef(null);
    const router = useTransitionRouter();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Custom cursor setup
            const cursor = document.createElement("div");
            cursor.className = "custom-cursor";
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: linear-gradient(45deg, #a855f7, #ec4899);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(cursor);
            cursorRef.current = cursor;

            // Mouse move handler
            const handleMouseMove = (e) => {
                mouseRef.current = { x: e.clientX, y: e.clientY };
                if (cursorRef.current) {
                    gsap.to(cursorRef.current, {
                        x: e.clientX - 10,
                        y: e.clientY - 10,
                        duration: 0.1,
                        ease: "power2.out",
                    });
                }
            };

            // Add hover effects for interactive elements
            const handleMouseEnter = () => {
                if (cursorRef.current) {
                    gsap.to(cursorRef.current, {
                        scale: 2,
                        duration: 0.2,
                        ease: "power2.out",
                    });
                }
            };

            const handleMouseLeave = () => {
                if (cursorRef.current) {
                    gsap.to(cursorRef.current, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out",
                    });
                }
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.querySelectorAll("[data-cursor]").forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });

            // Hero Section Animation
            const tl = gsap.timeline();

            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "back.out(1.7)",
            })
                .from(
                    subtitleRef.current,
                    {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                    },
                    "-=0.8"
                )
                .from(
                    ctaRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.6"
                );

            // Floating elements animation
            floatingElementsRef.current.forEach((el, index) => {
                if (el) {
                    gsap.to(el, {
                        y: -20,
                        rotation: 360,
                        duration: 3 + index * 0.5,
                        ease: "none",
                        repeat: -1,
                        yoyo: true,
                        delay: index * 0.2,
                    });
                }
            });

            // Features Section Animation
            featuresRef.current.forEach((feature, index) => {
                if (feature) {
                    gsap.fromTo(
                        feature,
                        {
                            y: 100,
                            opacity: 0,
                            scale: 0.8,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: feature,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            },
                            delay: index * 0.2,
                        }
                    );
                }
            });

            // Working Steps Animation
            workingStepsRef.current.forEach((step, index) => {
                if (step) {
                    gsap.fromTo(
                        step,
                        {
                            x: index % 2 === 0 ? -100 : 100,
                            opacity: 0,
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: step,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            },
                            delay: index * 0.3,
                        }
                    );
                }
            });

            // Why Us Cards Animation
            whyUsCardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        {
                            rotationY: 90,
                            opacity: 0,
                        },
                        {
                            rotationY: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            },
                            delay: index * 0.15,
                        }
                    );
                }
            });

            // Contact Form Animation
            if (contactFormRef.current) {
                gsap.fromTo(
                    contactFormRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: contactFormRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Parallax effect for background elements
            gsap.to(".parallax-bg", {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Text typing effect - delay it to not interfere with initial animation
            gsap.set(titleRef.current, { text: "" }); // Clear initial text
            gsap.to(titleRef.current, {
                duration: 2,
                text: "ProfiLer",
                ease: "none",
                delay: 1.5, // Increased delay to let the button appear first
            });

            // Scroll progress indicator
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
            });

            // Smooth scroll animations for section transitions
            gsap.utils.toArray("section").forEach((section, index) => {
                gsap.fromTo(
                    section,
                    {
                        opacity: 0.8,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Magnetic effect for CTA button
            if (ctaRef.current) {
                const magneticButton = ctaRef.current;

                const handleMouseMove = (e) => {
                    const rect = magneticButton.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to(magneticButton, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(magneticButton, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                };

                magneticButton.addEventListener("mousemove", handleMouseMove);
                magneticButton.addEventListener("mouseleave", handleMouseLeave);
            }

            // Staggered card hover animations
            featuresRef.current.forEach((card) => {
                if (card) {
                    const tl = gsap.timeline({ paused: true });
                    tl.to(card, {
                        y: -10,
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out",
                    });

                    card.addEventListener("mouseenter", () => tl.play());
                    card.addEventListener("mouseleave", () => tl.reverse());
                }
            });

            // Cleanup function
            return () => {
                if (cursorRef.current) {
                    document.body.removeChild(cursorRef.current);
                }
                document.removeEventListener("mousemove", handleMouseMove);
                document.querySelectorAll("[data-cursor]").forEach((el) => {
                    el.removeEventListener("mouseenter", handleMouseEnter);
                    el.removeEventListener("mouseleave", handleMouseLeave);
                });
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const navigateToDashboard = () => {
        router.push("/dashboard");
    };

    return (
        <div
            ref={containerRef}
            className="ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto"
        >
            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transform-gpu origin-left scale-x-0"
                ></div>
            </div>

            {/* Home Section */}
            <section
                className="h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
                id="Home"
            >
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        ref={(el) => (floatingElementsRef.current[0] = el)}
                        className="absolute top-20 left-20 text-4xl text-purple-400 opacity-20"
                    >
                        <FaGithub />
                    </div>
                    <div
                        ref={(el) => (floatingElementsRef.current[1] = el)}
                        className="absolute top-40 right-32 text-3xl text-yellow-400 opacity-20"
                    >
                        <SiLeetcode />
                    </div>
                    <div
                        ref={(el) => (floatingElementsRef.current[2] = el)}
                        className="absolute bottom-40 left-40 text-3xl text-blue-400 opacity-20"
                    >
                        <SiCodeforces />
                    </div>
                    <div
                        ref={(el) => (floatingElementsRef.current[3] = el)}
                        className="absolute bottom-20 right-20 text-2xl text-green-400 opacity-20"
                    >
                        <FaCode />
                    </div>
                </div>

                <div
                    ref={heroRef}
                    className="relative z-10 h-full flex items-center justify-center text-center px-4"
                >
                    <div className="max-w-4xl mx-auto">
                        <h1
                            ref={titleRef}
                            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        >
                            ProfiLer
                        </h1>
                        <p
                            ref={subtitleRef}
                            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
                        >
                            Unite your coding journey across GitHub, LeetCode,
                            and Codeforces. Track progress, compare skills, and
                            showcase your programming prowess.
                        </p>
                        <button
                            ref={ctaRef}
                            onClick={navigateToDashboard}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            data-cursor
                        >
                            Start Your Journey{" "}
                            <HiSparkles className="inline ml-2" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-20"
                id="Features"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center text-white mb-16">
                        Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <FaGithub className="text-4xl text-purple-400" />
                                ),
                                title: "GitHub Integration",
                                description:
                                    "Connect your GitHub profile and showcase your repositories, contributions, and coding activity.",
                            },
                            {
                                icon: (
                                    <SiLeetcode className="text-4xl text-yellow-400" />
                                ),
                                title: "LeetCode Tracking",
                                description:
                                    "Monitor your LeetCode progress, solved problems, and skill improvements over time.",
                            },
                            {
                                icon: (
                                    <SiCodeforces className="text-4xl text-blue-400" />
                                ),
                                title: "Codeforces Stats",
                                description:
                                    "Track your competitive programming journey with detailed Codeforces statistics.",
                            },
                            {
                                icon: (
                                    <FaChartLine className="text-4xl text-green-400" />
                                ),
                                title: "Progress Analytics",
                                description:
                                    "Visualize your coding progress with beautiful charts and detailed analytics.",
                            },
                            {
                                icon: (
                                    <FaUsers className="text-4xl text-pink-400" />
                                ),
                                title: "Compare Profiles",
                                description:
                                    "Compare your coding skills with friends and see where you stand.",
                            },
                            {
                                icon: (
                                    <FaTrophy className="text-4xl text-orange-400" />
                                ),
                                title: "Achievement System",
                                description:
                                    "Earn badges and achievements as you reach new milestones in your coding journey.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                ref={(el) => (featuresRef.current[index] = el)}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                                data-cursor
                            >
                                <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 text-center">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Working Section */}
            <section
                className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20"
                id="Working"
            >
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center text-white mb-16">
                        How It Works
                    </h2>
                    <div className="space-y-16">
                        {[
                            {
                                step: "01",
                                title: "Connect Your Accounts",
                                description:
                                    "Link your GitHub, LeetCode, and Codeforces profiles to get started. We'll securely fetch your data and keep it up to date.",
                                icon: (
                                    <BiUser className="text-5xl text-purple-400" />
                                ),
                                color: "purple",
                            },
                            {
                                step: "02",
                                title: "Analyze Your Data",
                                description:
                                    "Our advanced algorithms analyze your coding patterns, skills, and progress across all platforms to provide insights.",
                                icon: (
                                    <FaChartLine className="text-5xl text-blue-400" />
                                ),
                                color: "blue",
                            },
                            {
                                step: "03",
                                title: "Track Your Progress",
                                description:
                                    "Monitor your improvement over time with detailed statistics, visualizations, and personalized recommendations.",
                                icon: (
                                    <BiTrendingUp className="text-5xl text-green-400" />
                                ),
                                color: "green",
                            },
                            {
                                step: "04",
                                title: "Compare & Compete",
                                description:
                                    "Compare your skills with friends and the community. Set goals and compete to become a better programmer.",
                                icon: (
                                    <FaTrophy className="text-5xl text-yellow-400" />
                                ),
                                color: "yellow",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                ref={(el) =>
                                    (workingStepsRef.current[index] = el)
                                }
                                className={`flex items-center gap-8 ${
                                    index % 2 === 0
                                        ? "flex-row"
                                        : "flex-row-reverse"
                                } group`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span
                                            className={`text-6xl font-bold text-${item.color}-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                                        >
                                            {item.step}
                                        </span>
                                        <div className="group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div
                                        className={`w-64 h-64 bg-gradient-to-br from-${item.color}-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-${item.color}-400/30 group-hover:border-${item.color}-400/60 transition-all duration-300 group-hover:scale-105`}
                                    >
                                        <div className="group-hover:scale-125 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section
                className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-20"
                id="Why_Us"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center text-white mb-16">
                        Why Choose ProfiLer?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <FaRocket className="text-4xl text-purple-400" />
                                ),
                                title: "Boost Your Career",
                                description:
                                    "Showcase your coding skills to potential employers with a comprehensive profile.",
                            },
                            {
                                icon: (
                                    <FaShieldAlt className="text-4xl text-blue-400" />
                                ),
                                title: "Secure & Private",
                                description:
                                    "Your data is encrypted and secure. We respect your privacy and never share personal information.",
                            },
                            {
                                icon: (
                                    <FaLightbulb className="text-4xl text-yellow-400" />
                                ),
                                title: "Smart Insights",
                                description:
                                    "Get personalized recommendations and insights to improve your coding skills.",
                            },
                            {
                                icon: (
                                    <BiCodeCurly className="text-4xl text-green-400" />
                                ),
                                title: "All Platforms",
                                description:
                                    "One dashboard for all your coding platforms. No need to switch between multiple sites.",
                            },
                            {
                                icon: (
                                    <FaUsers className="text-4xl text-pink-400" />
                                ),
                                title: "Community Driven",
                                description:
                                    "Join a community of developers and learn from each other's experiences.",
                            },
                            {
                                icon: (
                                    <HiSparkles className="text-4xl text-orange-400" />
                                ),
                                title: "Free Forever",
                                description:
                                    "Core features are completely free. No hidden costs or premium tiers.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                ref={(el) =>
                                    (whyUsCardsRef.current[index] = el)
                                }
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                                data-cursor
                            >
                                <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 text-center">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-center">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section
                className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20"
                id="Contact_Us"
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center text-white mb-16">
                        Get In Touch
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8">
                                Contact Information
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <MdEmail className="text-2xl text-purple-400" />
                                    <div>
                                        <p className="text-white font-medium">
                                            Email
                                        </p>
                                        <p className="text-gray-300">
                                            hello@profiler.dev
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MdPhone className="text-2xl text-purple-400" />
                                    <div>
                                        <p className="text-white font-medium">
                                            Phone
                                        </p>
                                        <p className="text-gray-300">
                                            +1 (555) 123-4567
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MdLocationOn className="text-2xl text-purple-400" />
                                    <div>
                                        <p className="text-white font-medium">
                                            Location
                                        </p>
                                        <p className="text-gray-300">
                                            San Francisco, CA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={contactFormRef}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                        >
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                                        placeholder="Your message..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    data-cursor
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="parallax-bg absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="parallax-bg absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
                <div className="parallax-bg absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="parallax-bg absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="parallax-bg absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full opacity-25 animate-pulse"></div>
                <div className="parallax-bg absolute top-3/4 right-1/2 w-2 h-2 bg-orange-400 rounded-full opacity-35 animate-pulse"></div>
            </div>

            {/* Floating Code Snippets */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-20 left-10 text-purple-400/10 font-mono text-sm rotate-12 animate-pulse">
                    {'{ code: "amazing" }'}
                </div>
                <div className="absolute top-40 right-20 text-pink-400/10 font-mono text-sm -rotate-12 animate-pulse">
                    {'function() { return "awesome"; }'}
                </div>
                <div className="absolute bottom-40 left-20 text-blue-400/10 font-mono text-sm rotate-6 animate-pulse">
                    {'console.log("ProfiLer");'}
                </div>
                <div className="absolute bottom-20 right-40 text-green-400/10 font-mono text-sm -rotate-6 animate-pulse">
                    {'const skills = ["react", "node"];'}
                </div>
            </div>
        </div>
    );
}

export default Landing;

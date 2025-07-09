"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Landing() {
    const homeRef = useRef(null);
    const featuresRef = useRef(null);
    const workingRef = useRef(null);
    const whyusRef = useRef(null);
    const techRef = useRef(null);
    const structureRef = useRef(null);
    const galleryRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        if (homeRef.current) {
            gsap.fromTo(
                homeRef.current.querySelector("h1"),
                { y: 80, opacity: 0, skewY: 8 },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: 0.2,
                }
            );
            gsap.fromTo(
                homeRef.current.querySelector("p"),
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.7,
                }
            );
            gsap.fromTo(
                homeRef.current.querySelector("button"),
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: "back.out(1.7)",
                    delay: 1.2,
                }
            );
        }

        [
            featuresRef,
            workingRef,
            whyusRef,
            techRef,
            structureRef,
            galleryRef,
            contactRef,
        ].forEach((ref, i) => {
            if (ref.current) {
                // Set initial state without making invisible
                gsap.set(ref.current, { y: 30, opacity: 1 });

                gsap.to(ref.current, {
                    y: 0,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                    },
                    delay: 0.1 * i,
                });
            }
        });
    }, []);

    return (
        <div className="relative text-white">
            {/* Home Section */}
            <section
                id="Home"
                ref={homeRef}
                className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gradient-to-l from-purple-900/60 via-purple-900/20 to-transparent relative overflow-hidden"
            >
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="w-full h-full bg-gradient-to-tr from-pink-500/10 via-purple-700/10 to-blue-500/10 blur-2xl animate-pulse" />
                </div>
                <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
                    Welcome to <span className="text-pink-400">Profiler</span>
                </h1>
                <p className="relative z-10 text-lg md:text-2xl max-w-3xl mb-6 text-white/90 leading-relaxed">
                    A comprehensive platform that unifies your coding journey
                    across multiple platforms. Effortlessly compare and analyze
                    coding profiles from Codeforces, LeetCode, and GitHub. Track
                    your progress, discover insights, and boost your competitive
                    edge with advanced analytics and beautiful visualizations.
                </p>
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-8">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-12 rounded-full shadow-xl text-xl transition duration-300">
                        Get Started Free
                    </button>
                    <button className="bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-4 px-12 rounded-full transition duration-300">
                        View Demo
                    </button>
                </div>
                <div className="relative z-10 flex items-center gap-6 text-white/70">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        <span>Free to Use</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                        <span>Open Source</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                        <span>No Registration Required</span>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
                    <svg
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="text-pink-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="Features"
                ref={featuresRef}
                className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-transparent to-purple-900/40"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                    Powerful Features
                </h2>
                <p className="text-lg text-white/80 max-w-3xl text-center mb-12">
                    Discover why thousands of developers trust Profiler to track
                    their coding journey and compare their progress with peers
                    worldwide.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                    <FeatureCard
                        icon="🌐"
                        title="Multi-Platform Integration"
                        desc="Seamlessly aggregate data from Codeforces, LeetCode, GitHub, and more platforms in real-time."
                    />
                    <FeatureCard
                        icon="📊"
                        title="Advanced Analytics"
                        desc="Deep insights with interactive charts, progress tracking, and performance metrics over time."
                    />
                    <FeatureCard
                        icon="🤝"
                        title="Smart Comparisons"
                        desc="Compare your stats with friends, top-rated users, or industry professionals with detailed breakdowns."
                    />
                    <FeatureCard
                        icon="🎯"
                        title="Goal Tracking"
                        desc="Set coding goals, track milestones, and receive personalized recommendations for improvement."
                    />
                    <FeatureCard
                        icon="📱"
                        title="Mobile Responsive"
                        desc="Access your coding dashboard anywhere with our fully responsive design and mobile app."
                    />
                    <FeatureCard
                        icon="�"
                        title="Smart Notifications"
                        desc="Get notified about contest updates, achievement milestones, and friend activities."
                    />
                    <FeatureCard
                        icon="🏆"
                        title="Achievement System"
                        desc="Unlock badges, celebrate milestones, and showcase your coding journey with a gamified experience."
                    />
                    <FeatureCard
                        icon="📈"
                        title="Trend Analysis"
                        desc="Identify patterns in your coding behavior and get insights to optimize your learning path."
                    />
                </div>
            </section>

            {/* Project Gallery Section */}
            <section
                id="Gallery"
                ref={galleryRef}
                className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-purple-900/40 to-transparent"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                    See Profiler in Action
                </h2>
                <p className="text-lg text-white/80 max-w-3xl text-center mb-12">
                    Explore our intuitive interface and powerful features
                    through these screenshots and demos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-7xl">
                    {/* Large featured card - spans 2x2 */}
                    <div className="md:col-span-2 lg:col-span-3 md:row-span-2">
                        <ImageCard
                            title="Dashboard Overview"
                            desc="Your coding stats at a glance with beautiful visualizations and comprehensive analytics"
                            placeholder="/dashboard.png"
                            size="large"
                        />
                    </div>

                    {/* Medium card - spans 1x2 */}
                    <div className="md:col-span-2 lg:col-span-3 md:row-span-1">
                        <ImageCard
                            title="Profile Comparison"
                            desc="Side-by-side comparison of multiple coding profiles with detailed metrics"
                            placeholder="/compare.png"
                            size="medium"
                        />
                    </div>

                    {/* Small card - spans 1x1 */}
                    <div className="md:col-span-1 lg:col-span-2 md:row-span-1">
                        <ImageCard
                            title="Analytics"
                            desc="Deep insights with interactive charts"
                            placeholder="/profile.png"
                            size="small"
                        />
                    </div>

                    {/* Small card - spans 1x1 */}
                    <div className="md:col-span-1 lg:col-span-1 md:row-span-1">
                        <ImageCard
                            title="Repos"
                            desc="GitHub repository insights"
                            placeholder="/repo.png"
                            size="small"
                        />
                    </div>

                    {/* Medium horizontal card - spans 2x1 */}
                    <div className="md:col-span-2 lg:col-span-3 md:row-span-1">
                        <ImageCard
                            title="Contest Tracking"
                            desc="Track your performance across different coding contests and competitions"
                            placeholder="/contest.png"
                            size="wide"
                        />
                    </div>
                </div>
            </section>

            {/* Working Section */}
            <section
                id="Working"
                ref={workingRef}
                className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-transparent to-purple-900/40"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                    How Profiler Works
                </h2>
                <p className="text-lg text-white/80 max-w-3xl text-center mb-12">
                    Get started in minutes with our simple three-step process.
                    No complex setup required - just enter your usernames and
                    start exploring!
                </p>
                <div className="max-w-4xl mx-auto space-y-12">
                    <Step
                        number="1"
                        title="Connect Your Profiles"
                        desc="Simply enter your usernames for Codeforces, LeetCode, and GitHub. Our system securely fetches your public data without requiring passwords or API keys."
                        features={[
                            "No registration required",
                            "Secure data fetching",
                            "Real-time synchronization",
                            "Multiple platform support",
                        ]}
                    />
                    <Step
                        number="2"
                        title="Intelligent Data Analysis"
                        desc="Our advanced algorithms analyze your coding patterns, contest performance, and contribution history to generate meaningful insights and personalized recommendations."
                        features={[
                            "Performance tracking",
                            "Skill assessment",
                            "Progress visualization",
                            "Personalized insights",
                        ]}
                    />
                    <Step
                        number="3"
                        title="Explore & Compare"
                        desc="Dive into your comprehensive dashboard with interactive charts, compare with other users, set goals, and track your coding journey with detailed analytics."
                        features={[
                            "Interactive dashboards",
                            "User comparisons",
                            "Goal tracking",
                            "Achievement system",
                        ]}
                    />
                </div>
            </section>

            {/* Technology Stack Section */}
            <section
                id="Technology"
                ref={techRef}
                className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-purple-900/40 to-transparent"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                    Built with Modern Technologies
                </h2>
                <p className="text-lg text-white/80 max-w-3xl text-center mb-12">
                    Profiler is built using cutting-edge technologies to ensure
                    optimal performance, scalability, and user experience.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
                    <TechCard
                        category="Frontend Framework"
                        technologies={[
                            "Next.js",
                            "React",
                            "Tailwind CSS",
                            "GSAP Animations",
                        ]}
                        icon="⚛️"
                    />
                    <TechCard
                        category="Data Visualization"
                        technologies={[
                            "Chart.js",
                            "Interactive Charts",
                            "Real-time Updates",
                            "Custom Visualizations",
                        ]}
                        icon="📊"
                    />
                    <TechCard
                        category="Backend & Database"
                        technologies={[
                            "Supabase",
                            "PostgreSQL",
                            "Real-time Database",
                            "Authentication",
                        ]}
                        icon="🗄️"
                    />
                    <TechCard
                        category="External APIs"
                        technologies={[
                            "GitHub API",
                            "LeetCode API",
                            "Codeforces API",
                            "Contest Data",
                        ]}
                        icon="🔗"
                    />
                    <TechCard
                        category="Automation"
                        technologies={[
                            "Cron Jobs",
                            "Daily Updates",
                            "Scheduled Tasks",
                            "Data Synchronization",
                        ]}
                        icon="⏰"
                    />
                    <TechCard
                        category="Deployment"
                        technologies={[
                            "Vercel",
                            "Edge Functions",
                            "Global CDN",
                            "Serverless",
                        ]}
                        icon="�"
                    />
                </div>
            </section>

            {/* Project Structure Section */}
            <section
                id="Structure"
                ref={structureRef}
                className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-transparent to-purple-900/40"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                    Project Architecture
                </h2>
                <p className="text-lg text-white/80 max-w-3xl text-center mb-12">
                    Explore the well-organized structure of our codebase,
                    designed for maintainability and scalability.
                </p>
                <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
                    <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-purple-400">
                            📁 Project Structure
                        </h3>
                        <div className="font-mono text-sm space-y-1 text-white/80">
                            <div>📦 profiler/</div>
                            <div className="ml-4">├── 📁 src/</div>
                            <div className="ml-8">
                                ├── 📁 app/{" "}
                                <span className="text-purple-300">
                                    # Next.js App Router
                                </span>
                            </div>
                            <div className="ml-12">
                                ├── 📁 api/{" "}
                                <span className="text-purple-300">
                                    # API routes
                                </span>
                            </div>
                            <div className="ml-12">
                                ├── 📁 dashboard/{" "}
                                <span className="text-purple-300">
                                    # Dashboard pages
                                </span>
                            </div>
                            <div className="ml-12">
                                ├── 📁 compare/{" "}
                                <span className="text-purple-300">
                                    # Comparison tools
                                </span>
                            </div>
                            <div className="ml-12">
                                └── 📁 profiles/{" "}
                                <span className="text-purple-300">
                                    # User profiles
                                </span>
                            </div>
                            <div className="ml-8">
                                ├── 📁 components/{" "}
                                <span className="text-purple-300">
                                    # Reusable components
                                </span>
                            </div>
                            <div className="ml-8">
                                ├── 📁 context/{" "}
                                <span className="text-purple-300">
                                    # React Context
                                </span>
                            </div>
                            <div className="ml-8">
                                ├── 📁 lib/{" "}
                                <span className="text-purple-300">
                                    # Utilities & configs
                                </span>
                            </div>
                            <div className="ml-8">
                                ├── 📁 pages/{" "}
                                <span className="text-purple-300">
                                    # Landing pages
                                </span>
                            </div>
                            <div className="ml-8">
                                └── 📁 util/{" "}
                                <span className="text-purple-300">
                                    # Helper functions
                                </span>
                            </div>
                            <div className="ml-4">
                                ├── 📁 public/{" "}
                                <span className="text-purple-300">
                                    # Static assets
                                </span>
                            </div>
                            <div className="ml-4">├── 📄 package.json</div>
                            <div className="ml-4">├── 📄 next.config.mjs</div>
                            <div className="ml-4">
                                └── 📄 tailwind.config.js
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-3 text-pink-400">
                                🎯 Key Features
                            </h4>
                            <ul className="space-y-2 text-white/80">
                                <li>• Modular component architecture</li>
                                <li>• API route organization</li>
                                <li>• Context-based state management</li>
                                <li>• Utility function separation</li>
                                <li>• Clean code structure</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-3 text-blue-400">
                                🔧 Development Setup
                            </h4>
                            <div className="space-y-2 text-sm font-mono bg-gray-900 p-4 rounded-lg">
                                <div className="text-green-400">
                                    # Clone the repository
                                </div>
                                <div className="text-white">
                                    git clone
                                    https://github.com/your-repo/profiler
                                </div>
                                <div className="text-green-400">
                                    # Install dependencies
                                </div>
                                <div className="text-white">pnpm install</div>
                                <div className="text-green-400">
                                    # Start development server
                                </div>
                                <div className="text-white">pnpm dev</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section
                id="Why_Us"
                ref={whyusRef}
                className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-transparent to-purple-900/40"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-tight">
                    Why Choose Profiler?
                </h2>
                <ul className="space-y-6 max-w-2xl text-lg">
                    <ListItem>
                        <strong>Unified Platform:</strong> All your coding
                        achievements in one place.
                    </ListItem>
                    <ListItem>
                        <strong>Modern & Intuitive:</strong> A user-friendly
                        design that's a pleasure to use.
                    </ListItem>
                    <ListItem>
                        <strong>Open Source:</strong> Community-driven,
                        transparent, and constantly improving.
                    </ListItem>
                    <ListItem>
                        <strong>Free to Use:</strong> All features are available
                        for free to everyone.
                    </ListItem>
                </ul>
            </section>

            {/* Contact Section */}
            <section
                id="Contact_Us"
                ref={contactRef}
                className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gradient-to-b from-purple-900/40 to-transparent"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    Join Our Community
                </h2>
                <p className="text-lg max-w-3xl mb-12 text-white/90 leading-relaxed">
                    Have questions, feedback, or want to contribute? We'd love
                    to hear from you. Join thousands of developers who are
                    already using Profiler to enhance their coding journey.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl">
                    <ContactCard
                        icon="📧"
                        title="Email Us"
                        desc="Get in touch for support or partnerships"
                        action="noaboutgamer@gmail.com"
                        link="mailto:noaboutgamer@gmail.com"
                    />
                    <ContactCard
                        icon="🐙"
                        title="GitHub"
                        desc="Contribute to our open-source project"
                        action="View Repository"
                        link="https://github.com/J33rry/ProFiLeR"
                    />
                    <ContactCard
                        icon="💬"
                        title="Discord"
                        desc="Join our developer community"
                        action="Join Server"
                        link="#"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="mailto:hello@profiler.com"
                        className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg"
                    >
                        Contact Us
                    </a>
                    <a
                        href="https://github.com/J33rry/ProFiLeR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300"
                    >
                        Star on GitHub
                    </a>
                </div>
            </section>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg flex flex-col items-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/80">{desc}</p>
    </div>
);

const ImageCard = ({ title, desc, placeholder, size = "medium" }) => {
    const sizeClasses = {
        small: "h-32",
        medium: "h-48",
        large: "h-64 md:h-80",
        wide: "h-40",
    };

    return (
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 h-full">
            <div
                className={`${sizeClasses[size]} bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center relative overflow-hidden`}
            >
                <img
                    src={placeholder}
                    alt={title}
                    className="object-cover w-full h-full"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="p-4">
                <h3
                    className={`font-bold mb-2 ${
                        size === "large"
                            ? "text-2xl"
                            : size === "small"
                            ? "text-lg"
                            : "text-xl"
                    }`}
                >
                    {title}
                </h3>
                <p
                    className={`text-white/80 ${
                        size === "small" ? "text-xs" : "text-sm"
                    }`}
                >
                    {desc}
                </p>
            </div>
        </div>
    );
};

const Step = ({ number, title, desc, features }) => (
    <div className="flex items-start space-x-6 mb-4">
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
            {number}
        </div>
        <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-white/80 mb-4 leading-relaxed">{desc}</p>
            {features && (
                <div className="grid grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center text-sm text-white/70"
                        >
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                            {feature}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const TechCard = ({ category, technologies, icon }) => (
    <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{icon}</span>
            <h3 className="text-xl font-bold">{category}</h3>
        </div>
        <ul className="space-y-2">
            {technologies.map((tech, index) => (
                <li key={index} className="flex items-center text-white/80">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    {tech}
                </li>
            ))}
        </ul>
    </div>
);

const ContactCard = ({ icon, title, desc, action, link }) => (
    <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{desc}</p>
        <a
            href={link}
            target={link.startsWith("http") ? "_blank" : "_self"}
            rel={link.startsWith("http") ? "noopener noreferrer" : ""}
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
        >
            {action}
        </a>
    </div>
);

const ListItem = ({ children }) => (
    <li className="flex items-center">
        <svg
            className="w-6 h-6 text-green-400 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
        {children}
    </li>
);

export default Landing;

// "use client";
// import React, { useEffect, useState } from "react";

// export default function CustomCursor() {
//     const [position, setPosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//         const moveCursor = (e) => {
//             setPosition({ x: e.clientX, y: e.clientY });
//         };
//         window.addEventListener("mousemove", moveCursor);
//         return () => window.removeEventListener("mousemove", moveCursor);
//     }, []);

//     return (
//         <div
//             className="fixed top-0 left-0 z-[9999] pointer-events-none bg-white mix-blend-difference w-6 h-6 rounded-full"
//             style={{
//                 transform: `translate(${position.x}px, ${position.y}px)`,
//             }}
//         >
//             <div
//                 className="w-6 h-6 rounded-full "
//                 style={{
//                     transform: "translate(-50%, -50%)",
//                 }}
//             />
//         </div>
//     );
// }
"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [targetRect, setTargetRect] = useState(null);
    const [borderRadius, setBorderRadius] = useState("20px");

    const [snapping, setSnapping] = useState(false);

    useEffect(() => {
        const updateCursor = (e) => {
            if (targetRect) {
                setSnapping(true); // Enable transition
                // Snap to element center
                const x = targetRect.left + targetRect.width / 2;
                const y = targetRect.top + targetRect.height / 2;
                cursorRef.current.style.transform = `translate(${
                    x - targetRect.width / 2
                }px, ${y - targetRect.height / 2}px)`;
                cursorRef.current.style.width = `${targetRect.width}px`;
                cursorRef.current.style.height = `${targetRect.height}px`;
                cursorRef.current.style.borderRadius = borderRadius;
            } else {
                setSnapping(false); // Disable transition
                cursorRef.current.style.transform = `translate(${
                    e.clientX - 20
                }px, ${e.clientY - 20}px)`;
                cursorRef.current.style.width = `40px`;
                cursorRef.current.style.height = `40px`;
                cursorRef.current.style.borderRadius = "50%"; // Default radius
            }
        };

        const handleMouseOver = (e) => {
            const el = e.target.closest("[data-cursor]");
            if (el) {
                const computedStyle = getComputedStyle(el);
                const borderRadius = computedStyle.borderRadius;
                const rect = el.getBoundingClientRect();
                setBorderRadius(borderRadius);
                setTargetRect(rect);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest("[data-cursor]")) {
                setTargetRect(null);
            }
        };

        window.addEventListener("mousemove", updateCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", updateCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, [targetRect]);

    return (
        <div
            ref={cursorRef}
            className={`hidden lg:flex fixed top-0 left-0 pointer-events-none z-[9999] bg-white mix-blend-difference ease-in-out ${
                snapping ? "transition-all duration-200 ease-in-out" : ""
            }`}
        ></div>
    );
}

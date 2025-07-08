"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [targetRect, setTargetRect] = useState(null);
    const [borderRadius, setBorderRadius] = useState("20px");

    const [snapping, setSnapping] = useState(false);

    useEffect(() => {
        const updateCursor = (e) => {
            if (!cursorRef.current) return;

            if (targetRect) {
                // Check if the target element still exists in the DOM
                const targetElement = document.elementFromPoint(
                    targetRect.left + targetRect.width / 2,
                    targetRect.top + targetRect.height / 2
                );

                if (!targetElement || !targetElement.closest("[data-cursor]")) {
                    // Element was removed, reset cursor
                    setTargetRect(null);
                    return;
                }

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

        const handleClick = () => {
            // Reset cursor state on click to handle cases where elements are removed
            setTimeout(() => {
                if (targetRect) {
                    const targetElement = document.elementFromPoint(
                        targetRect.left + targetRect.width / 2,
                        targetRect.top + targetRect.height / 2
                    );

                    if (
                        !targetElement ||
                        !targetElement.closest("[data-cursor]")
                    ) {
                        setTargetRect(null);
                    }
                }
            }, 100); // Small delay to allow DOM updates
        };

        window.addEventListener("mousemove", updateCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", updateCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
            window.removeEventListener("click", handleClick);
        };
    }, [targetRect]);

    return (
        <div
            ref={cursorRef}
            className={`hidden lg:flex fixed top-0 left-0 pointer-events-none z-[9999] bg-white mix-blend-difference ease-in-out ${
                snapping ? "transition-all duration-400 ease-in-out" : ""
            }`}
        ></div>
    );
}

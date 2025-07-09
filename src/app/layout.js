import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataProvider } from "@/context/Datacontext";
import CustomCursor from "@/components/CustomCursor";

import { Plus_Jakarta_Sans, Inconsolata } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
});

const inconsolata = Inconsolata({
    variable: "--font-inconsolata",
    subsets: ["latin"],
});
export const metadata = {
    title: "Profiler",
    description: "Profiler - Your Coding Companion",
};

export default function RootLayout({ children }) {
    return (
        <ViewTransitions>
            <html lang="en">
                <body
                    className={`antialiased cursor-none ${plusJakartaSans.variable} ${inconsolata.variable}`}
                >
                    <CustomCursor />
                    <DataProvider>
                        {children}

                        <ToastContainer />
                    </DataProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}

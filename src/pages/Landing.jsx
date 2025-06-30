import React from "react";

function Landing() {
    return (
        <div className="ml-16 md:ml-20 lg:ml-56 flex-1 overflow-y-auto p-4 lg:p-8 bg-green-400">
            <section className="h-screen bg-red-400" id="Home"></section>
            <section className="h-screen bg-yellow-300" id="Features"></section>
            <section className="h-screen bg-purple-500" id="Working"></section>
            <section className="h-screen bg-yellow-300" id="Why_Us"></section>
            <section
                className="h-screen bg-purple-500"
                id="Contact_Us"
            ></section>
        </div>
    );
}

export default Landing;

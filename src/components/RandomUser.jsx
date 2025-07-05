import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaUserAstronaut,
    FaUserGraduate,
    FaUserInjured,
    FaUserMd,
    FaUserNinja,
    FaUserNurse,
    FaUserSecret,
    FaUserTie,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

function RandomUser() {
    const users = [
        <FaUserDoctor className="size-18" />,
        <FaUserAstronaut className="size-18" />,
        <FaUserNinja className="size-18" />,
        <FaUserGraduate className="size-18" />,
        <FaUserInjured className="size-18" />,
        <FaUserSecret className="size-18" />,
        <FaUser className="size-18" />,
        <FaUserMd className="size-18" />,
        <FaUserNurse className="size-18" />,
        <FaUserTie className="size-18" />,
    ];
    const [number, setNumber] = useState(0);
    useEffect(() => {
        const random = Math.floor(Math.random() * 11);
        setNumber(random);
    }, []);

    // const generateNumber = () => {
    // };

    return <div>{users[number]}</div>;
}

export default RandomUser;

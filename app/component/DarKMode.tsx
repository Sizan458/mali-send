'use client'
import { Dark } from '@/lib/Hooks/DarkMode';
import React from 'react'
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const DarkMode = () => {
    const { changeTheme, mode } = Dark();
    return (
        <div>
            <p className="btn text-lg font-bold btn-ghost rounded-full" onClick={() => changeTheme()}>
                {mode === "dark" ? <BsFillMoonFill /> : <BsFillSunFill />}
            </p>
        </div>
    );
}

export default DarkMode;

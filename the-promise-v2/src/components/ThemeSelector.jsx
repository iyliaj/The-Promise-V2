

import { useState } from "react";

export function ThemeSelector({ handleClick }) {
    // Initialise from the DOM, then track locally so the highlight re-renders correctly
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    const handleThemeClick = (e) => {
        const newTheme = e.currentTarget.id === "dark-mode";
        // Only update if actually switching
        if (newTheme !== isDark) {
            handleClick(e);
            setIsDark(newTheme);
        }
    };

    return (
        <div className="interface-theme-selector w-55 h-13 flex justify-between items-center">
            <p className="block text-primary text-medium">
                Interface
            </p>
            <div className="w-25 h-9 bg-canvas rounded-md flex justify-evenly items-center">
                <button
                    id="light-mode"
                    onClick={handleThemeClick}
                    className={`${!isDark ? "text-canvas bg-primary" : "text-primary bg-canvas"} text-[0.8rem] p-1 rounded-md cursor-pointer w-11`}
                >
                    Light
                </button>
                <button
                    id="dark-mode"
                    onClick={handleThemeClick}
                    className={`${isDark ? "text-canvas bg-primary" : "text-primary bg-canvas"} text-[0.8rem] p-1 rounded-md cursor-pointer w-11`}
                >
                    Dark
                </button>
            </div>
        </div>
    )
}
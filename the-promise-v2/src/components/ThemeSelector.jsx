

export function ThemeSelector({ handleClick, isDarkMode }) {



    return (
        <div className="interface-theme-selector w-55 h-13 flex justify-between items-center">
            <p className="block text-primary text-medium">
                Interface
            </p>
            <div className="w-25 h-9 bg-canvas rounded-md flex justify-evenly items-center">
                <button
                    id="light-mode"
                    onClick={handleClick}
                    className={`${isDarkMode === "light" ? "text-canvas bg-primary" : "text-primary bg-canvas"} text-[0.8rem] p-1 rounded-md cursor-pointer w-11`}
                >
                    Light
                </button>
                <button
                    id="dark-mode"
                    onClick={handleClick}
                    className={`${isDarkMode === "dark" ? "text-canvas bg-primary" : "text-primary bg-canvas"} text-[0.8rem] p-1 rounded-md cursor-pointer w-11`}
                >
                    Dark
                </button>
            </div>
        </div>
    )
}
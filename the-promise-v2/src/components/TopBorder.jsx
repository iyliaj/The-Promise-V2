


export function TopBorder({ isDarkMode }) {
    return (
        <div className={`top-border w-full h-14 absolute top-0 z-10 ${isDarkMode === "light" ? "bg-primary" : "bg-dark-primary"}`}></div>
    )
}
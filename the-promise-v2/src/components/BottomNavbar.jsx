


export function BottomNavbar() {
    return (
        <div className="bottom-navbar w-full h-24 bg-primary absolute bottom-0 left-0 z-10 flex justify-around items-center">
            <a href="/">
                <div className="mainpage-link w-25 h-20 bg-canvas rounded-md flex justify-center items-center hover:bg-gray-200">Mainpage</div>
            </a>
            <a href="/ratings">
                <div className="ratings-link w-25 h-20 bg-canvas rounded-md flex justify-center items-center hover:bg-gray-200">Ratings</div>
            </a>

            <div className="settings-link w-25 h-20 bg-canvas rounded-md flex justify-center items-center hover:bg-gray-200">Settings</div>
        </div>
    )
}
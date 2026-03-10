


export function ButtonsGroupDesktop({ handleClick, handleViewAllPromises }) {
    return (
        <div className="buttons-group-desktop w-140 flex items-center gap-2 mr-10">
            <button
                id="new-promise"
                className="new-promise-btn-top bg-primary dark:bg-dark-primary"
                onClick={handleClick}
            >
                <svg width="12" height="12" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11H11M11 11H21M11 11V21M11 11V1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                New Promise
            </button>
            <button
                onClick={handleViewAllPromises}
                className="view-all-promises-top text-primary dark:text-dark-primary"
            >
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.87512 14.8462H19.0001M5.50012 12.5385L2.68762 16.0001L1.00012 14.8462M8.87512 9.07698H19.0001M5.50012 6.76929L2.68762 10.2308L1.00012 9.07698M8.87512 3.30775H19.0001M5.50012 1.00006L2.68762 4.4616L1.00012 3.30775" stroke="#414C60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All promises
            </button>
        </div>
    )
}
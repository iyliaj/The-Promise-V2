import { useEffect, useState, useMemo } from "react";
import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";
import { NewPromiseForm } from "./components/NewPromiseForm";
import { Timer } from "./components/Timer";
import { PromiseCard } from "./components/PromiseCard";
import { setItem } from "./utils/localStorage";
import "./MainPage.css";


export function MainPage({ userData, setUserData, isDarkMode, playPopSound, isSoundOn, playRejectSound, playSuccessfulSubmit, playExpiryAlarm, playCompletedPromise }) {

    // Sorts data on load and every time promises data changes
    const sortedPromises = useMemo(() => {
        return [...userData.promises].sort((a, b) => {
            const deadlineA = new Date(`${a.date}T${a.time}`);
            const deadlineB = new Date(`${b.date}T${b.time}`);
            return deadlineA.getTime() - deadlineB.getTime();
        });
    }, [userData.promises]);

    // Save updated data to localStorage when userData is updated
    useEffect(() => {
        setItem("userData", userData)
        console.log("Data updated")
    }, [userData]);

    // To track if new promise window is open
    const [newPromiseStatus, setNewPromiseStatus] = useState(false);

    // To track if complete promise window is open
    const [completePromiseState, setCompletePromiseState] = useState("loaded");

    // To track latest promise display fade in
    const [isFadedIn, setIsFadedIn] = useState("loaded");

    // To track if all promises view window is open
    const [allPromisesView, setAllPromisesView] = useState(false);

    // To track if latest promise is expired or not
    const [isExpired, setIsExpired] = useState(false);


    const handleClick = () => {
        newPromiseStatus === false ? setNewPromiseStatus(true) : setNewPromiseStatus(false);
        playPopSound(isSoundOn ? 0.4 : 0);
    }

    const handleCompletePromiseClick = () => {

        if (completePromiseState === "loaded" || completePromiseState === "collapsed") {
            setCompletePromiseState("expanded");
            setTimeout(() => {
                setIsFadedIn("fadeIn");
            }, 300); // Match the expand animation duration
        } else if (completePromiseState === "expanded") {
            // Fade out first, then collapse
            setIsFadedIn("fadeOut");
            // Reset to loaded or else the fadeOut class will persist and will play a fadeout animation when clicking to expand.
            setIsFadedIn("loaded");
            setTimeout(() => {
                setCompletePromiseState("collapsed");
            }, 300); // Wait for fade out to complete

            // Set back to default state so box won't animate the collapse when page re-renders
            setTimeout(() => {
                setCompletePromiseState("loaded");
            }, 800);

        }

    }

    const updateExpiredPromise = (id) => {

        setUserData(prev => {
            const expiredPromise = prev.promises.find(promise => promise.id === id);

            if (!expiredPromise) {
                console.warn(`Promise with id ${id} not found`);
                return prev;
            }

            return {
                ...prev,
                promises: prev.promises.filter(promise => promise.id !== id),
                ratings: {
                    ...prev.ratings,
                    promisesStatus: {
                        ...prev.ratings.promisesStatus,
                        expiredPromises: [...prev.ratings.promisesStatus.expiredPromises, { ...expiredPromise, status: "expired" }]
                    }
                }
            };
        });

    }

    const handleConfirmPromise = (id) => {

        setUserData(prev => {
            const completedPromise = prev.promises.find(promise => promise.id === id);

            if (!completedPromise) {
                console.warn(`Promise with id ${id} not found`);
                return prev;
            }

            return {
                ...prev,
                promises: prev.promises.filter(promise => promise.id !== id),
                ratings: {
                    ...prev.ratings,
                    promisesStatus: {
                        ...prev.ratings.promisesStatus,
                        completedPromises: [...(prev.ratings.promisesStatus.completedPromises || []), { ...completedPromise, status: "completed" }]
                    }
                }
            };
        });

        playCompletedPromise();

        setCompletePromiseState("loaded");

    }

    const handleViewAllPromises = () => {
        allPromisesView === false ? setAllPromisesView(true) : setAllPromisesView(false);
        playPopSound(isSoundOn ? 0.4 : 0);
    }

    return (
        <div className=
            {
                `w-full h-195 
                ${isDarkMode === "light" ? 
                "bg-canvas" : 
                "bg- bg-secondary"} relative pt-1`
            }
        >

            <TopBorder isDarkMode={isDarkMode} />
            {/* Overlay if complete promise button clicked */}

            {allPromisesView && (
                <div className="all-promies-view w-full h-152 pt-5 px-5 mt-15">
                    <div className="all-promises-title">
                        <p className="text-primary text-large ml-4">
                            All Promises
                        </p>
                    </div>
                    {sortedPromises.length > 0 && (
                        <div className="all-promises w-full h-120 gap-3 flex flex-col items-center overflow-y-auto mt-3">
                            {sortedPromises.map(promise => (
                                <PromiseCard
                                    key={promise.id}
                                    promise={promise}
                                    updateExpiredPromise={updateExpiredPromise}
                                    isDarkMode={isDarkMode}
                                />
                            ))}
                        </div>
                    )}

                    {sortedPromises.length === 0 && (
                        <div className="mt-4 pl-4 w-full h-50">
                            <p className="">Such emptiness...</p>
                        </div>
                    )}

                    <div>
                        <button
                            onClick={handleViewAllPromises}
                            className={
                                `view-all-promises-back 
                                ${isDarkMode === "light" ? 
                                "bg-primary" : 
                                "bg-dark-primary"
                                }`
                            }
                        >
                            <svg 
                                width="11" 
                                height="14" 
                                viewBox="0 0 11 14" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0.742762 8.46424C-0.247589 7.66375 -0.247587 6.15388 0.742763 5.35339L6.81119 0.44834C8.11907 -0.608808 10.0684 0.322069 10.0684 2.00377L10.0684 11.8139C10.0684 13.4956 8.11906 14.4264 6.81118 13.3693L0.742762 8.46424Z" fill="#D9D9D9" />
                            </svg>

                            Back
                        </button>
                    </div>
                </div>
            )}

            {/* If all promises view is not open */}
            {!allPromisesView && (
                <div className="content w-full h-152 pt-1 px-5 mt-15">

                    {/* New Promise is always on display in the Main Page */}
                    <div className="latest-promise-section w-full h-50 flex flex-col justify-around">
                        <div className={
                            `latest-promise-card 
                            ${isDarkMode === "light" ? 
                            "bg-secondary" : 
                            "bg-dark-primary"} 
                            ${isExpired && 
                            "bg-red-950"}`
                            }
                        >

                            {sortedPromises[0] && !isExpired && (
                                <div className="w-full h-full">
                                    <div className="flex flex-col justify-around relative w-[90%]">
                                        <div className={
                                            `latest-promise-header
                                            ${isDarkMode === "light" ? 
                                            "bg-primary" : 
                                            "bg-secondary"} 
                                            `}
                                        >
                                            <p className={
                                                `${isDarkMode === "light" ? 
                                                "text-canvas" : 
                                                "text-primary"} 
                                                text-[0.7rem] 
                                                inline-block`}
                                            >
                                                NEXT PROMISE
                                            </p>
                                        </div>
                                        <div className="text-container w-full h-20 pt-2">
                                            <p className={
                                                `latest-promise-text  
                                                ${isDarkMode === "light" ? 
                                                "text-primary" : 
                                                "text-canvas"}
                                                text-extra-large 
                                                `}
                                            >
                                                {sortedPromises[0].title.length > 30 ? 
                                                sortedPromises[0].title.slice(0, 30) + "..." : 
                                                sortedPromises[0].title}
                                            </p>
                                        </div>

                                    </div>

                                    <div className={
                                        `expanding-box  
                                        ${isDarkMode === "light" ? 
                                        "bg-canvas" : 
                                        "bg-secondary"}  
                                        ${completePromiseState === "expanded" && 
                                        "expand-promise"} 
                                        ${completePromiseState === "collapsed" && 
                                        "collapse-promise"} 
                                        ${completePromiseState === "loaded" && 
                                        ""}
                                        `}
                                    >
                                        <div
                                            onClick={handleCompletePromiseClick}
                                            className={`complete-promise-btn ${isDarkMode === "light" ? "bg-canvas" : "bg-secondary"}`}>
                                            <div className="w-full h-full flex justify-center items-center">
                                                <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#filter0_d_30_26)">
                                                        <path d="M14.8417 13.5756C15.4051 14.2984 15.4051 15.3117 14.8417 16.0346L5.87743 27.5357C4.70739 29.0369 2.29999 28.2095 2.29999 26.3062L2.29999 3.30392C2.29999 1.40064 4.7074 0.573265 5.87744 2.07443L14.8417 13.5756Z" fill="#414C60" />
                                                    </g>
                                                    <defs>
                                                        <filter id="filter0_d_30_26" x="-1.21593e-05" y="3.09944e-06" width="15.5643" height="29.6101" filterUnits="userSpaceOnUse">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                            <feOffset dx="-1" />
                                                            <feGaussianBlur stdDeviation="0.65" />
                                                            <feComposite in2="hardAlpha" operator="out" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0.160827 0 0 0 0 0.187351 0 0 0 0 0.235577 0 0 0 1 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_26" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_30_26" result="shape" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>

                                        {completePromiseState === "expanded" && (
                                            <div className={`latest-promise-container p-4 ${isFadedIn === "fadeIn" && "promise-fadeIn"} ${isFadedIn === "fadeOut" && "promise-fadeOut"}`}>
                                                <p className="text-primary text-medium">
                                                    {sortedPromises[0].title}
                                                </p>
                                                <p className="text-primary text-large mt-3">
                                                    Complete promise?
                                                </p>
                                                <div className="flex gap-3 mt-4">
                                                    <button
                                                        onClick={() => handleConfirmPromise(sortedPromises[0].id)}
                                                        className={`complete-yes-btn ${isDarkMode === "light" ? "bg-primary" : "bg-dark-primary"}`}>
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={handleCompletePromiseClick}
                                                        className={`complete-cancel-btn ${isDarkMode === "light" ? "text-primary" : "text-dark-primary"}`}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            )}

                            {isExpired && (
                                <div className="w-full h-full">
                                    <p className="text-large text-canvas">Promise Expired!</p>
                                    <p className="text-medium text-canvas">You're a hopeless fool</p>
                                </div>
                            )}


                            {sortedPromises.length === 0 && !isExpired && (
                                <div>
                                    <p className={`${isDarkMode === "light" ? "text-primary" : "text-canvas"} text-large`}>
                                        Character building<br></br>starts here.
                                    </p>
                                    <p className={`mt-2 text-small ${isDarkMode === "light" ? "text-primary" : "text-secondary"}`}>
                                        Make a promise to yourself today.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Displays by default and when cancel new promise button is clicked */}
                    {!newPromiseStatus && (
                        <div className="timer-more-promises w-full h-100 flex flex-col justify-around">
                            <div className="latest-promise-timer">
                                <svg 
                                    width="371" 
                                    height="209"
                                    viewBox="0 100 371 29" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="object-cover w-full h-full" 
                                >
                                    <g clipPath="url(#clip0_32_271)">
                                        <path d="M0 50.3148L5.64229 54.5142C11.2653 58.6942 22.5498 67.0929 33.7765 70.5762C45.0224 74.0595 56.2297 72.6275 67.4756 66.7058C78.7022 60.7648 89.9868 50.3148 101.213 47.1798C112.459 44.0642 123.667 48.2442 134.913 52.0952C146.139 55.9268 157.424 59.4102 168.65 62.1775C179.896 64.9642 191.104 67.0155 202.35 64.9255C213.576 62.8355 224.861 56.5655 236.087 57.9975C247.333 59.4102 258.541 68.5056 269.787 73.7306C281.013 78.9556 292.298 80.3102 303.524 75.0852C314.77 69.8602 325.978 58.0555 337.224 60.1455C348.45 62.2549 359.735 78.2395 365.358 86.2512L371 94.2435V0H365.358C359.735 0 348.45 0 337.224 0C325.978 0 314.77 0 303.524 0C292.298 0 281.013 0 269.787 0C258.541 0 247.333 0 236.087 0C224.861 0 213.576 0 202.35 0C191.104 0 179.896 0 168.65 0C157.424 0 146.139 0 134.913 0C123.667 0 112.459 0 101.213 0C89.9868 0 78.7022 0 67.4756 0C56.2297 0 45.0224 0 33.7765 0C22.5498 0 11.2653 0 5.64229 0H0V50.3148Z" fill="#CCD5E6" />
                                        <path d="M0 75.4723L5.64229 82.0906C11.2653 88.6896 22.5498 101.926 33.7765 108.177C45.0224 114.428 56.2297 113.731 67.4756 107.461C78.7022 101.21 89.9868 89.4056 101.213 83.155C112.459 76.885 123.667 76.1883 134.913 78.2396C146.139 80.3102 157.424 85.1482 168.65 89.3089C179.896 93.4695 191.104 96.9528 202.35 94.5339C213.576 92.1149 224.861 83.7936 236.087 85.2063C247.333 86.6383 258.541 97.785 269.787 101.636C281.013 105.468 292.298 101.984 303.524 97.0883C314.77 92.1729 325.978 85.8642 337.224 89.3476C348.45 92.8309 359.735 106.106 365.358 112.763L371 119.401V93.8565L365.358 85.8642C359.735 77.8526 348.45 61.8679 337.224 59.7586C325.978 57.6686 314.77 69.4732 303.524 74.6982C292.298 79.9232 281.013 78.5686 269.787 73.3436C258.541 68.1186 247.333 59.0232 236.087 57.6105C224.861 56.1785 213.576 62.4485 202.35 64.5385C191.104 66.6285 179.896 64.5772 168.65 61.7905C157.424 59.0232 146.139 55.5399 134.913 51.7082C123.667 47.8572 112.459 43.6772 101.213 46.7928C89.9868 49.9278 78.7022 60.3778 67.4756 66.3189C56.2297 72.2405 45.0224 73.6726 33.7765 70.1892C22.5498 66.7059 11.2653 58.3072 5.64229 54.1272L0 49.9278V75.4723Z" fill="#94A5C4" />
                                        <path d="M0 117.272L5.64229 121.104C11.2653 124.955 22.5498 132.618 33.7765 139.585C45.0224 146.552 56.2297 152.822 67.4756 148.622C78.7022 144.423 89.9868 129.793 101.213 122.826C112.459 115.86 123.667 116.556 134.913 117.95C146.139 119.343 157.424 121.394 168.65 124.181C179.896 126.948 191.104 130.432 202.35 128.69C213.576 126.948 224.861 119.982 236.087 121.375C247.333 122.749 258.541 132.502 269.787 137.05C281.013 141.598 292.298 140.94 303.524 138.172C314.77 135.405 325.978 130.49 337.224 131.167C348.45 131.844 359.735 138.114 365.358 141.23L371 144.365V119.014L365.358 112.376C359.735 105.719 348.45 92.4438 337.224 88.9605C325.978 85.4772 314.77 91.7859 303.524 96.7012C292.298 101.597 281.013 105.081 269.787 101.249C258.541 97.3979 247.333 86.2512 236.087 84.8192C224.861 83.4065 213.576 91.7278 202.35 94.1468C191.104 96.5658 179.896 93.0824 168.65 88.9218C157.424 84.7611 146.139 79.9232 134.913 77.8525C123.667 75.8012 112.459 76.4979 101.213 82.7679C89.9868 89.0185 78.7022 100.823 67.4756 107.074C56.2297 113.344 45.0224 114.04 33.7765 107.79C22.5498 101.539 11.2653 88.3025 5.64229 81.7035L0 75.0852V117.272Z" fill="#7283A2" />
                                        <path d="M0 194.486L5.64229 193.093C11.2653 191.719 22.5498 188.932 33.7765 188.932C45.0224 188.932 56.2297 191.719 67.4756 193.093C78.7022 194.486 89.9868 194.486 101.213 192.067C112.459 189.648 123.667 184.81 134.913 183.417C146.139 182.043 157.424 184.094 168.65 184.094C179.896 184.094 191.104 182.043 202.35 181.675C213.576 181.327 224.861 182.681 236.087 184.423C247.333 186.165 258.541 188.294 269.787 187.965C281.013 187.655 292.298 184.868 303.524 183.804C314.77 182.74 325.978 183.397 337.224 185.139C348.45 186.881 359.735 189.706 365.358 191.138L371 192.551V143.978L365.358 140.843C359.735 137.727 348.45 131.457 337.224 130.78C325.978 130.102 314.77 135.018 303.524 137.785C292.298 140.552 281.013 141.21 269.787 136.663C258.541 132.115 247.333 122.362 236.087 120.988C224.861 119.594 213.576 126.561 202.35 128.303C191.104 130.044 179.896 126.561 168.65 123.794C157.424 121.007 146.139 118.956 134.913 117.562C123.667 116.169 112.459 115.472 101.213 122.439C89.9868 129.406 78.7022 144.036 67.4756 148.235C56.2297 152.435 45.0224 146.165 33.7765 139.198C22.5498 132.231 11.2653 124.568 5.64229 120.717L0 116.885V194.486Z" fill="#596883" />
                                        <path d="M0 209.193H5.64229C11.2653 209.193 22.5498 209.193 33.7765 209.193C45.0224 209.193 56.2297 209.193 67.4756 209.193C78.7022 209.193 89.9868 209.193 101.213 209.193C112.459 209.193 123.667 209.193 134.913 209.193C146.139 209.193 157.424 209.193 168.65 209.193C179.896 209.193 191.104 209.193 202.35 209.193C213.576 209.193 224.861 209.193 236.087 209.193C247.333 209.193 258.541 209.193 269.787 209.193C281.013 209.193 292.298 209.193 303.524 209.193C314.77 209.193 325.978 209.193 337.224 209.193C348.45 209.193 359.735 209.193 365.358 209.193H371V192.164L365.358 190.751C359.735 189.319 348.45 186.494 337.224 184.752C325.978 183.01 314.77 182.352 303.524 183.417C292.298 184.481 281.013 187.268 269.787 187.577C258.541 187.906 247.333 185.778 236.087 184.036C224.861 182.294 213.576 180.94 202.35 181.288C191.104 181.656 179.896 183.707 168.65 183.707C157.424 183.707 146.139 181.656 134.913 183.03C123.667 184.423 112.459 189.261 101.213 191.68C89.9868 194.099 78.7022 194.099 67.4756 192.706C56.2297 191.332 45.0224 188.545 33.7765 188.545C22.5498 188.545 11.2653 191.332 5.64229 192.706L0 194.099V209.193Z" fill="#414C60" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_32_271">
                                            <rect width="371" height="209" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                {sortedPromises[0] && (
                                    <div className="text-canvas text-[1.4rem] absolute z-20 top-1/2 transform -translate-y-1/2">
                                        <Timer
                                            key={sortedPromises[0].id}
                                            promise={sortedPromises[0]}
                                            sortedPromises={sortedPromises}
                                            updateExpiredPromise={updateExpiredPromise}
                                            setIsExpired={setIsExpired}
                                            playExpiryAlarm={playExpiryAlarm}
                                            isSoundOn={isSoundOn}
                                        />
                                    </div>
                                )}


                            </div>
                            <div className="more-promises-section w-full h-[70%] flex justify-evenly gap-3">
                                <div className="w-[50%] h-full flex flex-col justify-around gap-2">
                                    <div className={`upcoming-promises w-full h-30 ${isDarkMode === "light" ? "bg-secondary" : "bg-primary"} rounded-md p-4`}>

                                        {!sortedPromises[1] && (
                                            <p className={`${isDarkMode === "light" ? "text-primary" : "text-secondary"} text-small`}>
                                                NO UPCOMING PROMISES
                                            </p>
                                        )}

                                        {/* Ensure the object exists first */}

                                        {sortedPromises[1] && sortedPromises.length > 0 && (

                                            <div>
                                                <p className={`${isDarkMode === "light" ? "text-primary" : "text-canvas"} text-small`}>
                                                    UPCOMING PROMISES
                                                </p>
                                                <hr className="border-primary mt-1"></hr>
                                                <p className="text-primary text-[0.8rem] mt-2">
                                                    {`${sortedPromises.length - 1} more today`}
                                                </p>

                                            </div>
                                        )}

                                    </div>
                                    <div className={`next-promises w-full h-18 ${isDarkMode === "light" ? "bg-extra" : "bg-primary"} rounded-md p-4`}>

                                        {sortedPromises[1] && (
                                            <p className={`${isDarkMode === "light" ? "text-primary" : "text-canvas"} text-small`}>
                                                {sortedPromises[1].title.length > 16 ? sortedPromises[1].title.slice(0, 16) + "..." : sortedPromises[1].title}
                                            </p>
                                        )}
                                    </div>
                                    <div className={`next-promises w-full h-18 ${isDarkMode === "light" ? "bg-extra" : "bg-primary"} rounded-md p-4`}>
                                        {sortedPromises[2] && (
                                            <p className={`${isDarkMode === "light" ? "text-primary" : "text-canvas"} text-small`}>
                                                {sortedPromises[2].title.length > 16 ? sortedPromises[2].title.slice(0, 16) + "..." : sortedPromises[2].title}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="buttons-section w-[50%] h-full flex flex-col gap-2 items-center justify-center">
                                    <button
                                        id="new-promise"
                                        className={`new-promise-btn ${isDarkMode === "light" ? "bg-primary" : "bg-dark-primary"}`}
                                        onClick={handleClick}
                                    >
                                        <svg 
                                            width="12" 
                                            height="12" 
                                            viewBox="0 0 22 22" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M1 11H11M11 11H21M11 11V21M11 11V1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        New Promise
                                    </button>
                                    <button
                                        onClick={handleViewAllPromises}
                                        className={`view-all-promises ${isDarkMode === "light" ? "text-primary" : "text-dark-primary"}`}
                                    >
                                        <svg 
                                            width="20" 
                                            height="17" 
                                            viewBox="0 0 20 17" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M8.87512 14.8462H19.0001M5.50012 12.5385L2.68762 16.0001L1.00012 14.8462M8.87512 9.07698H19.0001M5.50012 6.76929L2.68762 10.2308L1.00012 9.07698M8.87512 3.30775H19.0001M5.50012 1.00006L2.68762 4.4616L1.00012 3.30775" stroke="#414C60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        All promises
                                    </button>
                                    <div className={`w-full h-40 ${isDarkMode === "light" ? "bg-secondary" : "bg-primary"} rounded-md p-4`}>
                                        <p className={`${isDarkMode === "light" ? "text-primary" : "text-secondary"} text-small`}>
                                            Trends
                                        </p>
                                        <p className={`${isDarkMode === "light" ? "text-primary" : "text-secondary"} text-extra-small`}>
                                            (Feature coming soon)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Displays when new promise button clicked */}
                    {newPromiseStatus && (
                        <NewPromiseForm
                            handleClick={handleClick}
                            setUserData={setUserData}
                            isDarkMode={isDarkMode}
                            playPopSound={playPopSound}
                            isSoundOn={isSoundOn}
                            playRejectSound={playRejectSound}
                            playSuccessfulSubmit={playSuccessfulSubmit}
                        />
                    )}

                </div>
            )}


            <BottomNavbar isDarkMode={isDarkMode} />
        </div>
    )
}
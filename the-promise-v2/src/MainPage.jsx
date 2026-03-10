import { useEffect, useState, useMemo, useRef } from "react";
import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";
import { NewPromiseForm } from "./components/NewPromiseForm";
import { Timer } from "./components/Timer";
import { PromiseCard } from "./components/PromiseCard";
import { setItem } from "./utils/localStorage";
import "./MainPage.css";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { RatingsPage } from "./RatingsPage";
import { SettingsPage } from "./SettingsPage";
import { ButtonsGroupDesktop } from "./components/ButtonsGroupDesktop";
import { BackFromAllPromisesBtn } from "./components/BackFromAllPromisesBtn";
import { LatestPromiseTimerDesktop } from "./components/LatestPromiseTimerDesktop";
import { LatestPromiseSection } from "./components/LatestPromiseSection";
import { CardsContainerSecondSection } from "./components/CardsContainerSecondSection";


export function MainPage({ userData, setUserData, playPopSound, isSoundOn, playCompletedPromise, setFontType, setIsSoundOn, isDefaultFontSize, setIsDefaultFontSize }) {

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

    // For desktop only
    const [isRatingsView, setIsRatingsView] = useState(false);
    const [isSettingsView, setIsSettingsView] = useState(false);

    // Check for minimum screen size
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });

    // Ref for new promise form - used for GSAP
    const formRef = useRef(null);

    // Handle New Promise button
    const handleClick = () => {

        // No animation for mobile
        if (!isDesktopOrLaptop) {
            newPromiseStatus === false ? setNewPromiseStatus(true) : setNewPromiseStatus(false);
            playPopSound(isSoundOn ? 0.4 : 0);

        } else {

            // Animation for desktop
            if (newPromiseStatus) {

                gsap.to(formRef.current, {
                    x: 500,
                    duration: 0.3,
                    onComplete: () => setNewPromiseStatus(false)
                });
                playPopSound(isSoundOn ? 0.4 : 0);

            } else {
                setNewPromiseStatus(true);
                // Animation executed in useEffect because element doesn't exist yet in DOM.
                playPopSound(isSoundOn ? 0.4 : 0);
            }
        }


    }

    // Animation for desktop
    useEffect(() => {
        if (isDesktopOrLaptop && newPromiseStatus && formRef.current) {

            gsap.from(formRef.current, {
                x: 500,
                duration: 0.3
            });
        }

    }, [newPromiseStatus, isDesktopOrLaptop]);

    // Animation for view all promises desktop
    const allPromisesRef = useRef(null);

    const handleViewAllPromises = () => {

        if (!isDesktopOrLaptop) {
            allPromisesView === false ? setAllPromisesView(true) : setAllPromisesView(false);
            playPopSound(isSoundOn ? 0.4 : 0);

        } else {

            if (allPromisesView) {
                gsap.to(allPromisesRef.current, {
                    x: 500,
                    duration: 0.3,
                    onComplete: () => setAllPromisesView(false)
                });
                playPopSound(isSoundOn ? 0.4 : 0);

            } else {
                setAllPromisesView(true);
                playPopSound(isSoundOn ? 0.4 : 0);
            }
        }

    }

    useEffect(() => {
        if (isDesktopOrLaptop && allPromisesView && allPromisesRef.current) {

            gsap.from(allPromisesRef.current, {
                x: 500,
                duration: 0.3
            });
        }
    }, [allPromisesView, isDesktopOrLaptop]);

    const ratingsRef = useRef(null);

    const handleRatingsViewClick = () => {

        if (isRatingsView) {

            gsap.to(ratingsRef.current, {
                x: -700,
                duration: 0.3,
                onComplete: () => setIsRatingsView(false)
            });
            playPopSound(isSoundOn ? 0.4 : 0);

        } else {
            setIsRatingsView(true);
            playPopSound(isSoundOn ? 0.4 : 0);
        }

    }

    useEffect(() => {
        if (isDesktopOrLaptop && isRatingsView && ratingsRef.current) {
            gsap.from(ratingsRef.current, {
                x: -700,
                duration: 0.3
            });
        }
    }, [isRatingsView, isDesktopOrLaptop]);

    const settingsRef = useRef(null);

    const handleSettingsViewClick = () => {

        if (isSettingsView) {

            gsap.to(settingsRef.current, {
                x: -700,
                duration: 0.3,
                onComplete: () => setIsSettingsView(false)
            });
            playPopSound(isSoundOn ? 0.4 : 0);

        } else {
            setIsSettingsView(true);
            playPopSound(isSoundOn ? 0.4 : 0);
        }

    }

    useEffect(() => {
        if (isDesktopOrLaptop && isSettingsView && settingsRef.current) {
            gsap.from(settingsRef.current, {
                x: -700,
                duration: 0.3
            });
        }
    }, [isSettingsView, isDesktopOrLaptop]);



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


    return (
        <div className="mainpage-container w-full h-screen">

            {/* Top border for desktop view */}
            {isDesktopOrLaptop && (
                <TopBorder />
            )}

            <div className={`padding-container w-full h-full flex justify-center items-center relative ${isDesktopOrLaptop ? "p-20" : ""}`}>

                {/* Overlay to block entire page except for opened overlay window */}
                {((isDesktopOrLaptop && newPromiseStatus) || (isDesktopOrLaptop && allPromisesView) || (isDesktopOrLaptop && isRatingsView) || (isDesktopOrLaptop && isSettingsView)) && (
                    <div className="translucent-overlay w-full h-screen bg-gray-900/50 absolute z-25"></div>
                )}

                <div className={`content-container bg-canvas dark:bg-secondary relative pt-1 w-full ${isDesktopOrLaptop ? "h-full rounded-2xl flex flex-col items-center" : "h-screen"}`}>

                    {/* Top border for mobile/tablet view */}
                    {!isDesktopOrLaptop && (
                        <TopBorder />
                    )}

                    {isDesktopOrLaptop && (
                        <div className="w-full px-5">
                            <div className="desktop-nav-container w-full mt-3 h-21 relative flex justify-end">
                                <BottomNavbar isDesktopOrLaptop={isDesktopOrLaptop} handleRatingsViewClick={handleRatingsViewClick} handleSettingsViewClick={handleSettingsViewClick} />
                                <ButtonsGroupDesktop 
                                    handleClick={handleClick}
                                    handleViewAllPromises={handleViewAllPromises}
                                />
                            </div>
                        </div>
                    )}

                    {/* If all promises button clicked */}
                    {allPromisesView && (
                        <div
                            ref={allPromisesRef}
                            className={`all-promises-view pt-5 px-5 ${isDesktopOrLaptop ? "w-1/2 absolute bottom-0 right-0 z-50 mt-0 bg-secondary rounded-md h-120" : "w-full mt-15 h-152"}`}
                        >
                            <div className="all-promises-title">
                                <p className="text-primary text-large ml-4">All Promises</p>
                            </div>

                            {/* If there are promises to display */}
                            {sortedPromises.length > 0 && (
                                <div className={`all-promises w-full ${isDesktopOrLaptop ? "h-80" : "h-120"} gap-3 flex flex-col items-center overflow-y-auto mt-3`}>
                                    {sortedPromises.map(promise => (
                                        <PromiseCard
                                            key={promise.id}
                                            promise={promise}
                                            updateExpiredPromise={updateExpiredPromise}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* If no promises to display */}
                            {sortedPromises.length === 0 && (
                                <div className="mt-4 pl-4 w-full h-50">
                                    <p className="">Such emptiness...</p>
                                </div>
                            )}

                            <div className={`${isDesktopOrLaptop ? "pl-6" : ""}`}>
                                <BackFromAllPromisesBtn 
                                    handleViewAllPromises={handleViewAllPromises}
                                />
                            </div>
                        </div>
                    )}

                    {/* If default view or desktop view and all promises button is clicked */}
                    {((!allPromisesView) || (allPromisesView && isDesktopOrLaptop)) && (
                        <div className={`content w-full pt-1 px-5 ${isDesktopOrLaptop ? "mt-0 h-135" : "mt-15 h-152"}`}>

                            {isDesktopOrLaptop && (
                                <LatestPromiseTimerDesktop 
                                    sortedPromises={sortedPromises}
                                    updateExpiredPromise={updateExpiredPromise}
                                    setIsExpired={setIsExpired}
                                    isSoundOn={isSoundOn}
                                />
                            )}

                            <div className={`cards-container flex ${isDesktopOrLaptop ? "justify-evenly items-center gap-5 h-105" : "flex-col"}`}>
                                <LatestPromiseSection 
                                    isDesktopOrLaptop={isDesktopOrLaptop}
                                    isExpired={isExpired}
                                    sortedPromises={sortedPromises}
                                    completePromiseState={completePromiseState}
                                    handleCompletePromiseClick={handleCompletePromiseClick}
                                    isFadedIn={isFadedIn}
                                    handleConfirmPromise={handleConfirmPromise}
                                />

                                {((!isDesktopOrLaptop && !newPromiseStatus) || (isDesktopOrLaptop)) && (
                                    <CardsContainerSecondSection 
                                        isDesktopOrLaptop={isDesktopOrLaptop}
                                        sortedPromises={sortedPromises}
                                        updateExpiredPromise={updateExpiredPromise}
                                        setIsExpired={setIsExpired}
                                        isSoundOn={isSoundOn}
                                        handleClick={handleClick}
                                        handleViewAllPromises={handleViewAllPromises}
                                    />
                                )}
                            </div>

                            {(newPromiseStatus && !isDesktopOrLaptop) && (
                                <NewPromiseForm
                                    handleClick={handleClick}
                                    setUserData={setUserData}
                                    playPopSound={playPopSound}
                                    isSoundOn={isSoundOn}
                                    isDesktopOrLaptop={isDesktopOrLaptop}
                                />
                            )}
                        </div>
                    )}

                    {/* Bottom navbar displayed below for mobile/tablet view */}
                    {!isDesktopOrLaptop && (
                        <BottomNavbar />
                    )}

                    {/* New Promise button clicked in desktop view */}
                    {(isDesktopOrLaptop && newPromiseStatus) && (
                        <div className={`w-[50%] h-100 ${isDesktopOrLaptop ? "absolute z-50 bottom-0 right-0" : "relative"}`} ref={formRef}>
                            <NewPromiseForm
                                handleClick={handleClick}
                                setUserData={setUserData}
                                playPopSound={playPopSound}
                                isSoundOn={isSoundOn}
                                isDesktopOrLaptop={isDesktopOrLaptop}
                            />
                        </div>
                    )}

                    {/* Ratings button clicked in desktop view */}
                    {(isDesktopOrLaptop && isRatingsView) && (
                        <div
                            ref={ratingsRef}
                            className={`${isDesktopOrLaptop ? "w-1/2 absolute z-50 bottom-0 left-0" : "w-full"}`}
                        >
                            <RatingsPage
                                userData={userData}
                                isDesktopOrLaptop={isDesktopOrLaptop}
                                handleRatingsViewClick={handleRatingsViewClick}
                            />
                        </div>
                    )}

                    {/* Settings button clicked in desktop view */}
                    {(isDesktopOrLaptop && isSettingsView) && (
                        <div
                            ref={settingsRef}
                            className="w-1/2 absolute z-50 bottom-0 left-0"
                        >
                            <SettingsPage
                                userData={userData}
                                setUserData={setUserData}
                                setFontType={setFontType}
                                isSoundOn={isSoundOn}
                                setIsSoundOn={setIsSoundOn}
                                isDefaultFontSize={isDefaultFontSize}
                                setIsDefaultFontSize={setIsDefaultFontSize}
                                isDesktopOrLaptop={isDesktopOrLaptop}
                                handleSettingsViewClick={handleSettingsViewClick}
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
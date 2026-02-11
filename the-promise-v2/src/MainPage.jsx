import { useEffect, useState, useMemo } from "react";
import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";
import { NewPromiseForm } from "./components/NewPromiseForm";
import { Timer } from "./components/Timer";
import { PromiseCard } from "./components/PromiseCard";
import { setItem } from "./utils/localStorage";


export function MainPage({ userData, setUserData }) {


    // Sorts data on load and every time promises data changes
    const sortedPromises = useMemo(() => {
        return [...userData.promises].sort((a, b) => {
            const deadlineA = new Date(`${a.date}T${a.time}`);
            const deadlineB = new Date(`${b.date}T${b.time}`);
            return deadlineA.getTime() - deadlineB.getTime();
        });
    }, [userData.promises]);

    // For production only - to show updated user data
    useEffect(() => {
        console.log(`Current data: ${JSON.stringify(userData)}`);
    })

    useEffect(() => {
        setItem("userData", userData)
        console.log("Data updated")
    }, [userData]);

    // To track if new promise window is open
    const [newPromiseStatus, setNewPromiseStatus] = useState(false);

    // To track if complete promise window is open
    const [completePromiseState, setCompletePromiseState] = useState(false);

    // To track if all promises view window is open
    const [allPromisesView, setAllPromisesView] = useState(false);

    const handleClick = () => {
        newPromiseStatus === false ? setNewPromiseStatus(true) : setNewPromiseStatus(false);
    }

    const handleCompletePromiseClick = () => {
        completePromiseState === false ? setCompletePromiseState(true) : setCompletePromiseState(false);
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

        setCompletePromiseState(false);

    }

    const handleViewAllPromises = () => {
        allPromisesView === false ? setAllPromisesView(true) : setAllPromisesView(false);
    }

    return (
        <div className="w-full h-194 bg-canvas relative pt-1">

            {/* Overlay to block clicks outside of complete promise modal dialog box */}
            {completePromiseState && (
                <div className="w-full h-194 bg-[color:hsla(136,0%,0%,0.85)] absolute z-20"></div>
            )}
            <TopBorder />
            {/* Overlay if complete promise button clicked */}
            {completePromiseState && (
                <div className="w-[88%] h-26 bg-primary rounded-md absolute z-50 p-4 top-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <p className="text-[0.9rem]">Confirm complete promise?</p>
                    <button
                        onClick={() => handleConfirmPromise(sortedPromises[0].id)}
                        className="inline-block mr-3 bg-canvas border border-canvas py-1 px-3 rounded-md mt-2 hover:text-canvas hover:bg-accent cursor-pointer">Confirm</button>
                    <button
                        onClick={handleCompletePromiseClick}
                        className="inline-block border py-1 px-3 rounded-md hover:text-canvas cursor-pointer">Cancel</button>
                </div>
            )}

            {allPromisesView && (
                <div className="all-promies-view w-full h-152 pt-5 px-5 mt-15 bg-amber-300">
                    <div className="all-promises w-full h-120 border gap-3 flex flex-col items-center overflow-y-auto">
                        {sortedPromises.map(promise => (
                            <PromiseCard
                                key={promise.id}
                                promise={promise}
                                updateExpiredPromise={updateExpiredPromise}
                            />
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={handleViewAllPromises}
                            className="w-24 h-10 bg-primary text-[0.9rem] rounded-md mt-5 hover:opacity-80 hover:text-canvas active:scale-98 cursor-pointer">Back</button>
                    </div>
                </div>
            )}

            {/* If all promises view is not open */}
            {!allPromisesView && (
                <div className="content w-full h-152 pt-1 px-5 mt-15 bg-amber-300">

                    {/* New Promise is always on display in the Main Page */}
                    <div className="latest-promise-section w-full h-50 flex flex-col justify-around">
                        <div className="latest-promise w-full h-[90%] bg-secondary rounded-md p-5">

                            {sortedPromises[0] && (
                                <div className="flex flex-col justify-around gap-2 relative">
                                    <div className="text-container w-full h-25">
                                        <p className="latest-promise-text text-[1.2rem] text-canvas">
                                            {sortedPromises[0].title.length > 20 ? sortedPromises[0].title.slice(0, 20) + "..." : sortedPromises[0].title}
                                        </p>
                                        <p className="latest-promise-description text-[1rem] text-canvas mt-4">
                                            {sortedPromises[0].description.length > 60 ? sortedPromises[0].description.slice(0, 60) + "..." : sortedPromises[0].description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCompletePromiseClick}
                                        className="complete-btn border h-10 w-[60%] text-primary text-[0.9rem] hover:text-canvas rounded-md active:scale-98 cursor-pointer">
                                        Complete promise
                                    </button>


                                </div>
                            )}

                        </div>
                    </div>

                    {/* Displays by default and when cancel new promise button is clicked */}
                    {!newPromiseStatus && (
                        <div className="timer-more-promises w-full h-100 flex flex-col justify-around">
                            <div className="latest-promise-timer w-full h-[24%] bg-secondary rounded-md flex justify-center items-center">

                                {sortedPromises[0] && (
                                    <div className="text-canvas text-[1.4rem]">
                                        <Timer
                                            key={sortedPromises[0].id}
                                            promise={sortedPromises[0]}
                                            sortedPromises={sortedPromises}
                                            updateExpiredPromise={updateExpiredPromise}
                                        />
                                    </div>
                                )}

                            </div>
                            <div className="more-promises-section w-full h-[70%] flex justify-around">
                                <div className="w-[50%] h-full flex flex-col justify-around gap-2">
                                    <div className="upcoming-promises w-full h-30 bg-secondary rounded-md p-4">

                                        {!sortedPromises[1] && (
                                            <p className="text-white text-[0.9rem]">No upcoming promises</p>
                                        )}

                                        {/* Ensure the object exists first */}

                                        {sortedPromises[1] && (

                                            <div>
                                                <p className="text-canvas text-[1rem]">Upcoming</p>
                                                <hr className="border-canvas mt-1"></hr>
                                                <p className="text-canvas text-[0.8rem] mt-2">
                                                    {sortedPromises[1].title.length > 16 ? sortedPromises[1].title.slice(0, 16) + "..." : sortedPromises[1].title}
                                                </p>

                                            </div>
                                        )}

                                    </div>
                                    <div className="next-promises w-full h-18 bg-secondary rounded-md p-4">

                                        {sortedPromises[2] && (
                                            <p className="text-canvas text-[0.8rem]">
                                                {sortedPromises[2].title.length > 16 ? sortedPromises[2].title.slice(0, 16) + "..." : sortedPromises[2].title}
                                            </p>
                                        )}
                                    </div>
                                    <div className="next-promises w-full h-18 bg-secondary rounded-md p-4">
                                        {sortedPromises[3] && (
                                            <p className="text-canvas text-[0.8rem]">
                                                {sortedPromises[3].title.length > 16 ? sortedPromises[3].title.slice(0, 16) + "..." : sortedPromises[3].title}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="buttons-section w-[50%] h-full flex flex-col gap-2 items-center justify-center">
                                    <button
                                        id="new-promise"
                                        className="new-promise-btn w-35 h-14 bg-primary rounded-md hover:opacity-80 hover:text-canvas active:bg-green-950 cursor-pointer"
                                        onClick={handleClick}
                                    >New Promise</button>
                                    <button
                                        onClick={handleViewAllPromises}
                                        className="view-all-promises w-35 h-14 border rounded-md hover:opacity-60 active:scale-98 cursor-pointer">View all promises</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Displays when new promise button clicked */}
                    {newPromiseStatus && (
                        <NewPromiseForm
                            handleClick={handleClick}
                            setUserData={setUserData}
                        />
                    )}

                </div>
            )}


            <BottomNavbar />
        </div>
    )
}
import { useEffect, useState, useMemo } from "react";
import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";
import { NewPromiseForm } from "./components/NewPromiseForm";
import { Timer } from "./components/Timer";



export function MainPage() {

    // Initialise user data
    const [userData, setUserData] = useState(() => {

        const initialData = {

            promises: [
                {
                    id: 1,
                    title: "Cook Pizza",
                    description: "Finish cooking Napolitana Pizza",
                    date: "2026-02-09",
                    time: "12:33",
                    status: "active"
                },
                {
                    id: 2,
                    title: "Run like a bitch",
                    description: "Burn some calories",
                    date: "2026-02-09",
                    time: "13:00",
                    status: "active"
                },
                {
                    id: 3,
                    title: "Go fishing",
                    description: "Fish in the open ocean",
                    date: "2026-02-08",
                    time: "18:20",
                    status: "active"
                },
                {
                    id: 4,
                    title: "Start an adventure",
                    description: "Be a hobbit",
                    date: "2026-02-10",
                    time: "08:00",
                    status: "active"
                },
                {
                    id: 5,
                    title: "THIS IS AN EXPIRED PROMISE",
                    description: "I'm a retard",
                    date: "2026-02-07",
                    time: "09:00",
                    status: "active"
                }
            ],
            ratings: {
                userScore: "",
                promisesStatus: {
                    expiredPromises: [],
                    completedPromises: []
                }
            },
            settings: {
                theme: "light",
                font: "avenir"
            }
        }

        const now = new Date();
        const expired = [];
        const active = [];

        initialData.promises.forEach(promise => {
            const dateTime = new Date(`${promise.date}T${promise.time}`);
            const timeLeft = dateTime.getTime() - now.getTime();

            if (timeLeft <= 0) {
                expired.push({ ...promise, status: "expired" });
            } else {
                active.push(promise);
            }

        });

        active.sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);

            return dateTimeA.getTime() - dateTimeB.getTime();
        });

        expired.sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);

            return dateTimeA.getTime() - dateTimeB.getTime();
        });

        return {
            ...initialData,
            promises: active,
            ratings: {
                ...initialData.ratings,
                promisesStatus: {
                    ...initialData.ratings.promisesStatus,
                    expiredPromises: expired
                }
            }
        }

    });

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



    // To track if new promise window is open
    const [newPromiseStatus, setNewPromiseStatus] = useState(false);

    const handleClick = () => {
        newPromiseStatus === false ? setNewPromiseStatus(true) : setNewPromiseStatus(false);
    }


    const updateExpiredPromise = (id) => {

        const expiredPromise = userData.promises.find(promise => promise.id === id);

        setUserData(prev => ({
            ...prev,
            promises: [...prev.promises.filter(p => p !== expiredPromise)],
            ratings: {
                ...prev.ratings,
                promisesStatus: {
                    ...prev.ratings.promisesStatus,
                    expiredPromises: [...prev.ratings.promisesStatus.expiredPromises, { expiredPromise, status: "expired" }]
                }
            }
        }));

    }


    return (
        <div className="w-full h-194 bg-canvas relative">
            <TopBorder />
            <div className="content w-full py-4 px-5">

                {/* New Promise is always on display in the Main Page */}
                <div className="latest-promise-section w-full h-50 flex flex-col justify-around">
                    <div className="latest-promise w-full h-[90%] bg-secondary rounded-md p-5">

                        {sortedPromises[0] && (
                            <div>
                                <p className="latest-promise-text text-[1.2rem] text-canvas">
                                    {sortedPromises[0].title.length > 16 ? sortedPromises[0].title.slice(0,16) + "...": sortedPromises[0].title}
                                </p>
                                <p className="latest-promise-description text-[1rem] text-canvas mt-4">
                                    {sortedPromises[0].description.length > 60 ? sortedPromises[0].description.slice(0,60) + "..." : sortedPromises[0].description}
                                </p>
                            </div>
                        )}

                    </div>
                </div>

                {/* Displays by default and when cancel new promise button is clicked */}
                {!newPromiseStatus && (
                    <div className="timer-more-promises w-full h-100 flex flex-col justify-around">
                        <div className="latest-promise-timer w-full h-[24%] bg-secondary rounded-md flex justify-center items-center">

                            {sortedPromises[0] && (
                                <Timer
                                    key={sortedPromises[0].id}
                                    promise={sortedPromises[0]}
                                    sortedPromises={sortedPromises}
                                    updateExpiredPromise={updateExpiredPromise}
                                />
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
                                <button className="new-promise-btn w-35 h-14 bg-primary rounded-md hover:opacity-80 hover:text-canvas active:bg-green-950 cursor-pointer"
                                    onClick={handleClick}
                                >New Promise</button>
                                <button className="view-all-promises w-35 h-14 border rounded-md">View all promises</button>
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


            <BottomNavbar />
        </div>
    )
}
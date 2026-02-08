import { useState } from "react";
import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";



export function MainPage() {

    const [newPromiseStatus, setNewPromiseStatus] = useState(false);

    const handleClick = () => {
        newPromiseStatus === false ? setNewPromiseStatus(true) : setNewPromiseStatus(false);
    }

    return (
        <div className="w-full h-194 bg-canvas relative">
            <TopBorder />
            <div className="content w-full py-4 px-5">

                {/* New Promise is always on display in the Main Page */}
                <div className="latest-promise-section w-full h-50 flex flex-col justify-around">
                    <div className="latest-promise w-full h-[90%] bg-secondary rounded-md">

                    </div>
                </div>

                {/* Displays by default and when cancel new promise button is clicked */}
                {!newPromiseStatus && (
                    <div className="timer-more-promises w-full h-100 flex flex-col justify-around">
                        <div className="latest-promise-timer w-full h-[24%] bg-secondary rounded-md">

                        </div>
                        <div className="more-promises-section w-full h-[70%] flex justify-around">
                            <div className="w-[50%] h-full flex flex-col justify-around gap-2">
                                <div className="upcoming-promises w-full h-30 bg-secondary rounded-md"></div>
                                <div className="next-promises w-full h-18 bg-secondary rounded-md"></div>
                                <div className="next-promises w-full h-18 bg-secondary rounded-md"></div>
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
                    <div className="new-promise-section w-full h-100 bg-secondary rounded-md p-4 relative">
                        <div className="text-inputs-section w-full h-[45%] flex flex-col justify-center">
                            <form id="new-promise-form">
                                <section>
                                    <label htmlFor="title" className="block">Title</label>
                                    <input type="text" id="title" className="promise-title w-[90%] h-8 bg-canvas rounded-md mt-2 p-1" />
                                </section>
                                <section className="mt-4">
                                    <label htmlFor="description" className="block">Description</label>
                                    <input type="text" id="description" className="promise-decscription w-[90%] h-8 bg-canvas rounded-md mt-2 p-1" />
                                </section>
                            </form>
                        </div>
                        <div className="deadline-buttons-section w-full h-[45%] flex flex-col justify-evenly">
                            <section>
                                <label htmlFor="date">Date</label>
                                <input type="date" id="date" />
                            </section>
                            <section>
                                <label htmlFor="time">Time</label>
                                <input type="time" id="time" />
                            </section>
                            <section>
                                <p>Deadline:</p>
                                <p>Example date here</p>
                            </section>
                        </div>
                        <div className="new-promise-btns flex flex-col gap-1 absolute bottom-10 right-3">
                            <button className="w-26 h-14 bg-primary rounded-md text-[0.9rem]">Add Promise</button>
                            <button
                                onClick={handleClick} 
                                className="w-26 h-14 border rounded-md text-[0.9rem hover:opacity-80 hover:text-canvas active:bg-gray-500 cursor-pointer">Cancel</button>
                        </div>
                    </div>
                )}

            </div>


            <BottomNavbar />
        </div>
    )
}
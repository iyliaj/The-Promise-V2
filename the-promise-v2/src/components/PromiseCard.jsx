import { useState } from "react"
import { Timer } from "./Timer";
import "./PromiseCard.css";

export function PromiseCard({ promise, updateExpiredPromise }) {

    // To track whether promise card is expanded or not
    const [promiseExpand, setPromiseExpand] = useState("loaded");
    // To track whether timer is shown or not
    const [timerShow, setTimerShow] = useState(false);
    // To manage rendering of timer
    const [renderStatus, setRenderStatus] = useState("inactive");
    // To manage showing short or full display of text
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {

        if (promiseExpand === "collapse" || promiseExpand === "loaded") {

            setPromiseExpand("expand");

            setIsExpanded(true);

            setTimeout(() => {
                // To "open gate" for Timer div to render
                setRenderStatus("active");

                setTimerShow(true);

            }, 300);

        } else if (promiseExpand === "expand") {

            setTimerShow(false);

            setTimeout(() => {
                setIsExpanded(false);
                setPromiseExpand("collapse")
                setRenderStatus("inactive")
            }, 300);
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`promise-card w-[90%] bg-secondary rounded-md p-4 ${promiseExpand === "expand" && "promise-card-expand"} ${promiseExpand === "collapse" && "promise-card-collapse"}`}
        >
            {isExpanded && (
                <div>
                    <p className="text-canvas text-[1.1rem]">{promise.title}</p>
                    <p className="text-[0.9rem] inline-block w-[94%] wrap-break-word">{promise.description}</p>
                </div>
            )}

            {!isExpanded && (
                <div>
                    <p className="text-canvas text-[1.1rem]">{promise.title.length > 20 ? promise.title.slice(0, 20) + "..." : promise.title}</p>
                    <p className="text-[0.9rem]">{promise.description.length > 30 ? promise.description.slice(0, 30) + "..." : promise.description}</p>
                </div>
            )}


            {renderStatus === "active" && (
                <div className={`promise-card-timer ${timerShow && "timer-show"} ${!timerShow && "timer-hide"}`}>
                    <p className="text-canvas text-[0.9rem] mt-2">Expiring in:</p>
                    <div className="text-canvas text-[0.9rem]">
                        <Timer
                            updateExpiredPromise={updateExpiredPromise}
                            promise={promise}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
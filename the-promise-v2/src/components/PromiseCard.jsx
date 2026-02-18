import { useState, useRef, useEffect } from "react"
import { Timer } from "./Timer";
import "./PromiseCard.css";

export function PromiseCard({ promise, updateExpiredPromise, isDarkMode }) {

    // To track whether promise card is expanded or not
    const [promiseExpand, setPromiseExpand] = useState("loaded");
    // To track whether timer is shown or not
    const [timerShow, setTimerShow] = useState(false);
    // To manage rendering of timer
    const [renderStatus, setRenderStatus] = useState("inactive");
    // To manage showing short or full display of text
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Refs for measuring content heights
    const cardRef = useRef(null);

    // Calculate and set dynamic heights
    useEffect(() => {
        if (cardRef.current) {
            // Get the actual content heights by temporarily setting different states
            const measureHeights = () => {
                const cardElement = cardRef.current;
                // Access final css settings of window element
                const style = window.getComputedStyle(cardElement);
                // Get total y axis padding
                const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
                
                // Create a temporary element to measure collapsed content
                const tempDiv = document.createElement('div');
                tempDiv.style.position = 'absolute';
                tempDiv.style.visibility = 'hidden';
                tempDiv.style.width = cardElement.offsetWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) + 'px';
                tempDiv.innerHTML = `
                    <p class="text-canvas text-[1.1rem]">${promise.title.length > 20 ? promise.title.slice(0, 20) + "..." : promise.title}</p>
                    <p class="text-[0.9rem]">${promise.description.length > 30 ? promise.description.slice(0, 30) + "..." : promise.description}</p>
                `;
                document.body.appendChild(tempDiv);
                const collapsedHeight = tempDiv.offsetHeight + padding;
                document.body.removeChild(tempDiv);
                
                // Create another temporary element to measure expanded content
                const tempDiv2 = document.createElement('div');
                tempDiv2.style.position = 'absolute';
                tempDiv2.style.visibility = 'hidden';
                tempDiv2.style.width = cardElement.offsetWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) + 'px';
                tempDiv2.innerHTML = `
                    <p class="text-canvas text-[1.1rem]">${promise.title}</p>
                    <p class="text-[0.9rem] inline-block w-[94%] wrap-break-word">${promise.description}</p>
                    <div>
                        <p class="text-canvas text-[0.9rem] mt-2">Expiring in:</p>
                        <div class="text-canvas text-[0.9rem]">00:00:00</div>
                    </div>
                `;
                document.body.appendChild(tempDiv2);
                const expandedHeight = tempDiv2.offsetHeight + padding;
                document.body.removeChild(tempDiv2);
                
                // Set CSS custom properties for dynamic heights
                cardElement.style.setProperty('--collapsed-height', `${collapsedHeight}px`);
                cardElement.style.setProperty('--expanded-height', `${expandedHeight}px`);
            };
            
            // Delay measurement to ensure styles are loaded
            setTimeout(measureHeights, 100);
        }
    }, [promise.title, promise.description]);

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
            ref={cardRef}
            onClick={handleClick}
            className={
                `promise-card 
                ${isDarkMode === "light" ? 
                    "bg-secondary" : 
                    "bg-dark-primary"} 
                ${promiseExpand === "expand" && 
                    "promise-card-expand"} 
                    ${promiseExpand === "collapse" && 
                        "promise-card-collapse"}
            `}
        >
            {isExpanded && (
                <div>
                    <p className="text-canvas text-medium">{promise.title}</p>
                    <p className={`text-small ${isDarkMode === "light" ? "text-primary" : "text-secondary"} inline-block w-[94%] wrap-break-word`}>{promise.description}</p>
                </div>
            )}

            {!isExpanded && (
                <div>
                    <p className="text-canvas text-medium">
                        {promise.title.length > 20 ? promise.title.slice(0, 20) + "..." : promise.title}
                    </p>
                    <p className={`text-small ${isDarkMode === "light" ? "text-primary" : "text-secondary"}`}>
                        {promise.description.length > 30 ? promise.description.slice(0, 30) + "..." : promise.description}
                    </p>
                </div>
            )}


            {renderStatus === "active" && (
                <div className={`promise-card-timer ${timerShow && "timer-show"} ${!timerShow && "timer-hide"}`}>
                    <p className="text-canvas text-small mt-2">Expiring in:</p>
                    <div className="text-canvas text-large">
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
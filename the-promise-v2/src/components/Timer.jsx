import { useRef,useState, useEffect } from "react";


export function Timer({ updateExpiredPromise, promise }) {

    const hasExpiredRef = useRef(false);

    // Update data when promise expires
    const getTimeLeft = (promise) => {
        const deadline = new Date(`${promise.date}T${promise.time}`);
        const now = new Date();
        const timeLeft = deadline.getTime() - now.getTime();
        return timeLeft;
    };

    // Initialise with current promise time
    const [currentTime, setCurrentTime] = useState(() => getTimeLeft(promise));

    useEffect(() => {

        const interval = setInterval(() => {
            const fetchedTime = getTimeLeft(promise)
            setCurrentTime(fetchedTime);
        }, 1000);

        // Cleanup
        return () => clearInterval(interval);
    });

    // Handle Timer Expiration
    useEffect(() => {

        if (currentTime <= 0 && !hasExpiredRef.current) {
            hasExpiredRef.current = true;
            updateExpiredPromise(promise.id);
        }
    }, [currentTime, updateExpiredPromise, promise.id]);

    // For displaying time left
    let timeDisplay;

    const timeSeconds = currentTime / 1000;
    const timeMinutes = timeSeconds / 60;
    const timeHours = timeMinutes / 60;
    const timeDays = timeHours / 24;

    if (timeDays >= 1) {
        timeDisplay = `${Math.floor(timeDays)} Days ${Math.floor(timeHours % 24)} Hours`;
    } else if (timeHours >= 1) {
        timeDisplay = `${Math.floor(timeHours)} Hours ${Math.floor(timeMinutes % 60)} Minutes`;
    } else if (timeMinutes >= 1) {
        timeDisplay = `${Math.floor(timeMinutes)} Minutes ${Math.floor(timeSeconds % 60)} Seconds`;
    } else {
        timeDisplay = `${Math.floor(timeSeconds)} Seconds`;

        if (timeDisplay <= 0) {
            timeDisplay = "Promise Expired!";
        }
    }

    const timeLeft = timeDisplay;



    return (
        <p className="">{timeLeft}</p>
    )
}
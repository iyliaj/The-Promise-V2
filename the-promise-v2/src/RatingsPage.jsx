import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";



export function RatingsPage({ userData, isDarkMode }) {

    // Should be processed in a backend in the future
    const completedPromises = [...userData.ratings.promisesStatus.completedPromises].length;
    const expiredPromises = [...userData.ratings.promisesStatus.expiredPromises].length;

    const balancedScore = completedPromises - expiredPromises;

    const score = balancedScore * 100;

    let rating;
    let ratingInfo;

    if (balancedScore === 0) {
        rating = "Inconsistent";
        ratingInfo = "Your life is a gamble because you're not able to live up to your own words.";
    } else if (balancedScore < 0) {
        rating = "Hopeless";
        ratingInfo = "If you can't keep promises to yourself, don't make any to others.";
    } else if (balancedScore > 0) {
        rating = "Trustworthy";
        ratingInfo = "Keep it up champ!";
    } else {
        rating = "Error";
        ratingInfo = "Error";
    }

    return (
        <div className="ratings-page-container">
            <TopBorder />
            <div className={`ratings-content-container mt-14 px-10 w-full h-157 flex flex-col justify-evenly items-center ${isDarkMode === "light" ? "bg-canvas" : "bg-secondary"}`}>
                <div className="top-section w-40 h-20 flex justify-evenly items-center">
                    <div className="flex justify-center items-center">
                        <svg width="56" height="62" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.5459 50.3965C31.3378 47.7256 45 39.4755 45 21.0738V9.95653C45 6.82455 45 5.25623 44.4011 4.0588C43.8738 3.00448 43.0302 2.14792 41.9953 1.61072C40.8188 1 39.2808 1 36.2005 1H9.80054C6.72025 1 5.17896 1 4.00244 1.61072C2.96755 2.14792 2.12677 3.00448 1.59946 4.0588C1 5.2574 1 6.82763 1 9.96573V21.0737C1 39.4755 14.6614 47.7256 20.4534 50.3965C21.0674 50.6796 21.3759 50.821 22.0709 50.9425C22.5092 51.0192 23.4935 51.0192 23.9319 50.9425C24.6245 50.8214 24.9298 50.6806 25.5396 50.3994L25.5459 50.3965Z" stroke="#AEAEAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </div>
                    <div className="score-section flex flex-col justify-center items-center">
                        <p className={`score text-medium ${isDarkMode === "light" ? "text-primary" : "text-dark-primary"} ml-2`}>Score</p>
                        <p className={`rating-score text-extra-large ${isDarkMode === "light" ? "text-primary" : "text-dark-primary"}`}>{score}</p>
                    </div>
                </div>

                <div className="rating-text-section flex flex-col justify-center items-center">
                    <p className={`text-large ${isDarkMode === "light" ? "text-primary" : "text-dark-primary"}`}>{rating}</p>
                    <p className={`text-medium ${isDarkMode === "light" ? "text-primary" : "text-dark-primary"} mt-4`}>{ratingInfo}</p>
                </div>

                <div className={`w-full h-40 ${isDarkMode === "light" ? "bg-secondary" : "bg-extra"} rounded-md p-4`}>
                    <p className={`${isDarkMode === "light" ? "text-primary" : "text-dark-primary"} text-medium`}>Your trends</p>
                    <p className="text-primary text-small">(Coming Soon)</p>
                </div>

                <div className={`w-full h-40 ${isDarkMode === "light" ? "bg-primary" : "bg-dark-primary"} rounded-md p-4`}>
                    <p className="text-canvas text-medium">Suggestions</p>
                    <p className="text-canvas text-small">(Coming Soon)</p>
                </div>
            </div>
            <BottomNavbar />
        </div>
    )
}
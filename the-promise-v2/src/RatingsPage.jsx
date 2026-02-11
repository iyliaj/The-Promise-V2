import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";



export function RatingsPage() {
    return (
        <div className="raings-page-container">
            <TopBorder />
            <div className="ratings-content-container mt-20 px-10 w-full h-140 flex flex-col justify-evenly items-center bg-amber-300">
                <div className="score-section flex flex-col justify-center items-center">
                    <p className="score text-[1.6rem] text-accent">Score</p>
                    <p className="rating-scaore text-[1.8rem] text-accent">2500</p>
                </div>
                <div className="border rounded-4xl w-50 h-50"></div>
                <div className="rating-text-section flex flex-col justify-center items-center">
                    <p className="text-[1.2rem] text-accent">Trusworthy</p>
                <p className="text-[1rem] text-accent mt-4">You take and make commitments seriously. You're...</p>
                </div>
            </div>
            <BottomNavbar />
        </div>
    )
}
import { useState } from "react";
import { BottomNavbar } from "./components/BottomNavbar";
import { TopBorder } from "./components/TopBorder";




export function SettingsPage({ userData, setUserData, fontType, setFontType, isDarkMode, setIsDarkMode }) {

    // Available fonts 
    // font: values are css classes defined in index.css
    // text: values used to display and cross-check with saved font
    const fontList = [
        { id: 1, font: "inter-400", text: "Inter" },
        { id: 2, font: "roboto-200", text: "Roboto" },
        { id: 3, font: "lato-regular", text: "Lato" }
    ];

    // To manage visibility of left arrow for font change
    const [leftIsVisible, setLeftIsVisible] = useState(() => {

        const savedFont = userData.settings.font;
        const selectedFont = fontList.find(font => font.text === savedFont);

        if (selectedFont.id === 1) {
            console.log(`Id 1 detected`);
            return false;
        }

        return true;
    });

    // To manage visibility of right arrow for font change
    const [rightIsVisible, setRightIsVisible] = useState(() => {

        const savedFont = userData.settings.font;
        const selectedFont = fontList.find(font => font.text === savedFont);

        if (selectedFont.id === fontList.length) {
            console.log(`Last font option detected`);
            return false;
        }

        return true;
    });    

    // Handle click for dark/ light mode
    const handleClick = (e) => {
        const clickedMode = e.currentTarget.id;

        // Determine the new theme based on button clicked
        const newTheme = clickedMode === "light-mode" ? "light" : "dark";

        // If already in the selected mode, do nothing
        if ((newTheme === "light" && isDarkMode === "light") ||
            (newTheme === "dark" && isDarkMode === "dark")) {
            console.log('Already in', newTheme, 'mode, returning early');
            return;
        }

        console.log('Switching to', newTheme, 'mode');

        // Update local state
        setIsDarkMode(newTheme);

        // Update userData
        setUserData(prev => {
            console.log('Previous userData:', prev);
            const newData = {
                ...prev,
                settings: {
                    ...prev.settings,
                    theme: newTheme
                }
            };
            console.log('New userData:', newData);
            return newData;
        });
    }

    console.log(`Loaded font: ${fontType}`);

    // Manage what happens when font left arrow is clicked
    const handleLeftClick = () => {

        console.log(`Current font: ${fontType}`);
        // Find current font in fontList
        const currentFont = fontList.find(font => font.text === fontType);
        const currentFontId = currentFont.id;

        const nextFontId = currentFontId - 1;

        // If next font is first font in the list,
        if (nextFontId === 1) {
            console.log(`Id 1 detected`);
            // Set visibility of left arrow to false
            setLeftIsVisible(false);

        }

        // Set rigth arrow visible to true
        // This is relevant for when right arrow previously disappeared and needs to be visible again.
        setRightIsVisible(true);

        // If id of font is less than 1, do nothing
        if (nextFontId < 1) {
            return;
        }

        // Find and set the next font after clicking
        const nextFont = fontList.find(font => font.id === nextFontId);
        console.log(`Next font to save: ${nextFont.text}`);
        setFontType(nextFont.text);

        // Save the next font into localStorage (fontType data from localStorage accessed in App.jsx)
        setTimeout(() => {
            console.log(`Saving new font data: ${nextFont.text}`);
            setUserData(prev => ({
                ...prev,
                settings: {
                    ...prev.settings,
                    font: nextFont.text
                }
            }));
        }, 300);
    }

    // Manage what happens when font right arrow is clicked
    const handleRightClick = () => {

        console.log(`Current font: ${fontType}`);
        // Find current font in fontList
        const currentFont = fontList.find(font => font.text === fontType);
        const currentFontId = currentFont.id;

        const nextFontId = currentFontId + 1;

        if (nextFontId === fontList.length) {
            setRightIsVisible(false);

        }

        setLeftIsVisible(true);

        if (nextFontId > fontList.length) {
            return;
        }

        const nextFont = fontList.find(font => font.id === nextFontId);
        console.log(`Next font to save: ${nextFont.text}`);
        setFontType(nextFont.text);


        setTimeout(() => {
            console.log(`Saving new font data: ${nextFont.text}`);
            setUserData(prev => ({
                ...prev,
                settings: {
                    ...prev.settings,
                    font: nextFont.text
                }
            }));
        }, 300);
    }


    return (
        <div className="settings-page">
            <TopBorder />
            <div className={`${isDarkMode === "dark" ? "bg-primary" : "bg-canvas"} settings-page-container mt-14 h-157 p-5`}>
                <div className="settings-container w-full h-130 bg-secondary mt-6 rounded-md overflow-hidden relative">
                    <svg width="342" height="830" viewBox="0 40 366 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_38_46)">
                            <path d="M0 61.2837L5.20125 67.4443C10.3847 73.5868 20.7872 85.9078 31.1362 91.7261C41.5031 97.5444 51.8344 96.8959 62.2013 91.0596C72.5503 85.2413 82.9528 74.2533 93.3019 68.435C103.669 62.5987 114 61.9502 124.367 63.8596C134.716 65.787 145.118 70.2903 155.467 74.1632C165.834 78.036 176.166 81.2784 186.532 79.0268C196.882 76.7751 207.284 69.0294 217.633 70.3444C228 71.6774 238.331 82.053 248.698 85.6376C259.047 89.2043 269.45 85.9619 279.799 81.4045C290.166 76.8292 300.497 70.9568 310.864 74.1992C321.213 77.4416 331.615 89.7987 336.799 95.9953L342 102.174V78.3963L336.799 70.9568C331.615 63.4994 321.213 48.6204 310.864 46.657C300.497 44.7115 290.166 55.6996 279.799 60.5632C269.45 65.4268 259.047 64.1658 248.698 59.3023C238.331 54.4387 228 45.9725 217.633 44.6575C207.284 43.3245 196.882 49.1608 186.532 51.1062C176.166 53.0517 165.834 51.1423 155.467 48.5484C145.118 45.9725 134.716 42.7301 124.367 39.1635C114 35.5788 103.669 31.688 93.3019 34.5881C82.9528 37.5062 72.5503 47.2334 62.2013 52.7635C51.8344 58.2755 41.5031 59.6085 31.1362 56.3661C20.7872 53.1237 10.3847 45.306 5.20125 41.4151L0 37.5062V61.2837Z" fill="#94A5C4" />
                            <path d="M0 99.6261L5.20125 103.178C10.3847 106.747 20.7872 113.85 31.1362 120.307C41.5031 126.764 51.8344 132.575 62.2013 128.683C72.5503 124.791 82.9528 111.231 93.3019 104.774C103.669 98.3168 114 98.9625 124.367 100.254C134.716 101.545 145.118 103.447 155.467 106.029C165.834 108.594 176.166 111.823 186.532 110.209C196.882 108.594 207.284 102.137 217.633 103.429C228 104.702 238.331 113.742 248.698 117.957C259.047 122.172 269.45 121.562 279.799 118.998C290.166 116.433 300.497 111.877 310.864 112.505C321.213 113.132 331.615 118.944 336.799 121.832L342 124.737V101.24L336.799 95.0882C331.615 88.918 321.213 76.6136 310.864 73.385C300.497 70.1564 290.166 76.0037 279.799 80.5596C269.45 85.0976 259.047 88.3261 248.698 84.7747C238.331 81.2053 228 70.8739 217.633 69.5466C207.284 68.2372 196.882 75.9499 186.532 78.192C176.166 80.4341 165.834 77.2055 155.467 73.3491C145.118 69.4928 134.716 65.0087 124.367 63.0895C114 61.1882 103.669 61.8339 93.3019 67.6453C82.9528 73.4388 72.5503 84.3801 62.2013 90.1736C51.8344 95.985 41.5031 96.6307 31.1362 90.8372C20.7872 85.0437 10.3847 72.7752 5.20125 66.6588L0 60.5245V99.6261Z" fill="#7283A2" />
                            <path d="M0 171.589L5.20125 170.288C10.3847 169.005 20.7872 166.403 31.1362 166.403C41.5031 166.403 51.8344 169.005 62.2013 170.288C72.5503 171.589 82.9528 171.589 93.3019 169.33C103.669 167.071 114 162.554 124.367 161.252C134.716 159.969 145.118 161.885 155.467 161.885C165.834 161.885 176.166 159.969 186.532 159.626C196.882 159.301 207.284 160.566 217.633 162.192C228 163.819 238.331 165.806 248.698 165.499C259.047 165.21 269.45 162.608 279.799 161.614C290.166 160.62 300.497 161.234 310.864 162.861C321.213 164.487 331.615 167.126 336.799 168.463L342 169.782V124.423L336.799 121.496C331.615 118.586 321.213 112.731 310.864 112.099C300.497 111.466 290.166 116.056 279.799 118.64C269.45 121.225 259.047 121.839 248.698 117.592C238.331 113.346 228 104.238 217.633 102.955C207.284 101.653 196.882 108.159 186.532 109.785C176.166 111.412 165.834 108.159 155.467 105.575C145.118 102.973 134.716 101.057 124.367 99.7559C114 98.4548 103.669 97.8043 93.3019 104.31C82.9528 110.816 72.5503 124.477 62.2013 128.399C51.8344 132.32 41.5031 126.465 31.1362 119.96C20.7872 113.454 10.3847 106.298 5.20125 102.702L0 99.1235V171.589Z" fill="#596883" />
                        </g>
                        <defs>
                            <clipPath id="clip0_38_46">
                                <path d="M0 0H342V148C342 153.523 337.523 158 332 158H10C4.47716 158 0 153.523 0 148V0Z" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div className="w-full h-100 absolute z-10 top-0 left-0 flex flex-col justify-evenly items-center">
                        <div className="interface-theme-selector w-55 h-13 flex justify-between items-center border">
                            <p className="block text-primary">Interface</p>
                            <div className="w-25 h-9 bg-canvas rounded-md flex justify-evenly items-center">
                                <button
                                    id="light-mode"
                                    onClick={handleClick}
                                    className={`${isDarkMode === "light" ? "text-canvas bg-primary" : "text-primary bg-canvas"} text-[0.8rem] p-1 rounded-md cursor-pointer`}
                                >
                                    Light
                                </button>
                                <button
                                    id="dark-mode"
                                    onClick={handleClick}
                                    className={`${isDarkMode === "dark" ? "text-canvas bg-primary" : "text-primary bg-canvas"} text-[0.8rem] p-1 rounded-md cursor-pointer`}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>
                        <div className="font-selector w-55 h-13 flex justify-between items-center  border">
                            <p className="block text-primary text-1rem">Font</p>
                            <div className="w-25 h-9 bg-canvas rounded-md flex justify-evenly items-center">
                                <svg
                                    onClick={handleLeftClick}
                                    className={`left-button active:scale-90 ${!leftIsVisible && "opacity-0"}`}
                                    width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.613169 9.5704C-0.204497 8.7836 -0.204498 7.47489 0.613168 6.68809L6.97873 0.562828C8.24933 -0.659815 10.3655 0.240659 10.3655 2.00398L10.3655 14.2545C10.3655 16.0178 8.24934 16.9183 6.97873 15.6957L0.613169 9.5704Z" fill="#414C60" />
                                </svg>
                                <p className="text-primary text-[0.9rem]">{fontType}</p>
                                <svg
                                    onClick={handleRightClick}
                                    className={`right-button active:scale-90 ${!rightIsVisible && "opacity-0"}`}
                                    width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.75231 9.5704C10.57 8.7836 10.57 7.47489 9.75231 6.68809L3.38675 0.562828C2.11614 -0.659814 6.24611e-08 0.24066 1.39538e-07 2.00398L6.75026e-07 14.2545C7.52103e-07 16.0178 2.11614 16.9183 3.38675 15.6957L9.75231 9.5704Z" fill="#414C60" />
                                </svg>

                            </div>
                        </div>
                        <div className="text-size-selector w-55 flex justify-between items-center  h-13 border">
                            <p className="block text-primary text-1rem">Text size</p>
                            <div className="w-25 h-9 bg-canvas rounded-md">

                            </div>
                        </div>
                        <div className="sound-selector w-55 flex justify-between items-center  h-13 border">
                            <p className="block text-primary text-1rem">Sound</p>
                            <div className="w-25 h-9 bg-canvas rounded-md">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavbar />
        </div>
    )
}
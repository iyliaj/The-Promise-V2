


export function SoundSelector({ handleSoundClick, isSoundOn }) {
    return (
        <div className="sound-selector w-55 flex justify-between items-center  h-13">
            <p className="block text-primary text-medium">Sound</p>
            <div className="w-25 h-9 bg-canvas rounded-md flex justify-evenly items-center">
                <button
                    id="sound-on"
                    onClick={handleSoundClick}
                    className={`${isSoundOn ? "text-canvas bg-primary" : "text-primary"} w-11 h-7 text-xs rounded-md`}>
                    ON
                </button>
                <button
                    id="sound-off"
                    onClick={handleSoundClick}
                    className={`${!isSoundOn ? "text-canvas bg-primary" : "text-primary"} w-11 h-7 text-xs rounded-md`}>
                    OFF
                </button>
            </div>
        </div>
    )
}
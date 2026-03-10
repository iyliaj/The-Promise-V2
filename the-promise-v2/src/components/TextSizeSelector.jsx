


export function TextSizeSelector({ handleTextSizeClick, isDefaultFontSize }) {
    return (
        <div className="text-size-selector w-55 flex justify-between items-center  h-13">
            <p className="block text-primary text-medium">Text size</p>
            <div className="w-25 h-9 bg-canvas rounded-md flex justify-evenly items-center">
                <button
                    id="default-size"
                    onClick={handleTextSizeClick}
                    className={`${isDefaultFontSize ? "text-canvas bg-primary" : "text-primary"} w-11 h-7 text-xs rounded-md`}
                >
                    Default
                </button>
                <button
                    id="larger-size"
                    onClick={handleTextSizeClick}
                    className={`${!isDefaultFontSize ? "text-canvas bg-primary" : "text-primary"} w-11 h-7 text-xs rounded-md`}
                >
                    Larger
                </button>
            </div>
        </div>
    )
}
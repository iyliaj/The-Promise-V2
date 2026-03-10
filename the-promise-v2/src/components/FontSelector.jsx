


export function FontSelector({ handleLeftClick, handleRightClick, fontType, leftIsVisible, rightIsVisible }) {
    return (
        <div className="font-selector w-55 h-13 flex justify-between items-center">
            <p className="block text-primary text-medium">Font</p>
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
    )
}
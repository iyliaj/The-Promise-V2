


export function LatestPromiseSection({ isDesktopOrLaptop, isExpired, sortedPromises, completePromiseState, handleCompletePromiseClick, isFadedIn, handleConfirmPromise }) {
    return (
        <div className={`latest-promise-section w-full ${isDesktopOrLaptop ? "h-full" : "h-full"} flex flex-col justify-around`}>
            <div className={`latest-promise-card bg-secondary dark:bg-dark-primary ${isExpired && "bg-red-950"}`}>

                {sortedPromises[0] && !isExpired && (
                    <div className="w-full h-full">
                        <div className="flex flex-col justify-around relative w-[90%]">
                            <div className="latest-promise-header bg-primary dark:bg-secondary">
                                <p className="text-canvas dark:text-primary text-[0.7rem] inline-block">
                                    NEXT PROMISE
                                </p>
                            </div>
                            <div className="text-container w-full h-20 pt-2">
                                <p className={`latest-promise-text text-primary dark:text-canvas text-large inline-block mt-2 ${isDesktopOrLaptop ? "w-90" : "w-50"}`}>
                                    {!isDesktopOrLaptop && (sortedPromises[0].title.length > 30 ?
                                        sortedPromises[0].title.slice(0, 30) + "..." :
                                        sortedPromises[0].title)}

                                    {isDesktopOrLaptop && (sortedPromises[0].title.length > 40 ?
                                        sortedPromises[0].title.slice(0, 40) + "..." :
                                        sortedPromises[0].title)}
                                </p>
                            </div>
                        </div>

                        <div className={`expanding-box bg-canvas dark:bg-secondary ${completePromiseState === "expanded" && "expand-promise"} ${completePromiseState === "collapsed" && "collapse-promise"}`}>
                            <div
                                onClick={handleCompletePromiseClick}
                                className="complete-promise-btn bg-canvas dark:bg-secondary">
                                <div className="w-full h-full flex justify-center items-center">
                                    <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_d_30_26)">
                                            <path d="M14.8417 13.5756C15.4051 14.2984 15.4051 15.3117 14.8417 16.0346L5.87743 27.5357C4.70739 29.0369 2.29999 28.2095 2.29999 26.3062L2.29999 3.30392C2.29999 1.40064 4.7074 0.573265 5.87744 2.07443L14.8417 13.5756Z" fill="#414C60" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_30_26" x="-1.21593e-05" y="3.09944e-06" width="15.5643" height="29.6101" filterUnits="userSpaceOnUse">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dx="-1" />
                                                <feGaussianBlur stdDeviation="0.65" />
                                                <feComposite in2="hardAlpha" operator="out" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 0.160827 0 0 0 0 0.187351 0 0 0 0 0.235577 0 0 0 1 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_26" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_30_26" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {completePromiseState === "expanded" && (
                                <div className={`latest-promise-container ${!isDesktopOrLaptop ? "p-2" : "p-4"} ${isFadedIn === "fadeIn" && "promise-fadeIn"} ${isFadedIn === "fadeOut" && "promise-fadeOut"}`}>
                                    <p className="text-primary text-medium">{sortedPromises[0].title}</p>
                                    <p className="text-primary text-large mt-3">Complete promise?</p>
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleConfirmPromise(sortedPromises[0].id)}
                                            className="complete-yes-btn bg-primary dark:bg-dark-primary">
                                            Yes
                                        </button>
                                        <button
                                            onClick={handleCompletePromiseClick}
                                            className="complete-cancel-btn text-primary dark:text-dark-primary">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {isExpired && (
                    <div className="w-full h-full">
                        <p className="text-large text-canvas">Promise Expired!</p>
                        <p className="text-medium text-canvas">You're a hopeless fool</p>
                    </div>
                )}

                {sortedPromises.length === 0 && !isExpired && (
                    <div>
                        <p className="text-primary dark:text-canvas text-large">
                            Character building<br />starts here.
                        </p>
                        <p className="mt-2 text-small text-primary dark:text-secondary">
                            Make a promise to yourself today.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
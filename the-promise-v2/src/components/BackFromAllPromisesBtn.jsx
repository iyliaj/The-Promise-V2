


export function BackFromAllPromisesBtn({ handleViewAllPromises }) {
    return (
        <button
            onClick={handleViewAllPromises}
            className="view-all-promises-back bg-primary dark:bg-dark-primary"
        >
            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.742762 8.46424C-0.247589 7.66375 -0.247587 6.15388 0.742763 5.35339L6.81119 0.44834C8.11907 -0.608808 10.0684 0.322069 10.0684 2.00377L10.0684 11.8139C10.0684 13.4956 8.11906 14.4264 6.81118 13.3693L0.742762 8.46424Z" fill="#D9D9D9" />
            </svg>
            Back
        </button>
    )
}
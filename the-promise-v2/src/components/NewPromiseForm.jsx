import { useEffect } from "react";
import { useForm } from "react-hook-form";


export function NewPromiseForm({ handleClick, setUserData }) {

    const { register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm();

    const onSubmit = async (data) => {

        console.log(data);

        const newId = crypto.randomUUID();

        setUserData((prev) => {

            // Add new promise to active array

            const active = [...prev.promises, {
                id: newId,
                title: data.title,
                description: data.description,
                date: data.date,
                time: data.time,
                status: "active"
            }
            ];

            // Sort data in active array
            active.sort((a, b) => {
                const dateTimeA = new Date(`${a.date}T${a.time}`);
                const dateTimeB = new Date(`${b.date}T${b.time}`);

                return dateTimeA.getTime() - dateTimeB.getTime();
            });

            // Update promises value to active array
            return {
                ...prev,
                promises: active
            }
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

    }

    // To reset form fields after submitting
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const dateToday = new Date().toISOString().split("T")[0];
    const timeNow = new Date().toISOString().split("T")[1];

    const validateTime = (timeValue) => {
        const selectedDate = watch("date");

        if (!selectedDate || !timeValue) {
            return true;
        }

        if (selectedDate === dateToday) {
            const now = new Date();
            const selectedDateTime = new Date(`${selectedDate}T${timeValue}`);

            if (selectedDateTime <= now) {
                return "Time must be in the future!"
            }

        }

        return true;

    }

    return (
        <div className="new-promise-section w-full h-100 bg-secondary rounded-md p-4 relative">
            <div className="text-inputs-section w-full h-[45%] flex flex-col">
                <form id="new-promise-form" onSubmit={handleSubmit(onSubmit)}>
                    <section className="">
                        <label htmlFor="title" className="inline">Title</label>
                        {errors.title && (<p className="text-[0.8rem] text-red-900 inline ml-2">{errors.title.message}</p>)}
                        <input {...register("title", {
                            required: "Title required",
                            validate: (value) => {
                                if (value.length <= 3) {
                                    return "More than 3 characters please"
                                }
                                return true;
                            }
                        })} type="text" id="title" className="promise-title w-[90%] h-8 bg-canvas rounded-md mt-2 p-1" />

                    </section>
                    <section className="mt-4">
                        <label htmlFor="description" className="inline">Description</label>
                        {errors.description && (<p className="text-[0.8rem] text-red-900 inline ml-2">{errors.description.message}</p>)}
                        <input {...register("description", {
                            required: "Description required",
                            maxLength: 80,
                            validate: (value) => {
                                if (value.length <= 10) {
                                    return "Be more descriptive"
                                }
                                if (value.length > 80) {
                                    return "Character limit reached"
                                }
                                return true;
                            }
                        })} type="text" id="description" className="promise-decscription w-[90%] h-8 bg-canvas rounded-md mt-2 p-1" maxLength="50" />
                    </section>
                </form>
            </div>
            <div className="deadline-buttons-section w-full h-[50%] flex flex-col justify-evenly">
                <section>
                    <label htmlFor="date">Date</label>
                    <input {...register("date", {
                        required: "Date required",
                        min: {
                            value: dateToday,
                            message: "Must be not be a past date"
                        }
                    })} type="date" id="date" form="new-promise-form" min={dateToday} />
                    {errors.date && (<div><p className="text-[0.8rem] text-red-900">{errors.date.message}</p></div>)}
                </section>
                <section>
                    <label htmlFor="time">Time</label>
                    <input {...register("time", {
                        required: "Time required",
                        validate: validateTime
                    })} type="time" id="time" form="new-promise-form" min={timeNow} />
                    {errors.time && (<div><p className="text-[0.8rem] text-red-900">{errors.time.message}</p></div>)}
                </section>
            </div>
            <div className="new-promise-btns flex flex-col gap-1 absolute bottom-10 right-3">
                <button
                    disabled={isSubmitting}
                    form="new-promise-form"
                    type="submit"
                    className="w-26 h-14 bg-primary rounded-md text-[0.9rem] hover:opacity-80 active:scale-98 text-canvas">{isSubmitting ? "Adding Promise..." : "Add Promise"}</button>
                <button
                    onClick={handleClick}
                    className="w-26 h-14 border rounded-md text-[0.9rem hover:opacity-80 hover:text-canvas active:bg-gray-500 cursor-pointer">Close</button>
            </div>
        </div>
    )
}
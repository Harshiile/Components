import Navbar from "./Navbar";

const TimeTable = () => {
    const timetableData = [
        {
            day: "Monday",
            schedule: [
                { time: "09:00 - 10:30", subject: "Mathematics", class: "X - A" },
                { time: "11:00 - 12:30", subject: "Physics", class: "XI - B" },
                { time: "14:00 - 15:30", subject: "Chemistry", class: "XII - A" },
            ]
        },
        {
            day: "Tuesday",
            schedule: [
                { time: "09:00 - 10:30", subject: "Mathematics", class: "X - A" },
                { time: "11:00 - 12:30", subject: "Physics", class: "XI - B" },
                { time: "14:00 - 15:30", subject: "Chemistry", class: "XII - A" },
            ]
        },
        {
            day: "Friday",
            schedule: [
                { time: "08:30 - 10:00", subject: "Biology", class: "XI - A" },
                { time: "10:30 - 12:00", subject: "Mathematics", class: "X - B" },
            ]
        },
        {
            day: "Saturday",
            schedule: [
                { time: "08:30 - 10:00", subject: "Biology", class: "XI - A" },
                { time: "10:30 - 12:00", subject: "Mathematics", class: "X - B" },
            ]
        },
    ];

    return <>
        <Navbar />
        <div className="bg-black min-h-screen">
            <div className="container mx-auto px-4 py-8 bg-black">
                <div className="bg-[#1C1C1C] rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-6 text-white">Weekly Schedule</h2>
                    <div className="overflow-x-auto">
                        <table className="">
                            <thead>
                                <tr className="border-b border-white">
                                    <th className="px-12 py-3 text-left text-sm font-semibold text-white">Day</th>
                                    <th className="px-12 py-3 text-left text-sm font-semibold text-white">Subject</th>
                                    <th className="px-12 py-3 text-left text-sm font-semibold text-white">Time</th>
                                    <th className="px-12 py-3 text-left text-sm font-semibold text-white">Class</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetableData.map((day, index) => (
                                    day.schedule.map((slot, slotIndex) => (
                                        <tr
                                            key={`${index}-${slotIndex}`}
                                            className={`bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors ${slotIndex === day.schedule.length - 1 ? 'border-b border-white' : 'border-b border-white/20'}
                                                }`}
                                        >
                                            {slotIndex === 0 && (
                                                <td className="px-6 py-4 text-md font-medium text-white" rowSpan={day.schedule.length}>
                                                    {day.day}
                                                </td>
                                            )}
                                            <td className="px-12 py-4 text-md text-white/70">
                                                {slot.subject}
                                            </td>
                                            <td className="px-12 py-4 text-md text-white/70">
                                                {slot.time}
                                            </td>
                                            <td className="px-12 py-4 text-md text-white/70">
                                                {slot.class}
                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </>
};

export default TimeTable;
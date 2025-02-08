import React, { useState } from 'react';
import { Calendar, Clock, School, Users, Building2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from './Navbar';

// Mock data - Replace with actual data from your backend
const mockUser = {
    id: "TCH001",
    name: "XYZ ABC",
    role: "teacher", // "student", "teacher", "organization"
};

const mockTimetables = [
    {
        id: 1,
        className: "Class X",
        division: "A",
        createdAt: "2024-01-15",
        totalSubjects: 6,
        totalTeachers: 8
    },
    {
        id: 2,
        className: "Class XI",
        division: "B",
        createdAt: "2024-01-16",
        totalSubjects: 7,
        totalTeachers: 9
    }
];

const mockWeekSchedule = {
    Monday: [
        { time: "9:00 AM", subject: "Mathematics", teacher: "John Smith", duration: "45 mins" },
        { time: "10:00 AM", subject: "Physics", teacher: "Emma Johnson", duration: "45 mins" },
        { time: "11:00 AM", subject: "Chemistry", teacher: "David Lee", duration: "45 mins" }
    ],
    Tuesday: [
        { time: "9:00 AM", subject: "Biology", teacher: "Sophia Brown", duration: "45 mins" },
        { time: "10:00 AM", subject: "English", teacher: "Michael Davis", duration: "45 mins" },
        { time: "11:00 AM", subject: "History", teacher: "Olivia Martinez", duration: "45 mins" }
    ],
    Wednesday: [
        { time: "9:00 AM", subject: "Physics", teacher: "Emma Johnson", duration: "45 mins" },
        { time: "10:00 AM", subject: "Chemistry", teacher: "David Lee", duration: "45 mins" },
        { time: "11:00 AM", subject: "Mathematics", teacher: "John Smith", duration: "45 mins" }
    ],
    Thursday: [
        { time: "9:00 AM", subject: "English", teacher: "Michael Davis", duration: "45 mins" },
        { time: "10:00 AM", subject: "Biology", teacher: "Sophia Brown", duration: "45 mins" },
        { time: "11:00 AM", subject: "History", teacher: "Olivia Martinez", duration: "45 mins" }
    ],
    Friday: [
        { time: "9:00 AM", subject: "Mathematics", teacher: "John Smith", duration: "45 mins" },
        { time: "10:00 AM", subject: "Physics", teacher: "Emma Johnson", duration: "45 mins" },
        { time: "11:00 AM", subject: "English", teacher: "Michael Davis", duration: "45 mins" }
    ],
    Saturday: [
        { time: "9:00 AM", subject: "History", teacher: "Olivia Martinez", duration: "45 mins" },
        { time: "10:00 AM", subject: "Chemistry", teacher: "David Lee", duration: "45 mins" },
        { time: "11:00 AM", subject: "Biology", teacher: "Sophia Brown", duration: "45 mins" }
    ]
};


const timeSlots = [
    "9:00 AM - 9:45 AM",
    "10:00 AM - 10:45 AM",
    "11:00 AM - 11:45 AM",
    "12:00 PM - 12:45 PM",
    "1:30 PM - 2:15 PM",
    "2:30 PM - 3:15 PM"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeeklyTimetableModal = ({ timetable, onClose, isOpen }) => {
    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className={`bg-zinc-900 rounded-xl w-[95%] max-w-7xl max-h-[90vh] overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
            >
                <div className="sticky top-0 z-10 bg-zinc-900 border-b border-white/10 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">
                        {timetable.className} - {timetable.division} Weekly Schedule
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>
                <div className="p-4 md:p-6 overflow-x-auto">
                    <div className="min-w-[900px]">
                        <table className="w-full border-collapse bg-zinc-900 rounded-lg overflow-hidden">
                            <thead>
                                <tr>
                                    <th className="bg-zinc-800 p-4 text-white text-left font-medium border-b border-r border-white/10 min-w-[150px]">
                                        Time Slot
                                    </th>
                                    {days.map(day => (
                                        <th key={day} className="bg-zinc-800 p-4 text-white text-left font-medium border-b border-r border-white/10 min-w-[150px]">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((timeSlot, index) => (
                                    <tr key={index} className="group">
                                        <td className="bg-zinc-800/50 p-4 text-white border-r border-b border-white/10 font-medium">
                                            {timeSlot}
                                        </td>
                                        {days.map(day => (
                                            <td key={day} className="p-4 border-r border-b border-white/10 group-hover:bg-zinc-800/30 transition-colors duration-200">
                                                {mockWeekSchedule[day]?.[index] && (
                                                    <div className="space-y-2 transition-all duration-200 hover:translate-y-[-2px]">
                                                        <div className="text-white font-medium">
                                                            {mockWeekSchedule[day][index].subject}
                                                        </div>
                                                        <div className="text-white/70 text-sm flex flex-col gap-1">
                                                            <span>{mockWeekSchedule[day][index].teacher}</span>
                                                            <span className="text-white/50 text-xs">
                                                                {mockWeekSchedule[day][index].duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [selectedTimetable, setSelectedTimetable] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTimetableClick = (timetable) => {
        setSelectedTimetable(timetable);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTimetable(null), 300); // Wait for transition to complete
    };

    const UserInfo = () => (
        <div className="bg-zinc-800 rounded-xl p-4 md:p-6 border border-white/10">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                    {mockUser.role === "organization" ? (
                        <Building2 className="h-6 w-6 text-white" />
                    ) : mockUser.role === "teacher" ? (
                        <Users className="h-6 w-6 text-white" />
                    ) : (
                        <School className="h-6 w-6 text-white" />
                    )}
                </div>
                <div>
                    <h2 className="text-white text-lg md:text-xl font-semibold">{mockUser.name}</h2>
                    <p className="text-white/70 text-sm">ID: {mockUser.id}</p>
                </div>
            </div>
        </div>
    );

    const WeekNavigator = () => (
        <div className="bg-zinc-800 rounded-xl p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <div className="flex flex-wrap justify-center gap-2">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedDay === day ? 'bg-white text-black' : 'text-white hover:bg-zinc-700'
                                }`}
                        >
                            {window.innerWidth < 640 ? day.slice(0, 3) : day}
                        </button>
                    ))}
                </div>
                <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <ChevronRight className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    );

    const ScheduleView = () => (
        <div className="bg-zinc-800 rounded-xl border border-white/10">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Schedule for {selectedDay}</h3>
            </div>
            <div className="p-4 space-y-4">
                {mockWeekSchedule[selectedDay]?.map((schedule, index) => (
                    <div key={index} className="flex items-center gap-4 bg-zinc-900 p-4 rounded-lg border border-white/10">
                        <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-white/70" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <h4 className="text-white font-medium">{schedule.subject}</h4>
                                    <p className="text-white/70 text-sm">{schedule.teacher}</p>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-white">{schedule.time}</p>
                                    <p className="text-white/70 text-sm">{schedule.duration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const OrganizationView = () => (
        <div className="bg-zinc-800 rounded-xl border border-white/10">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Created Timetables</h3>
            </div>
            <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTimetables.map((timetable) => (
                    <div
                        key={timetable.id}
                        className="bg-zinc-900 p-4 rounded-lg border border-white/10 cursor-pointer hover:bg-zinc-950 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                        onClick={() => handleTimetableClick(timetable)}
                    >
                        <div className="flex flex-col gap-2">
                            <div>
                                <h4 className="text-white font-medium">{timetable.className} - {timetable.division}</h4>
                                <p className="text-white/70 text-sm">Created on {timetable.createdAt}</p>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                <p className="text-white text-sm">{timetable.totalSubjects} Subjects</p>
                                <p className="text-white/70 text-sm">{timetable.totalTeachers} Teachers</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <UserInfo />

                    {mockUser.role !== "organization" && (
                        <>
                            <WeekNavigator />
                            <ScheduleView />
                        </>
                    )}

                    {mockUser.role === "organization" && <OrganizationView />}

                    {selectedTimetable && (
                        <WeeklyTimetableModal
                            timetable={selectedTimetable}
                            onClose={handleCloseModal}
                            isOpen={isModalOpen}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
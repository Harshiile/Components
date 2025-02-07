import { useState } from "react";
import { PlusCircle, BookOpen, X, Check, Users } from "lucide-react";
import { Toaster, toast } from 'sonner';
import Navbar from "./Navbar";

const organizationTeachers = {
    teachers: [
        { teacher_id: "T001", teacher_name: "John Smith" },
        { teacher_id: "T002", teacher_name: "Emma Johnson" },
        { teacher_id: "T003", teacher_name: "David Lee" },
        { teacher_id: "T004", teacher_name: "Sophia Brown" },
        { teacher_id: "T005", teacher_name: "Michael Davis" },
        { teacher_id: "T006", teacher_name: "Olivia Martinez" },
        { teacher_id: "T007", teacher_name: "Liam Clark" },
        { teacher_id: "T008", teacher_name: "Ava Wilson" },
        { teacher_id: "T009", teacher_name: "Mason Moore" },
        { teacher_id: "T010", teacher_name: "Isabella Taylor" }
    ]
};

const TimeTableForm = () => {
    const [periodDuration, setPeriodDuration] = useState(30);
    const [specialHours, setSpecialHours] = useState(1);
    const [breakDuration, setBreakDuration] = useState(30);
    const [isSubjectOpen, setIsSubjectOpen] = useState(false);
    const [classname, setClassname] = useState("")
    const [division, setDivision] = useState("")
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");
    const [selectedTeachers, setSelectedTeachers] = useState(["", ""]);
    const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);

    const durationArray = [30, 45, 60, 90];
    const specialDurationArray = [1, 2, 3];
    const breakDurationsArray = [30, 45, 60];

    const addSubject = (e) => {
        e.preventDefault();
        if (!newSubject.trim()) {
            toast.error('Please enter a subject name', {
                position: 'bottom-right',
                className: 'bg-red-500'
            });
            return;
        }
        if (!selectedTeachers[0]) {
            toast.error('At least one teacher is required', {
                position: 'bottom-right',
                className: 'bg-red-500'
            });
            return;
        }

        const teacherNames = selectedTeachers.map(teacherId => {
            const teacher = organizationTeachers.teachers.find(t => t.teacher_id === teacherId);
            return teacher ? teacher.teacher_name : '';
        });

        setSubjects([...subjects, { name: newSubject, teachers: teacherNames }]);
        setNewSubject("");
        setSelectedTeachers(["", ""]);
        setIsSubjectOpen(false);
        setIsTeacherPanelOpen(false);
    };

    const handleTeacherSelect = (teacherId) => {
        const currentIndex = selectedTeachers.indexOf(teacherId);
        if (currentIndex !== -1) {
            const newSelectedTeachers = [...selectedTeachers];
            newSelectedTeachers[currentIndex] = "";
            setSelectedTeachers(newSelectedTeachers);
        } else {
            const newSelectedTeachers = [...selectedTeachers];
            if (!newSelectedTeachers[0]) {
                newSelectedTeachers[0] = teacherId;
            } else if (!newSelectedTeachers[1]) {
                newSelectedTeachers[1] = teacherId;
            }
            setSelectedTeachers(newSelectedTeachers);
        }
    };

    const getTeacherSelectionStatus = (teacherId) => {
        const index = selectedTeachers.indexOf(teacherId);
        if (index === -1) return null;
        return index + 1;
    };

    const getSelectedTeacherName = (index) => {
        const teacherId = selectedTeachers[index];
        if (!teacherId) return "Not selected";
        return organizationTeachers.teachers.find(t => t.teacher_id === teacherId)?.teacher_name;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(classname, division, periodDuration, specialHours * 60, breakDuration);
        console.log(subjects);
    };

    return <>
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    fontSize: '1rem',
                    background: 'rgb(239 68 68)',
                    color: 'white',
                    border: 'none'
                },
                className: 'bg-red-500'
            }}
        />
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center py-4 px-20 relative">
            <div className="w-full bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-4 sm:p-6 md:p-8 border border-white/10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Form Section */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-white text-xl font-semibold mb-6">Create Timetable</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8">
                                <div className="group flex-1">
                                    <label htmlFor="classname" className="block text-md font-medium text-white/70 mb-2 group-focus-within:text-white transition-colors duration-200">
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        id="classname"
                                        value={classname}
                                        onChange={(e) => setClassname(e.target.value)}
                                        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="group flex-1">
                                    <label htmlFor="division" className="block text-md font-medium text-white/70 mb-2 group-focus-within:text-white transition-colors duration-200">
                                        Division
                                    </label>
                                    <input
                                        type="text"
                                        id="division"
                                        value={division}
                                        onChange={(e) => setDivision(e.target.value)}
                                        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Period Duration */}
                            <div>
                                <label className="block text-md font-medium text-white/70 mb-2">Period Duration</label>
                                <div className="relative p-1.5 bg-zinc-800 rounded-full flex flex-wrap sm:flex-nowrap shadow-inner w-full">
                                    <div
                                        className="absolute top-0 left-0 h-[calc(100%)] w-[calc(25%)] bg-white rounded-full transition-all duration-300"
                                        style={{
                                            left: `calc(${(durationArray.indexOf(periodDuration) / durationArray.length) * 100}%)`,
                                        }}
                                    ></div>
                                    {durationArray.map(item => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() => setPeriodDuration(item)}
                                            className={`flex-1 py-2 px-2 sm:px-4 rounded-full text-sm sm:text-md font-medium relative z-10 transition-colors duration-300 cursor-pointer ${periodDuration === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                                        >
                                            {item} mins
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Special Subject/Lab Hours */}
                            <div>
                                <label className="block text-md font-medium text-white/70 mb-2">Special Subject / Lab Hours</label>
                                <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner w-full">
                                    <div
                                        className="absolute top-0 left-0 h-[calc(100%)] w-[calc(33.33%)] bg-white rounded-full transition-all duration-300"
                                        style={{
                                            left: `calc(${(specialDurationArray.indexOf(specialHours) / specialDurationArray.length) * 100}%)`,
                                        }}
                                    ></div>
                                    {specialDurationArray.map(item => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() => setSpecialHours(item)}
                                            className={`flex-1 py-2 px-2 sm:px-4 rounded-full text-sm sm:text-md font-medium relative z-10 transition-colors duration-300 cursor-pointer ${specialHours === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                                        >
                                            {item} hours
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Break Duration */}
                            <div>
                                <label className="block text-md font-medium text-white/70 mb-2">Break Duration</label>
                                <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner w-full">
                                    <div
                                        className="absolute top-0 left-0 h-[calc(100%)] w-[calc(33.33%)] bg-white rounded-full transition-all duration-300"
                                        style={{
                                            left: `calc(${(breakDurationsArray.indexOf(breakDuration) / breakDurationsArray.length) * 100}%)`,
                                        }}
                                    ></div>
                                    {breakDurationsArray.map(item => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() => setBreakDuration(item)}
                                            className={`flex-1 py-2 px-2 sm:px-4 rounded-full text-sm sm:text-md font-medium relative z-10 transition-colors duration-300 cursor-pointer ${breakDuration === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                                        >
                                            {item} mins
                                        </button>
                                    ))}
                                </div>

                                {/* Create Subject Button */}
                                <button
                                    onClick={(e) => { e.preventDefault(); setIsSubjectOpen(!isSubjectOpen) }}
                                    className="w-full sm:w-[60%] mt-6 mx-auto bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <PlusCircle className="h-5 w-5" /> Create Subject
                                </button>

                                {/* Subject Input Form */}
                                <div className={`flex flex-col gap-y-4 overflow-hidden transition-all duration-300 py-4 ${isSubjectOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {/* Subject Name Input */}
                                    <div className="space-y-2 w-1/2 mx-auto">
                                        <label className="block text-md font-medium text-white/70">
                                            Subject Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter subject name"
                                            value={newSubject}
                                            onChange={(e) => setNewSubject(e.target.value)}
                                            className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    {/* Teacher Selection Area */}
                                    <div className="space-y-4">
                                        {/* Teacher Labels */}
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8">
                                            <div className="flex-1 space-y-2">
                                                <label className="block text-md font-medium text-white/70">
                                                    Teacher I
                                                </label>
                                                <div className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white">
                                                    {getSelectedTeacherName(0)}
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <label className="block text-md font-medium text-white/70">
                                                    Teacher II
                                                </label>
                                                <div className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white">
                                                    {getSelectedTeacherName(1)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Select Teachers Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsTeacherPanelOpen(true)}
                                            className="w-full sm:w-1/2 mx-auto bg-zinc-800 border border-white/10 rounded-lg text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 py-2.5 px-4 flex items-center justify-center gap-2"
                                        >
                                            <Users className="h-4 w-4" />
                                            Select Teachers
                                        </button>
                                    </div>

                                    {/* Add Subject Button */}
                                    <button
                                        onClick={addSubject}
                                        className="w-full sm:w-[60%] mx-auto bg-white text-black font-medium py-2.5 px-4 rounded-lg hover:bg-zinc-100 transition-all duration-300 cursor-pointer mt-2"
                                    >
                                        Add Subject
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-3 mt-6"
                                >
                                    <BookOpen className="h-5 w-5" />
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Display Subjects Table */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-lg font-semibold mb-6 text-center text-white">Subjects & Teachers</h3>
                        <div className="overflow-x-auto rounded-lg border border-white/10">
                            <table className="w-full">
                                <thead className="bg-zinc-800">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-md font-semibold text-white/70">Subject</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-md font-semibold text-white/70">Teacher I</th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-md font-semibold text-white/70">Teacher II</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {subjects.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 sm:px-6 py-4 text-center text-white/50 italic">
                                                No subjects added yet
                                            </td>
                                        </tr>
                                    ) : (
                                        subjects.map((subject, index) => (
                                            <tr key={index} className="bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors">
                                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-md font-medium text-white">
                                                    {subject.name}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-md text-white/70">
                                                    {subject.teachers[0]}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-md text-white/70">
                                                    {subject.teachers[1] || '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teacher Selection Panel */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-zinc-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isTeacherPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-4 sm:p-6 border-b border-white/10">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Select Teachers (0-2)</h3>
                            <button
                                onClick={() => setIsTeacherPanelOpen(false)}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
                        {organizationTeachers.teachers.map(teacher => {
                            const selectionStatus = getTeacherSelectionStatus(teacher.teacher_id);
                            return (
                                <button
                                    key={teacher.teacher_id}
                                    onClick={() => handleTeacherSelect(teacher.teacher_id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${selectionStatus
                                        ? 'bg-white text-black'
                                        : 'text-white hover:bg-zinc-800'
                                        }`}
                                    disabled={!selectionStatus && selectedTeachers.filter(Boolean).length >= 2}
                                >
                                    <span>{teacher.teacher_name}</span>
                                    {selectionStatus && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">Teacher {selectionStatus}</span>
                                            <Check className="h-4 w-4" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default TimeTableForm;
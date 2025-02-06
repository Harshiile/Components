import { useState } from "react";
import { PlusCircle, BookOpen } from "lucide-react";
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
        { teacher_id: "T010", teacher_name: "Isabella Taylor" },
        { teacher_id: "T011", teacher_name: "Lucas Anderson" },
        { teacher_id: "T012", teacher_name: "Charlotte Harris" }
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

    const durationArray = [30, 45, 60, 90];
    const specialDurationArray = [1, 2, 3];
    const breakDurationsArray = [30, 45, 60];

    const addSubject = (e) => {
        e.preventDefault();
        if (!selectedTeachers[0]) {
            // Toast : "At least one teacher is required"
            return;
        }
        if (newSubject.trim()) {
            const teacherNames = selectedTeachers.map(teacherId => {
                const teacher = organizationTeachers.teachers.find(t => t.teacher_id === teacherId);
                return teacher ? teacher.teacher_name : '';
            });

            setSubjects([...subjects, { name: newSubject, teachers: teacherNames }]);
            setNewSubject("");
            setSelectedTeachers(["", ""]);
            setIsSubjectOpen(false);
        }
    };

    const handleTeacherChange = (index, teacherId) => {
        const updatedTeachers = [...selectedTeachers];
        // Prevent selecting the same teacher twice
        if (teacherId && selectedTeachers.includes(teacherId)) {
            return;
        }
        updatedTeachers[index] = teacherId;
        setSelectedTeachers(updatedTeachers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(classname, division, periodDuration, specialHours * 60, breakDuration);
        console.log(subjects);
    };

    return <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-[97%] bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-8 border border-white/10 flex">
                <div className="w-1/2 pr-4">
                    <h2 className="text-white text-xl font-semibold mb-6">Create Timetable</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex gap-x-16">
                            <div className="group">
                                <label htmlFor="firstName" className="block text-md font-medium text-white/70 mb-2 group-focus-within:text-white transition-colors duration-200">
                                    Class Name
                                </label>
                                <input
                                    type="text"
                                    id="classname"
                                    value={classname}
                                    onChange={(e) => setClassname(e.target.value)}
                                    className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="firstName" className="block text-md font-medium text-white/70 mb-2 group-focus-within:text-white transition-colors duration-200">
                                    Division
                                </label>
                                <input
                                    type="text"
                                    id="division"
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                    className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>
                        {/* Period Duration */}
                        <label className="block text-md font-medium text-white/70 mb-2">Period Duration</label>
                        <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner w-full">
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
                                    className={`flex-1 py-2 px-4 rounded-full text-md font-medium relative z-10 transition-colors duration-300 cursor-pointer ${periodDuration === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                                >
                                    {item} mins
                                </button>
                            ))}
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
                                        className={`flex-1 py-2 px-4 rounded-full text-md font-medium relative z-10 transition-colors duration-300 cursor-pointer ${specialHours === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
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
                                        className={`flex-1 py-2 px-4 rounded-full text-md font-medium relative z-10 transition-colors duration-300 cursor-pointer ${breakDuration === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                                    >
                                        {item} mins
                                    </button>
                                ))}
                            </div>

                            {/* Create Subject Button */}
                            <button
                                onClick={(e) => { e.preventDefault(); setIsSubjectOpen(!isSubjectOpen) }}
                                className="w-[60%] mt-6 mx-auto bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <PlusCircle className="h-5 w-5" /> Create Subject
                            </button>

                            {/* Subject Input Form */}
                            <div className={`flex flex-col gap-y-4 overflow-hidden transition-all duration-300 py-4 ${isSubjectOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="group mx-auto w-full">
                                    <input
                                        type="text"
                                        placeholder="Subject Name"
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                                <div className="flex justify-center gap-x-6">
                                    {[0, 1].map((index) => (
                                        <select
                                            key={index}
                                            value={selectedTeachers[index]}
                                            onChange={(e) => handleTeacherChange(index, e.target.value)}
                                            className="w-[40%] px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                        >
                                            <option value="">Select Teacher {index + 1}</option>
                                            {organizationTeachers.teachers
                                                .filter(teacher => !selectedTeachers.includes(teacher.teacher_id) || teacher.teacher_id === selectedTeachers[index])
                                                .map(teacher => (
                                                    <option key={teacher.teacher_id} value={teacher.teacher_id}>
                                                        {teacher.teacher_name}
                                                    </option>
                                                ))}
                                        </select>
                                    ))}
                                </div>
                                <button
                                    onClick={addSubject}
                                    className="w-[35%] mx-auto bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-zinc-100 transition-all duration-300 cursor-pointer"
                                >
                                    Add Subject
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-3"
                            >
                                <BookOpen className="h-5 w-5" />
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Display Subjects Table */}
                <div className="w-1/2 pl-4 text-white">
                    <h3 className="text-lg font-semibold mb-6 text-center">Subjects & Teachers</h3>
                    <div className="overflow-hidden rounded-lg border border-white/10">
                        <table className="w-full">
                            <thead className="bg-zinc-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-white/70">Subject</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-white/70">Teacher I</th>
                                    <th className="px-6 py-3 text-left text-md font-semibold text-white/70">Teacher II</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {subjects.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-white/50 italic">
                                            No subjects added yet
                                        </td>
                                    </tr>
                                ) : (
                                    subjects.map((subject, index) => (
                                        <tr key={index} className="bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 text-md font-medium text-white">
                                                {subject.name}
                                            </td>
                                            <td className="px-6 py-4 text-md text-white/70">
                                                {subject.teachers[0]}
                                            </td>
                                            <td className="px-6 py-4 text-md text-white/70">
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
    </>;
}

export default TimeTableForm;
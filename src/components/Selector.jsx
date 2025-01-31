import { useState } from "react";
import { PlusCircle } from "lucide-react";

function TimeTableForm() {
  const [periodDuration, setPeriodDuration] = useState(30);
  const [specialHours, setSpecialHours] = useState(1);
  const [breakDurationsArray, setBreakDuration] = useState(30);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [teachers, setTeachers] = useState(["", ""]);

  const durationArray = [30, 45, 60, 90];
  const specialDurationArray = [1, 2, 3];
  const breakDurationsArrays = [30, 45, 60];

  const addSubject = () => {
    if (!teachers[0]) {
      // Toast : "Atleast one teacher is required"
      return;
    }
    if (newSubject.trim()) {
      setSubjects([...subjects, { name: newSubject, teachers }]);
      setNewSubject("");
      setTeachers(["", ""]);
      setIsSubjectOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-[97%] bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-8 border border-white/10 flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-white text-xl font-semibold mb-6">Create Timetable</h2>
          <form className="space-y-6">
            {/* Period Duration */}
            <label className="block text-sm font-medium text-white/70 mb-2">Period Duration</label>
            <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner w-full">
              <div
                className={`absolute top-0 left-0 h-[calc(100%)] w-[calc(25%)] bg-white rounded-full transition-all duration-300`}
                style={{
                  left: `calc(${(durationArray.indexOf(periodDuration) / durationArray.length) * 100}%)`,
                }}
              ></div>
              {durationArray.map(item => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setPeriodDuration(item)}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-300 cursor-pointer ${periodDuration === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                >
                  {item} mins
                </button>
              ))}
            </div>

            {/* Special Subject/Lab Hours */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Special Subject/Lab Hours</label>
              <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner w-full">
                <div
                  className={`absolute top-0 left-0 h-[calc(100%)] w-[calc(33.33%)] bg-white rounded-full transition-all duration-300`}
                  style={{
                    left: `calc(${(specialDurationArray.indexOf(specialHours) / specialDurationArray.length) * 100}%)`,
                  }}
                ></div>
                {specialDurationArray.map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setSpecialHours(item)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-300 cursor-pointer ${specialHours === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                  >
                    {item} hours
                  </button>
                ))}
              </div>
            </div>

            {/* Break Duration */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Break Duration</label>
              <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner w-full">
                <div
                  className={`absolute top-0 left-0 h-[calc(100%)] w-[calc(33.33%)] bg-white rounded-full transition-all duration-300`}
                  style={{
                    left: `calc(${(breakDurationsArrays.indexOf(breakDurationsArray) / breakDurationsArrays.length) * 100}%)`,
                  }}
                ></div>
                {breakDurationsArrays.map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setBreakDuration(item)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-300 cursor-pointer ${breakDurationsArray === item ? 'text-black' : 'text-white/70 hover:text-white'}`}
                  >
                    {item} mins
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Create Subject Button */}
          <button
            onClick={() => setIsSubjectOpen(!isSubjectOpen)}
            className="mt-8 w-[60%] mx-auto bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="h-5 w-5" /> Create Subject
          </button>

          {/* Subject Input Form */}
          <div className={` flex flex-col gap-y-4 overflow-hidden transition-all duration-300 py-4 ${isSubjectOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="group mx-auto">
              <input
                type="text"
                id="firstName"
                placeholder="Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div className="flex justify-center gap-x-6">
              {teachers.map((teacher, index) => (
                <input
                  key={index}
                  type="text"
                  id="firstName"
                  placeholder={`Teacher ${index + 1} Name`}
                  value={teacher}
                  onChange={(e) => {
                    let updatedTeachers = [...teachers];
                    updatedTeachers[index] = e.target.value;
                    setTeachers(updatedTeachers);
                  }}
                  className="w-[40%] px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  required
                />
              ))}
            </div>
            <button
              onClick={addSubject}
              className="w-full bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-zinc-100 transition-all duration-300 cursor-pointer"
            >
              Add Subject
            </button>
          </div>
        </div>

        {/* Display Subjects */}
        <div className="w-1/2 pl-4 text-white">
          <h3 className="text-lg font-semibold mb-2 text-center">Subjects & Teachers</h3>
          {subjects.map((subject, index) => (
            <div key={index} className="p-4 bg-zinc-800 rounded-lg mb-2">
              <p className="font-medium">{subject.name}</p>
              <span className="text-md text-white/70">Teachers : </span>
              <span className="text-md text-white/70">{subject.teachers[0]}</span>
              {subject.teachers[1] && <span className="text-md text-white/70">, {subject.teachers[1]}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeTableForm;

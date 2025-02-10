import { useState } from "react";
import { Toaster, toast } from 'sonner';
import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import FirstPhase from "./FirstPhase";
import SecondPhase from "./SecondPhase";
import TeacherPanel from "./TeacherPanel";

const organizationTeachers = {
	teachers: [
		{ teacher_id: "T001", teacher_name: "John Smith" },
		{ teacher_id: "T002", teacher_name: "Emma Johnson" },
		{ teacher_id: "T003", teacher_name: "Mason Moore" },
	]
};
const TimeTableForm = () => {
	const [step, setStep] = useState(1);
	const [periodDuration, setPeriodDuration] = useState(30);
	const [specialHours, setSpecialHours] = useState(1);
	const [hoursPerDay, setHoursPerDay] = useState(6);
	const [breakDuration, setBreakDuration] = useState(30);
	const [classname, setClassname] = useState("");
	const [division, setDivision] = useState("");
	const [subjects, setSubjects] = useState([]);
	const [startTime, setStartTime] = useState("")
	const [newSubject, setNewSubject] = useState("");
	const [selectedTeachers, setSelectedTeachers] = useState(["", ""]);
	const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
	const [selectingSecondTeacher, setSelectingSecondTeacher] = useState(false);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (subjects.length === 0) {
			toast.error('Please add at least one subject', {
				position: 'bottom-right',
				className: 'bg-red-500'
			});
			return;
		}
		console.log({
			classname,
			division,
			startTime,
			hoursPerDay,
			periodDuration,
			specialHours,
			breakDuration,
			subjects
		});
	};


	return (
		<>
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
			<div className="min-h-screen bg-black flex items-center justify-center py-4 px-4 sm:px-20 relative">
				<div className="w-full bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-4 sm:p-6 md:p-8 border border-white/10">
					<div className="relative">
						{/* Step 1: Basic Form */}
						<FirstPhase
							step={step} setStep={setStep}
							classname={classname} setClassname={setClassname}
							division={division} setDivision={setDivision}
							startTime={startTime} setStartTime={setStartTime}
							hoursPerDay={hoursPerDay} setHoursPerDay={setHoursPerDay}
							periodDuration={periodDuration} setPeriodDuration={setPeriodDuration}
							specialHours={specialHours} setSpecialHours={setSpecialHours}
							breakDuration={breakDuration} setBreakDuration={setBreakDuration}
						/>

						{/* Step 2: Subject Creation and Display */}
						<AnimatePresence>
							{step === 2 && (
								<SecondPhase
									newSubject={newSubject} setNewSubject={setNewSubject}
									selectedTeachers={selectedTeachers} setSelectedTeachers={setSelectedTeachers}
									subjects={subjects} setSubjects={setSubjects}
									setSelectingSecondTeacher={setSelectingSecondTeacher}
									setIsTeacherPanelOpen={setIsTeacherPanelOpen}
									organizationTeachers={organizationTeachers}
									handleSubmit={handleSubmit}
								/>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Teacher Selection Panel */}
				<AnimatePresence>
					{isTeacherPanelOpen && (
						<TeacherPanel
							selectingSecondTeacher={selectingSecondTeacher}
							organizationTeachers={organizationTeachers}
							setIsTeacherPanelOpen={setIsTeacherPanelOpen}
							selectedTeachers={selectedTeachers}
							setSelectedTeachers={setSelectedTeachers}
							setSelectingSecondTeacher={setSelectingSecondTeacher}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default TimeTableForm;
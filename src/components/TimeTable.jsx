import { useState, useRef } from "react";
import { PlusCircle, BookOpen, X, Check, Users, ArrowLeft } from "lucide-react";
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const organizationTeachers = {
	teachers: [
		{ teacher_id: "T001", teacher_name: "John Smith" },
		{ teacher_id: "T002", teacher_name: "Emma Johnson" },
		{ teacher_id: "T209", teacher_name: "Mason Moore" },
		{ teacher_id: "T209", teacher_name: "Mason Moore" },
	]
};

const TimeTableForm = () => {
	const [step, setStep] = useState(1);
	const [periodDuration, setPeriodDuration] = useState(30);
	const [specialHours, setSpecialHours] = useState(1);
	const [breakDuration, setBreakDuration] = useState(30);
	const [classname, setClassname] = useState("");
	const [division, setDivision] = useState("");
	const [subjects, setSubjects] = useState([]);
	const [startTime, setStartTime] = useState("")
	const [newSubject, setNewSubject] = useState("");
	const [selectedTeachers, setSelectedTeachers] = useState(["", ""]);
	const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
	const [selectingSecondTeacher, setSelectingSecondTeacher] = useState(false);

	const durationArray = [30, 45, 60, 90];
	const specialDurationArray = [1, 2, 3];
	const breakDurationsArray = [30, 45, 60];

	const clockRef = useRef()


	const handleNextStep = () => {
		if (!classname || !division) {
			toast.error('Please fill in all required fields', {
				position: 'bottom-right',
				className: 'bg-red-500'
			});
			return;
		}
		setStep(2);
	};

	const handleTeacherSelect = (teacherId) => {
		const currentIndex = selectedTeachers.indexOf(teacherId);
		if (currentIndex !== -1) {
			const newSelectedTeachers = [...selectedTeachers];
			newSelectedTeachers[currentIndex] = "";
			setSelectedTeachers(newSelectedTeachers);
		} else {
			const newSelectedTeachers = [...selectedTeachers];
			if (selectingSecondTeacher) {
				if (teacherId === selectedTeachers[0]) {
					toast.error('Cannot select the same teacher twice');
					return;
				}
				newSelectedTeachers[1] = teacherId;
			} else {
				newSelectedTeachers[0] = teacherId;
			}
			setSelectedTeachers(newSelectedTeachers);
		}
		setIsTeacherPanelOpen(false);
		setSelectingSecondTeacher(false);
	};

	const getTeacherSelectionStatus = (teacherId) => {
		const index = selectedTeachers.indexOf(teacherId);
		if (index === -1) return null;
		return index + 1;
	};

	const getSelectedTeacherName = (index) => {
		const teacherId = selectedTeachers[index];
		if (!teacherId) return index === 0 ? "Select Teacher*" : "Second Teacher";
		return organizationTeachers.teachers.find(t => t.teacher_id === teacherId)?.teacher_name;
	};

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
			toast.error('First teacher is required', {
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
	};

	const handleRemoveSubject = (index) => {
		setSubjects(prev => prev.filter((_, i) => i !== index));
	};

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
						<motion.div
							className="w-full"
							initial={{ x: 0 }}
							animate={{ x: step === 2 ? -800 : 0, opacity: step === 2 ? 0 : 1 }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-white text-xl font-semibold mb-6">Create Timetable</h2>
							<form className="space-y-6">
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
									{/* Time Picker */}
									<div className="relative" ref={clockRef}>
										<div className="relative">
											<input
												type="text"
												id={id}
												value={formatDisplayTime()}
												readOnly
												onClick={() => setIsOpen(!isOpen)}
												className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white 
                   placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 
                   focus:border-transparent transition-all duration-200 cursor-pointer"
												required={required}
											/>
											<Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
										</div>

										<div
											className={`absolute mt-2 w-64 bg-zinc-900 rounded-lg shadow-xl border border-white/10 
                    transition-all duration-300 transform origin-top z-50
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
										>
											<div className="p-4 flex gap-4">
												{/* Hours Column */}
												<div className="flex-1">
													<div className="text-white/50 text-sm mb-2">Hour</div>
													<div className="h-48 overflow-y-auto custom-scrollbar">
														{hours.map((hour) => (
															<button
																key={hour}
																onClick={() => handleHourSelect(hour)}
																className={`w-full px-3 py-2 text-left rounded-md transition-colors duration-200
                    ${(selectedHour % 12 || 12) === hour
																		? 'bg-blue-500 text-white'
																		: 'text-white/70 hover:bg-white/10'
																	}`}
															>
																{hour}
															</button>
														))}
													</div>
												</div>

												{/* Minutes Column */}
												<div className="flex-1">
													<div className="text-white/50 text-sm mb-2">Minute</div>
													<div className="h-48 overflow-y-auto custom-scrollbar">
														{minutes.map((minute) => (
															<button
																key={minute}
																onClick={() => handleMinuteSelect(minute)}
																className={`w-full px-3 py-2 text-left rounded-md transition-colors duration-200
                    ${selectedMinute === minute
																		? 'bg-blue-500 text-white'
																		: 'text-white/70 hover:bg-white/10'
																	}`}
															>
																{minute.toString().padStart(2, '0')}
															</button>
														))}
													</div>
												</div>

												{/* AM/PM Column */}
												<div className="flex flex-col gap-2">
													<div className="text-white/50 text-sm mb-2">Period</div>
													<button
														onClick={() => handlePeriodChange('AM')}
														className={`px-3 py-2 rounded-md transition-colors duration-200
                ${period === 'AM'
																? 'bg-blue-500 text-white'
																: 'text-white/70 hover:bg-white/10'
															}`}
													>
														AM
													</button>
													<button
														onClick={() => handlePeriodChange('PM')}
														className={`px-3 py-2 rounded-md transition-colors duration-200
                ${period === 'PM'
																? 'bg-blue-500 text-white'
																: 'text-white/70 hover:bg-white/10'
															}`}
													>
														PM
													</button>
												</div>
											</div>
										</div>
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
								</div>

								<button
									type="button"
									onClick={handleNextStep}
									className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-3 mt-6"
								>
									<PlusCircle className="h-5 w-5" />
									Continue to Add Subjects
								</button>
							</form>
						</motion.div>

						{/* Step 2: Subject Creation and Display */}
						<AnimatePresence>
							{step === 2 && (
								<motion.div
									className="w-full absolute top-0 left-0"
									initial={{ x: 800, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: 800, opacity: 0 }}
									transition={{ duration: 0.5 }}
								>
									<div className="flex justify-between items-center mb-6">
										<h2 className="text-white text-xl font-semibold">Add Subjects</h2>
										<button
											onClick={() => setStep(1)}
											className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
										>
											<ArrowLeft className="h-5 w-5" />
											Previous Step
										</button>
									</div>

									<div className="flex gap-4">
										<div className="flex-1">
											<input
												type="text"
												value={newSubject}
												onChange={(e) => setNewSubject(e.target.value)}
												className="w-full bg-zinc-800 text-white rounded-lg border border-white/10 px-4 py-2.5 focus:outline-none focus:border-white/30"
												placeholder="Enter subject name"
											/>
										</div>
										<div className="flex gap-2">
											<button
												onClick={() => {
													setSelectingSecondTeacher(false);
													setIsTeacherPanelOpen(true);
												}}
												className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-2 whitespace-nowrap"
											>
												<Users className="h-5 w-5" />
												{getSelectedTeacherName(0)}
											</button>
											<button
												onClick={() => {
													setSelectingSecondTeacher(true);
													setIsTeacherPanelOpen(true);
												}}
												className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-2 whitespace-nowrap"
											>
												<Users className="h-5 w-5" />
												{getSelectedTeacherName(1)}
											</button>
										</div>
										<button
											onClick={addSubject}
											className="bg-white text-black px-4 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-2"
										>
											<PlusCircle className="h-5 w-5" />
											Add
										</button>
									</div>

									{subjects.length > 0 && (
										<div className="bg-zinc-800 rounded-lg border border-white/10 overflow-hidden mt-6">
											<table className="w-full">
												<thead>
													<tr className="border-b border-white/10">
														<th className="text-white/70 text-sm font-medium text-left py-3 px-4">Subject</th>
														<th className="text-white/70 text-sm font-medium text-left py-3 px-4">Teacher*</th>
														<th className="text-white/70 text-sm font-medium text-left py-3 px-4">Second Teacher</th>
														<th className="text-white/70 text-sm font-medium text-right py-3 px-4">Action</th>
													</tr>
												</thead>
												<tbody>
													{subjects.map((subject, index) => (
														<tr key={index} className="border-b border-white/10 last:border-none">
															<td className="text-white py-3 px-4">{subject.name}</td>
															<td className="text-white py-3 px-4">{subject.teachers[0]}</td>
															<td className="text-white py-3 px-4">{subject.teachers[1] || '-'}</td>
															<td className="text-white py-3 px-4 text-right">
																<button
																	onClick={() => handleRemoveSubject(index)}
																	className="text-red-500 hover:text-red-400 transition-colors"
																>
																	<X className="h-5 w-5" />
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									)}

									<button
										onClick={handleSubmit}
										className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-3 mt-6"
									>
										<BookOpen className="h-5 w-5" />
										Submit
									</button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Teacher Selection Panel */}
				<AnimatePresence>
					{isTeacherPanelOpen && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
						>
							<div className="bg-zinc-900 rounded-xl shadow-2xl border border-white/10 p-6 w-full max-w-4xl">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-white text-lg font-semibold">
										Select {selectingSecondTeacher ? "Second Teacher" : "Teacher"}
									</h3>
									<button
										onClick={() => setIsTeacherPanelOpen(false)}
										className="text-white/70 hover:text-white transition-colors"
									>
										<X className="h-5 w-5" />
									</button>
								</div>
								<div className={`grid grid-cols-1 sm:grid-cols-${(Math.floor(organizationTeachers.teachers.length / 10))} gap-2`}>
									{organizationTeachers.teachers.map(teacher => (
										<button
											key={teacher.teacher_id}
											onClick={() => handleTeacherSelect(teacher.teacher_id)}
											className={`w-full flex items-center justify-between bg-zinc-800 text-white rounded-lg px-4 py-3 hover:bg-zinc-700 transition-colors ${getTeacherSelectionStatus(teacher.teacher_id) ? 'bg-white text-black hover:bg-white' : ''
												}`}
										>
											<span>{teacher.teacher_name}</span>
											{getTeacherSelectionStatus(teacher.teacher_id) && (
												<div className="flex items-center gap-2">
													<span className="text-sm font-medium">
														Teacher {getTeacherSelectionStatus(teacher.teacher_id)}
													</span>
													<Check className="h-4 w-4" />
												</div>
											)}
										</button>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default TimeTableForm;
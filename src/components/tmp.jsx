import React from 'react'

const tmp = () => {
    return (
        <div>
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
                                    value={newSubject.name}
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    className="w-full bg-zinc-800 text-white rounded-lg border border-white/10 px-4 py-2.5 focus:outline-none focus:border-white/30"
                                    placeholder="Enter subject name"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setSelectingSecondTeacher(false);
                                        setShowTeacherPanel(true);
                                    }}
                                    className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                                >
                                    <Users className="h-5 w-5" />
                                    {selectedTeacher ? selectedTeacher.name : "Select Teacher*"}
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectingSecondTeacher(true);
                                        setShowTeacherPanel(true);
                                    }}
                                    className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                                >
                                    <Users className="h-5 w-5" />
                                    {selectedSecondTeacher ? selectedSecondTeacher.name : "Second Teacher"}
                                </button>
                            </div>
                            <button
                                onClick={handleAddSubject}
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
                                                <td className="text-white py-3 px-4">{subject.teacher}</td>
                                                <td className="text-white py-3 px-4">{subject.secondTeacher || '-'}</td>
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





            {/* Teacher Selection Panel */}
            <AnimatePresence>
                {showTeacherPanel && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <div className="bg-zinc-900 rounded-xl shadow-2xl border border-white/10 p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white text-lg font-semibold">
                                    Select {selectingSecondTeacher ? "Second Teacher" : "Teacher"}
                                </h3>
                                <button
                                    onClick={() => setShowTeacherPanel(false)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {organizationTeachers.map(teacher => (
                                    <button
                                        key={teacher.id}
                                        onClick={() => handleTeacherSelect(teacher)}
                                        className={`w-full flex items-center justify-between bg-zinc-800 text-white rounded-lg px-4 py-3 hover:bg-zinc-700 transition-colors ${(selectingSecondTeacher ? selectedSecondTeacher?.id : selectedTeacher?.id) === teacher.id
                                            ? 'bg-white text-black hover:bg-white'
                                            : ''
                                            }`}
                                    >
                                        <span>{teacher.name}</span>
                                        {((selectingSecondTeacher && selectedSecondTeacher?.id === teacher.id) ||
                                            (!selectingSecondTeacher && selectedTeacher?.id === teacher.id)) && (
                                                <Check className="h-5 w-5" />
                                            )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default tmp
import { useState, useEffect } from 'react';
import { UserRound, BookOpen, GraduationCap } from 'lucide-react';

function AfterSignup() {
    const [userType, setUserType] = useState('Student');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [prefix, setPrefix] = useState(null);
    const [role, setRole] = useState(null);
    useEffect(() => {
        if (userType == 'Teacher') {
            setPrefix('Mr');
            setRole('Subject')
        }
    }, [userType])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ userType, firstName, lastName, prefix, role });
    };
    const userTypeArray = ['Student', 'Teacher']
    const prefixArray = ['Dr', 'Mr', 'Mrs']
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-xl shadow-2xl shadow-white/5 p-8 border border-white/10">
                <div className="flex items-center justify-center mb-8">
                    {userType === 'Teacher' ? (
                        <UserRound className="h-12 w-12 text-white transition-all duration-500" />
                    ) : (
                        <GraduationCap className="h-12 w-12 text-white transition-all duration-500" />
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Type Segmented Control */}
                    <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner">
                        <div
                            className={`absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc(50%)] bg-white rounded-full transition-all duration-300`}
                            style={{
                                left: `calc(${(userTypeArray.indexOf(userType) / userTypeArray.length) * 100}%)`,
                            }}
                        ></div>
                        {
                            userTypeArray.map(item => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => setUserType(item)}
                                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-300 cursor-pointer ${userType === item ? 'text-black' : 'text-white/70 hover:text-white'
                                        }`}>
                                    {item}
                                </button>
                            ))
                        }
                    </div>
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="group">
                            <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-2 group-focus-within:text-white transition-colors duration-200">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-2 group-focus-within:text-white transition-colors duration-200">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>
                    </div>



                    {/* Teacher Role Selection - Dropdown/Drop-up Animation */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ${userType === 'Teacher' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {/* Prefix Segmented Control */}
                        <div className="relative p-1.5 bg-zinc-800 rounded-full flex shadow-inner">
                            <div
                                className={`absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc(33.33%)] bg-white rounded-full transition-all duration-300`}
                                style={{
                                    left: `calc(${(prefixArray.indexOf(prefix) / prefixArray.length) * 100}%)`,
                                }}
                            ></div>
                            {
                                prefixArray.map(item => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() => setPrefix(item)}
                                        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-300 cursor-pointer ${prefix === item ? 'text-black' : 'text-white/70 hover:text-white'
                                            }`}>
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                        <div className="space-y-2 pt-4">
                            <label className="block text-sm font-medium text-white/70">Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                {(['Subject', 'Lab']).map((r) => (
                                    <label
                                        key={r}
                                        className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${role === r
                                            ? 'bg-white text-black border-white'
                                            : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={r}
                                            checked={role === r}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className="font-medium capitalize">{r} Teacher</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <BookOpen className="h-5 w-5" />
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AfterSignup;
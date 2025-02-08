import { useRef, useState } from 'react';
import { ArrowRight, Lock, Unlock, GraduationCap, School, Building2, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { timetableImages } from '../public/images';

const Signup = () => {
    const [step, setStep] = useState('role');
    const [email, setEmail] = useState("");
    const [name, setName] = useState(null)
    const [orgId, setOrgId] = useState(null)
    const [passwordType, setPasswordType] = useState("password")
    const [password, setPassword] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const passwordRef = useRef();

    const showPassword = (e) => {
        e.preventDefault();
        passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password"
        setPasswordType(passwordRef.current.type)
    };

    const transitionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    };

    const userTypes = [
        {
            id: 'teacher',
            title: 'Teacher',
            icon: School,
            description: 'Create and manage courses, assignments, and student progress'
        },
        {
            id: 'student',
            title: 'Student',
            icon: GraduationCap,
            description: 'Access courses, submit assignments, and track your learning journey'
        },
        {
            id: 'organization',
            title: 'Organization',
            icon: Building2,
            description: 'Manage multiple courses and teachers under one institution'
        }
    ];

    const handleRoleSubmit = () => {
        if (selectedType) {
            setStep('details');
        }
    };

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        console.log({
            email,
            password,
            role: selectedType,
            orgId
        });
        window.location.href = '/timetable'
    };

    return (
        <div className="min-h-screen bg-black flex">
            <div className="hidden lg:block w-1/2 bg-gradient-to-br from-white/5 via-white/3 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40" />
                {timetableImages.map((image, index) => (
                    <div
                        key={index}
                        className="absolute w-[500px] h-[300px] rounded-xl overflow-hidden"
                        style={{
                            top: `${Math.random() * 60}%`,
                            left: `${Math.random() * 60}%`,
                            transform: image.transform,
                            transition: 'all 0.5s ease-out',
                        }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300"
                            style={{ backgroundImage: `url(${image.url})` }}
                        />
                    </div>
                ))}
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 xl:px-24">
                {/* Login Button */}
                <div className="absolute top-8 right-8">
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="flex items-center gap-2 px-6 py-2.5 text-white/70 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                    >
                        <LogIn className="h-4 w-4" />
                        <span className="font-medium">Login</span>
                    </button>
                </div>

                <motion.div
                    key={step}
                    initial="hidden"
                    animate="visible"
                    variants={transitionVariants}
                    className="max-w-md w-full mx-auto"
                >
                    {step === 'role' ? (
                        <>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mt-12">
                                Choose your role
                            </h1>
                            <p className="text-gray-500 text-xl mb-12">
                                Select the option that best describes you
                            </p>

                            <div className="space-y-4">
                                {userTypes.map(({ id, title, icon: Icon, description }) => (
                                    <button
                                        key={id}
                                        onClick={() => setSelectedType(id)}
                                        className={`
                                            w-full p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm text-left
                                            ${selectedType === id
                                                ? 'border-white/20 bg-white/5'
                                                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 cursor-pointer'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`
                                                p-4 rounded-full transition-all duration-300 flex-shrink-0
                                                ${selectedType === id
                                                    ? 'bg-white/10'
                                                    : 'bg-white/5 group-hover:bg-white/8'
                                                }
                                            `}>
                                                <Icon
                                                    size={28}
                                                    className={`
                                                        transition-all duration-300
                                                        ${selectedType === id
                                                            ? 'text-white'
                                                            : 'text-gray-400 group-hover:text-gray-300'
                                                        }
                                                    `}
                                                />
                                            </div>
                                            <div>
                                                <h3 className={`
                                                    text-2xl font-semibold mb-2 transition-all duration-300
                                                    ${selectedType === id
                                                        ? 'text-white'
                                                        : 'text-gray-300'
                                                    }
                                                `}>
                                                    {title}
                                                </h3>
                                                <p className="text-gray-500 text-lg">{description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}

                                <div className="flex justify-end mt-8">
                                    <button
                                        onClick={handleRoleSubmit}
                                        disabled={!selectedType}
                                        className={`
                                            px-12 py-3 rounded-xl font-semibold transition-all duration-300 text-xl cursor-pointer
                                            ${selectedType
                                                ? 'bg-white text-black hover:bg-gray-200'
                                                : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-4 mb-8">
                                <button
                                    onClick={() => setStep('role')}
                                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                                >
                                    <ArrowRight className="rotate-180 cursor-pointer" size={20} />
                                </button>
                                <div>
                                    <h1 className="text-white text-4xl font-bold">
                                        Create account
                                    </h1>
                                    <p className="text-gray-400 mt-2">
                                        as {selectedType && selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleDetailsSubmit} className="space-y-4">
                                <div>
                                    <input
                                        name='email'
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        name='name'
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                                    />
                                </div>
                                {selectedType != 'organization' &&
                                    <div>
                                        <input
                                            name='orgid'
                                            type="text"
                                            value={orgId}
                                            onChange={(e) => setOrgId(e.target.value)}
                                            placeholder="Organization Id"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                                        />
                                    </div>
                                }
                                <div>
                                    <div className="relative">
                                        <input
                                            name='password'
                                            ref={passwordRef}
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                                        />
                                        {
                                            passwordType === "password" ?
                                                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer hover:text-white transition-colors" onClick={showPassword} />
                                                :
                                                <Unlock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer hover:text-white transition-colors" onClick={showPassword} />
                                        }
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center group cursor-pointer font-medium"
                                >
                                    Create account
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="text-center mt-6">
                                    <p className="text-gray-400">
                                        Already have an account?{" "}
                                        <a
                                            href="/login"
                                            className="text-white hover:text-gray-200 transition-colors cursor-pointer font-medium"
                                        >
                                            Log in
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
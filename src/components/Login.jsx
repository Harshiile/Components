import { useRef, useState } from 'react';
import { ArrowRight, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [phone, setPhone] = useState("");
    const [passwordType, setPasswordType] = useState("password")
    const [password, setPassword] = useState("");
    const passwordRef = useRef()
    const showPassword = (e) => {
        e.preventDefault();
        passwordRef.current.type = passwordRef.current.type == "password" ? "text" : "password"
        setPasswordType(passwordRef.current.type)
    };

    const transitionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
    };

    const timetableImages = [
        {
            url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b',
            transform: 'rotate(15deg) translate(10%, 20%)',
        },
        {
            url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
            transform: 'rotate(-10deg) translate(-5%, 40%)',
        },
        {
            url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b',
            transform: 'rotate(5deg) translate(30%, -10%)',
        },
        {
            url: 'https://images.unsplash.com/photo-1495465798138-718f86d1a4bc',
            transform: 'rotate(-20deg) translate(15%, 0%)',
        },
        {
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
            transform: 'rotate(8deg) translate(-20%, 30%)',
        }
    ];
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(phone, password);
        window.location.href = '/aftersignup'
    }
    return (
        <div className="min-h-screen bg-black flex">
            <div
                className={`w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 xl:px-24 transition-all duration-500 ${!isLogin ? "order-2" : "order-1"}`}
            >
                <AnimatePresence mode="sync">
                    <motion.div
                        key={isLogin ? "login" : "signup"}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={transitionVariants}
                        className="max-w-md w-full mx-auto"
                    >
                        <h1 className="text-white text-4xl font-bold mb-2">
                            {isLogin ? "Welcome back" : "Join us"}
                        </h1>
                        <p className="text-gray-400 mb-8">
                            {isLogin ? "Sign in to continue" : "Sign up for free!"}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    name='phone'
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                                />
                            </div>

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
                                        passwordType == "password" ?
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
                                {isLogin ? "Sign in" : "Continue"}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {isLogin && (
                                <div className="text-center mt-4">
                                    <button className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                                        Forgot your password?
                                    </button>
                                </div>
                            )}

                            <div className="text-center mt-6">
                                <p className="text-gray-400">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-white hover:text-gray-200 transition-colors cursor-pointer font-medium"
                                    >
                                        {isLogin ? "Sign up" : "Log in"}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div
                className={`hidden lg:block w-1/2 bg-gradient-to-br from-white/5 via-white/3 to-transparent relative overflow-hidden transition-all duration-500 ${!isLogin ? "order-1" : "order-2"}`}
            >
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
        </div>
    );
}

export default Login;
import { motion } from "framer-motion";
import InputField from '../ui/input-field'
import Logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
// 🖥️ Main Login Screen
export default function LoginScreen() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState('')
  const handleLogin = (e) => {
    e.preventDefault();

    if (passcode === "dealer123" && email==='dealer@gmail.com') {
      localStorage.setItem("auth", "dealer");
      navigate("/dealer");
      toast.success("Dealer Login Successfully")
    } else {
      toast.error("Invalid passcode!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-[90%] max-w-sm"
      >
        <img src={Logo} alt="Company Logo" className="w-28 h-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Enter Passcode
        </h2>

        <form className="flex flex-col space-y-5 w-full" onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Passcode"
            type="password"
            placeholder="Enter your passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            showToggle
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            Login
          </button>
        </form>

        {/* Link below login */}
        <Link
          to="/home"
          className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
        >
          Continue as Retail Guest →
        </Link>
      </motion.div>
    </div>
  );
}
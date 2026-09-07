import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";
import { Images } from "../../assets/images/images.js";
import AuthHeroSlider from "./AuthHeroSlider.jsx";

const STUDENT_SLIDES = [
  {
    id: 1,
    title: "Learn",
    description: "Build your skills through structured courses and guided learning.",
    image: Images.studentLogin,
    alt: "Student Learning Illustration",
    bgColor: "#7E8DFB",
    imageWrapperClass: "right-0 bottom-0 w-full h-[75%] sm:h-[82%] flex items-end justify-end",
    imgClass: "max-h-full max-w-full object-contain object-bottom-right right-0 translate-x-2 md:translate-x-0"
  },
  {
    id: 2,
    title: "Practice",
    description: "Strengthen your skills with hands-on labs and coding exercises.",
    image: Images.studentLogin2,
    alt: "Student Practice Illustration",
    bgColor: "#FF9E8C",
    imageWrapperClass: "left-0 bottom-0 w-full h-[78%] sm:h-[85%] flex items-end justify-start",
    imgClass: "max-h-full max-w-full object-contain object-bottom-left left-0"
  },
  {
    id: 3,
    title: "Assess",
    description: "Complete your learning journey and earn your certificate.",
    image: Images.studentLogin3,
    alt: "Student Assess Illustration",
    bgColor: "#74B9FF",
    imageWrapperClass: "right-0 bottom-0 w-full h-[78%] sm:h-[85%] flex items-end justify-end",
    imgClass: "max-h-full max-w-full object-contain object-bottom-right right-0"
  },
  {
    id: 4,
    title: "Achieve",
    description: "Complete your learning journey and earn your certificate.",
    image: Images.studentLogin4,
    alt: "Student Achieve Illustration",
    bgColor: "#FFC56E",
    imageWrapperClass: "right-0 bottom-0 w-full h-[78%] sm:h-[85%] flex items-end justify-end",
    imgClass: "max-h-full max-w-full object-contain object-bottom-right right-0"
  }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-white font-sans overflow-hidden p-1.5 sm:p-2 box-border">
      {/* Left Form Section */}
      <div className="w-full md:w-[58%] lg:w-[60%] h-full flex flex-col justify-between py-4 px-3 sm:px-6 lg:px-8 xl:px-10 overflow-y-auto box-border">
        <div className="w-full max-w-[520px] mx-auto h-full flex flex-col justify-between">
          {/* Top Logo */}
          <div className="shrink-0 pt-2">
            <img
              src={Icons.logo}
              alt="BSOFT - Delivering Expertise"
              className="h-9 sm:h-10 object-contain"
            />
          </div>

          {/* Main Content Form */}
          <div className="w-full my-auto py-4">
            <div className="mb-6">
              <h1 className="text-[26px] sm:text-[30px] font-medium text-[#000000] mb-2 tracking-tight">
                Welcome back !
              </h1>
              <p className="text-[#737373] text-[15px] sm:text-[18px] font-normal sm:whitespace-nowrap">
                Login to continue your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[16px] font-normal text-[#000000] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-[#000000] placeholder:text-[#737373] text-[16px] font-normal focus:outline-none focus:border-[#9BD94A] focus:ring-1 focus:ring-[#9BD94A] transition-all bg-white"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[16px] font-normal text-[#000000] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 text-[#000000] placeholder:text-[#737373] text-[16px] font-normal focus:outline-none focus:border-[#9BD94A] focus:ring-1 focus:ring-[#9BD94A] transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <img
                      src={showPassword ? Icons.eyeOff : Icons.eye}
                      alt="Toggle password"
                      className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <Link
                    to="/forgot-password"
                    className="text-[14px] font-medium text-[#0D99FF] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-[#9BD94A] hover:bg-[#8EC63F] text-white font-medium text-sm sm:text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.99]"
                >
                  <span>Login</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Footer Faculty Link */}
          <div className="shrink-0 text-[16px] font-normal text-[#737373] pb-8 sm:pb-10">
            Are you faculty?{" "}
            <Link
              to="/faculty-login"
              className="text-[#9BD94A] font-medium hover:underline ml-1"
            >
              Faculty Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Hero / Illustration Section */}
      <div className="hidden md:flex md:w-[42%] lg:w-[40%] h-full">
        <AuthHeroSlider slides={STUDENT_SLIDES} autoPlayInterval={4000} />
      </div>
    </div>
  );
};

export default LoginPage;

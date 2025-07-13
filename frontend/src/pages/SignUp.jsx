import React, { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import bg from "../assets/authBg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { userDataContext } from "../context/userContext.jsx";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl ,userData,setUserData} = useContext(userDataContext);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
      try {
        setErr("");
        e.preventDefault();
        let result =await axios.post(`${serverUrl}/api/auth/signup`, {
          name,
          email,
          password
        },{withCredentials: true});
        console.log(result);
        setUserData(result.data.user);
        setLoading(false);
        navigate("/customize");

      } catch (error) {
        console.log(error);
        setLoading(false);
        setUserData(null);
        setErr(error.response.data.message);
      }
  } 

  return (
    <div
      className="w-full h-[100vh] bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form onSubmit={handleSignUp} className="w-[90%] h-[600px] max-w-[500px] px-[20px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] ">
        <h1 className="text-white text-[30px] font-semibold mb-30px">
          Register to <span className="text-blue-400">Virtual Assistant</span>{" "}
        </h1>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter your name"
          className="w-full h-[60px] outline-none border-2 border-white-400 bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
          className="w-full h-[60px] outline-none border-2 border-white-400 bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        />

        <div className="w-full h-[60px]  border-white-400 bg-transparent text-white rounded-full text-[18px] relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full h-[60px] rounded-full outline-none border-2 border-white-400 bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]"
          />
          {!showPassword && (
            <IoEye
              onClick={() => setShowPassword(true)}
              className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] "
            />
          )}
          {showPassword && (
            <IoMdEyeOff
              onClick={() => setShowPassword(false)}
              className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] "
            />
          )}
        </div>
        {err.length > 0 && <p className="text-red-500 text-[18px]"> *{err}</p>}

        <button className="min-w-[150px] mt-[30px] h-[60px] bg-white text-[19px] text-black font-semibold rounded-full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-white text-[18px]">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")} className="text-blue-400">
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

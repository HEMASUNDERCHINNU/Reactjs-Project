import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import Loader from "../../components/loader/Loader";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import emailjs from "emailjs-com";

const Login = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const sendOtpEmail = async (email) => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    const templateParams = {
      to_email: email,
      otp: newOtp,
    };

    try {
      await emailjs.send(
        "service_anq99yh",
        "template_bjpfpgg",
        templateParams,
        "JWv3uHsn13g2Wax5h"
      );
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send OTP, please try again");
    }
  };

  const handleSendOtpClick = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All fields are required");
      return;
    }
    await sendOtpEmail(userLogin.email);
  };

  const verifyOtpAndLogin = async () => {
    const enteredOtp = otpDigits.join("");
    if (enteredOtp === "") {
      toast.error("Please enter OTP");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      toast.error("Invalid OTP");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users?.user?.uid)
      );
      const querySnapshot = await getDocs(q);

      let user = null;
      querySnapshot.forEach((doc) => (user = doc.data()));

      if (user) {
        localStorage.setItem("users", JSON.stringify(user));
        toast.success("Login Successfully");
        navigate(user.role === "admin" ? "/admin-dashboard" : "/");
      } else {
        toast.error("User data not found!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectLogin = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users?.user?.uid)
      );
      const querySnapshot = await getDocs(q);

      let user = null;
      querySnapshot.forEach((doc) => (user = doc.data()));

      if (user) {
        localStorage.setItem("users", JSON.stringify(user));
        toast.success("Login Successfully");
        navigate(user.role === "admin" ? "/admin-dashboard" : "/");
      } else {
        toast.error("User data not found!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      let existingUser = null;
      querySnapshot.forEach((doc) => (existingUser = doc.data()));

      if (!existingUser) {
        const newUser = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
        };
        await setDoc(doc(fireDB, "user", user.uid), newUser);
        localStorage.setItem("users", JSON.stringify(newUser));
      } else {
        localStorage.setItem("users", JSON.stringify(existingUser));
      }

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}

      <div className="login_Form bg-neutral-100 px-8 py-6 border border-slate-200 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-blue-950">LOGIN</h2>
        </div>

        {!otpSent && (
          <>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email Address"
                value={userLogin.email}
                onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                className="bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md placeholder-slate-400"
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                placeholder="Password"
                value={userLogin.password}
                onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                className="bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md placeholder-slate-400"
              />
            </div>
            <div className="mb-3">
              <button
                onClick={handleDirectLogin}
                className="bg-slate-800 hover:bg-slate-700 w-full text-white text-center py-2 font-bold rounded-md"
              >
                Login
              </button>
            </div>
            <div className="mb-3 text-center font-semibold text-gray-500">OR</div>
            <div className="mb-5">
              <button
                onClick={handleSendOtpClick}
                className="bg-slate-800 hover:bg-slate-700 w-full text-white text-center py-2 font-bold rounded-md"
              >
                Send OTP
              </button>
            </div>
          </>
        )}

        {otpSent && (
          <>
            <div className="flex justify-between gap-2 mb-5">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={digit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d?$/.test(value)) {
                      const newDigits = [...otpDigits];
                      newDigits[index] = value;
                      setOtpDigits(newDigits);
                      if (value && index < 5) {
                        document.getElementById(`otp-${index + 1}`)?.focus();
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
                      document.getElementById(`otp-${index - 1}`)?.focus();
                    }
                  }}
                  id={`otp-${index}`}
                />
              ))}
            </div>
            <div className="mb-5">
              <button
                onClick={verifyOtpAndLogin}
                className="bg-slate-800 hover:bg-slate-700 w-full text-white text-center py-2 font-bold rounded-md"
              >
                Verify OTP & Login
              </button>
            </div>
          </>
        )}

        <div className="mb-5 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border border-slate-300 hover:bg-stone-300 w-full text-black text-center py-2 font-bold rounded-md"
          >
            <FcGoogle className="text-xl" /> Login with Google
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account? {" "}
            <Link className="text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;

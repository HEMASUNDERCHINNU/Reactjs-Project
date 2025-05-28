import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const { loading, setLoading } = useContext(myContext);
    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        const { name, email, password, role } = userSignup;

        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name,
                email: users.user.email,
                uid: users.user.uid,
                role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            };

            await addDoc(collection(fireDB, "user"), user);

            setUserSignup({ name: "", email: "", password: "", role: "user" });
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.message);
            toast.error("Signup Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}

            <div className="login_Form bg-neutral-100 px-8 py-6 border border-slate-200 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-blue-950 '>SIGNUP</h2>
                </div>

                <div className="flex flex-col w-full gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md  placeholder-slate-400'
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md  placeholder-slate-400'
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={userSignup.password}
                        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md  placeholder-slate-400'
                    />

                    <button
                        type="button"
                        onClick={userSignupFunction}
                        className='bg-slate-800 hover:bg-slate-700 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <h2 className="text-black">
                    Have an account? <Link className="text-pink-500 font-bold" to="/login">Login</Link>
                </h2>
            </div>
        </div>
    );
};

export default Signup;


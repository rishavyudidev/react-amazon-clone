import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import ArrowRightsIcon from "@mui/icons-material/ArrowRight"
import { darkLogo } from "../assets/index"
import {motion} from "framer-motion"
import {RotatingLines} from "react-loader-spinner";

const Registration = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");

    //Error message start
    const [errclientName, setErrclientName] = useState("");
    const [erremail, setErrEmail] = useState("");
    const [errpassword, setErrPassword] = useState("");
    const [errcpassword, setErrcPassword] = useState("");

    // loading message
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // Handle function start
    const handleName = (e) => {
        setClientName(e.target.value);
        setErrclientName("");
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    }

    const handleCPassword = (e) => {
        setCpassword(e.target.value);
        setErrcPassword("");
    }

    // Email validation 
    const emailValidation = (email)=>{
        return String(email)
            .toLowerCase()
            .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    }

    // Submit button start
    const handleRegistration = (e) => {
        e.preventDefault()
        if (!clientName) {
            setErrclientName("Enter your name")
        }
        if (!email) {
            setErrEmail("Enter your email");
            setFirebaseErr("");
        }else{
            if(!emailValidation(email)){
                setErrEmail("Enter a valid email")
            }
        }
        if (!password) {
            setErrPassword("Enter your password");
        } else {
            if (password.length < 6) {
                setErrPassword("Password must be at least 6 characters")
            }
        }
        if (!cpassword) {
            setErrcPassword("Confirm your password");
        } else {
            if (cpassword !== password) {
                setErrcPassword("Password not matched")
            }
        }
        if(clientName && email && emailValidation(email) && password && password.length>=6
        && cpassword && cpassword === password){
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential)=>{
                    updateProfile(auth.currentUser,{
                        displayName: clientName
                    });
                    const user = userCredential.user;
                    setLoading(false);
                    setSuccessMsg("Accout Created Sucessfully!");
                    setTimeout(()=>{
                        navigate("/sigin")
                    },3000)
                    
                })
                .catch((error)=>{
                    const errorCode = error.code;
                    if(errorCode.includes("auth/email-already-in-use")){
                        setFirebaseErr("Email Already in use, Try another one");
                    }
                });
            setClientName("")
            setEmail("")
            setPassword("")
            setCpassword("")
            setFirebaseErr("")
        }

    }
    return (
        <div className='w-full'>
            <div className='w-full bg-gray-100 pb-10'>
                <form className='w-[370px] mx-auto flex flex-col items-center'>
                    <img className='w-32' src={darkLogo} alt="darkLogo" />
                    <div className='w-full border border-zinc-200 p-6'>
                        <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Your name</p>
                                <input
                                    onChange={handleName}
                                    value={clientName}
                                    type='text'
                                    className='w-full py-1 border border-zinc-400 px-2
                                text-base rounded-sm outline-none focus-within:border-[#e77600]
                                focus-within:shadow-amazonInput duration-100'
                                />
                                {errclientName && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex
                                    items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>{" "}
                                        {errclientName}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Email or mobile nu</p>
                                <input onChange={handleEmail}
                                    value={email}
                                    type='email'
                                    className='w-full py-1 border border-zinc-400 px-2
                                text-base rounded-sm outline-none focus-within:border-[#e77600]
                                focus-within:shadow-amazonInput duration-100'
                                />
                                {erremail && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex
                                    items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>{" "}
                                        {erremail}
                                    </p>
                                )}
                                {firebaseErr && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex
                                    items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>{" "}
                                        {firebaseErr}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Password</p>
                                <input onChange={handlePassword}
                                    type='password'
                                    value={password}
                                    className='w-full py-1 border border-zinc-400 px-2
                                text-base rounded-sm outline-none focus-within:border-[#e77600]
                                focus-within:shadow-amazonInput duration-100'
                                />
                                {errpassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex
                                    items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>{" "}
                                        {errpassword}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Re-enter Password</p>
                                <input onChange={handleCPassword}
                                    value={cpassword}
                                    type='password'
                                    className='w-full py-1 border border-zinc-400 px-2
                                text-base rounded-sm outline-none focus-within:border-[#e77600]
                                focus-within:shadow-amazonInput duration-100'
                                />
                                {errcpassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex
                                    items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span>{" "}
                                        {errcpassword}
                                    </p>
                                )}
                                <p className='text-xs text-gray-600'>Password must be at least 6
                                    characters.</p>
                            </div>
                            <button onClick={handleRegistration} className='w-full py-1.5 text-sm
                              font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b]
                              hover:bg-gradient-t-b border border-zinc-400 active:border-yellow-800
                              active:shadow-amazonInput
                            '>Continue</button>
                            {loading && (
                                <div className='flex justify-center'>
                                <RotatingLines
                                  strokeColor="#febd69"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="50"
                                  visible={true}
                                />
                                </div>
                            )}
                            {
                                successMsg && (
                                    <div>
                                        <motion.p
                                        initial={{y:10, opacity: 0}}
                                        animate={{y:0, opacity: 1}}
                                        transition={{duration: 0.5}}
                                        className="text-base font-titleFont font-semibold text-green-500 border-[1px]
                                        border-green-500 px-2 text-center"
                                        >{successMsg}</motion.p>
                                    </div>
                                )
                            }
                            <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to
                                Amazon's <span className='text-blue-600'>Conditions of Use{" "}</span>and
                                <span className='text-blue-600'>Private Notice.</span></p>
                        </div>
                        <p className='text-xs text-black'>
                            Already have an account?{" "}
                            <Link to='/sigin'>
                                <span className='text-xs text-blue-600 hover:text-orange-600
                        hover:underline underline-offset-1 cursor-pointer duration-100'>
                                    Sign in{" "}
                                    <span><ArrowRightsIcon /></span>
                                </span>
                            </Link>
                        </p>
                        <p className='text-xs text-black -mt-2'>
                            Buying for work?{" "}
                            <span className='text-xs text-blue-600 hover:text-orange-600
                        hover:underline underline-offset-1 cursor-pointer duration-100'>
                                Create a free business account
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex
      flex-col gap-4 justify-center items-center py-10'>
                <div className='flex items-center gap-6'>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline
          underline-offset-1 cursor-pointer duration-100'>Contitions of Use</p>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline
          underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline
          underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
                </div>
                <p className='text-xs text-gray-600'>@ 1996-2023, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
    )
}

export default Registration
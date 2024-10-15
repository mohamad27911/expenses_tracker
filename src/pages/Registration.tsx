'use client'

import { useState } from "react"
import Container from '@mui/material/Container'
import { motion } from "framer-motion"
import "../index.css"
import Up from "../Components/auth/Up"
import In from "../Components/auth/In"

export default function Registration() {
    const [isSignIn, setIsSignIn] = useState<boolean>(false)

    const handleLoginClick = () => setIsSignIn(true)
    const handleRegisterClick = () => setIsSignIn(false)

    return (
        <Container maxWidth="xl">
            <div className='flex items-center justify-center min-h-screen py-5 sm:py-10 md:py-20 lg:py-40'>
                <div className='flex flex-col lg:flex-row w-full sm:w-11/12 md:w-10/12 lg:w-8/12 rounded-3xl mx-auto text-white overflow-hidden'>
                    <div className='w-full flex items-center justify-center p-2 sm:p-4'>
                        <div className='pb-10 sm:pb-20 px-2 sm:px-4 pt-5 sm:pt-10 mb-2 sm:mb-4 w-full max-w-xs sm:max-w-sm'>
                            <div className="w-full mb-6 relative">
                                <div className="absolute inset-0 bg-secondary rounded-full blur-md opacity-60"></div>
                                <div className="relative bg-secondary bg-opacity-60 rounded-full p-1 flex">
                                    <motion.div 
                                        className="absolute top-1 bottom-1 rounded-full bg-text-light"
                                        initial={{ width: '50%', left: '50%' }}
                                        animate={{
                                            width: '50%',
                                            left: isSignIn ? '0%' : '50%',
                                        }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                    <button
                                        onClick={handleLoginClick}
                                        className={`flex-1 py-2 px-4 rounded-full text-white text-sm font-medium z-10 transition-colors duration-200 ${
                                            isSignIn ? 'text-text' : 'text-text hover:text-white'
                                        }`}
                                    >
                                        LogIn
                                    </button>
                                    <button
                                        onClick={handleRegisterClick}
                                        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium z-10 transition-colors duration-200 ${
                                            !isSignIn ? 'text-text' : 'text-text hover:text-white'
                                        }`}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                            <motion.div
                                key={isSignIn ? "signin" : "register"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isSignIn ? <In /> : <Up />}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
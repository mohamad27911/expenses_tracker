import { useState } from "react"
// import signIn from "../../assets/signIn.jpeg"
// import signUp from "../../assets/signup.jpg"

import Container from '@mui/material/Container';
import "../index.css"
import Up from "../Components/auth/Up";
import In from "../Components/auth/In";


function Registration() {
    const [isSignIn, setIsSignIn] = useState<boolean>(false);

    const handleLoginClick = () => {
        setIsSignIn(true);
    }

    const handleRegisterClick = () => {
        setIsSignIn(false);
    }

    return (
        <Container maxWidth="xl">
            <div
                className='flex items-center justify-center min-h-screen py-10 sm:py-40 '>
                <div className=' flex flex-col lg:flex-row w-10/12 lg:w-8/12 rounded-3xl mx-auto text-white overflow-hidden'>
                
                    

                    {/* Form Container */}
                    <div className='w-full  flex items-center justify-center p-4 '>
                        <div className='pb-20 px-8 pt-10 mb-4 w-full max-w-sm'>
                            <div className="font-bold mb-4 flex bg-secondary p-2 text-primary bg-opacity-60 justify-between rounded-full w-fit m-auto gap-4">
                                <div
                                    onClick={handleLoginClick}
                                    className={`text-text px-8 py-2 rounded-full cursor-pointer ${!isSignIn ? 'bg-opacity-60' : 'bg-text-light text-text'}`}
                                >
                                    LogIn
                                </div>
                                <div
                                    onClick={handleRegisterClick}
                                    className={`text-text  px-8 py-2 rounded-full cursor-pointer ${isSignIn ? 'bg-opacity-60' : 'bg-text-light text-text'} `}
                                >
                                    Register
                                </div>
                            </div>
                            {isSignIn ? <In />
                                : <Up />}


                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Registration

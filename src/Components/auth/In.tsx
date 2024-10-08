import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

const In: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in successfully');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <>
            <p className='pb-5 text-center'>
                Welcome back! Please enter your email and password to access your account.
            </p>
            <form onSubmit={handleSignIn}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className='rounded-3xl shadow appearance-none border w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4 relative'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded-3xl w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        name='password'
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleTogglePasswordVisibility}
                        className="absolute inset-y-0 right-3 flex items-center -bottom-8"
                    >
                        <FontAwesomeIcon icon={!isPasswordVisible ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    className='text-text px-8 py-2 rounded-full bg-background font-bold float-end hover:bg-text-light transition duration-300'
                    type='submit'
                >
                    Sign In
                </button>
            </form>
        </>
    );
};

export default In;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

const In: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/home');
            } else {
                navigate('/');
            }
        });

        const setAuthPersistence = async () => {
            await setPersistence(auth, browserLocalPersistence);
        };
        setAuthPersistence();

        return () => unsubscribe();
    }, [navigate]);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in successfully');
            setEmail(''); // Clear email input
            setPassword(''); // Clear password input
            navigate('/home'); // Redirect after successful sign-in
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError('Failed to sign in. Please check your credentials.');
            }
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
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
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
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
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
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                        <FontAwesomeIcon icon={!isPasswordVisible ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    className='text-text px-8 py-2 rounded-full bg-text-light font-bold float-end hover:bg-orange-600 transition duration-300'
                    type='submit'
                >
                    Sign In
                </button>
            </form>
        </>
    );
};

export default In;

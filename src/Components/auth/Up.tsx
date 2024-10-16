import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../config/firebase.ts";
import { createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Up: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        // Ensure persistence across refreshes
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        navigate('/home'); // Redirect to home if user is already signed in
                    }
                });
            })
            .catch((error) => {
                console.error('Error setting persistence:', error);
            });
    }, [navigate]);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registered successfully');
            navigate('/home'); // Redirect after successful sign-up
        } catch (err) {
            setError('Failed to register. Please try again.');
            console.error(err);
        }
    };

    return (
        <>
            <p className='pb-5 text-center'>
                Create a new account by filling out the details below.
            </p>
            <form onSubmit={handleSignUp}>
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
                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className='rounded-3xl shadow appearance-none border w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='username'
                        name='username'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    >
                        <FontAwesomeIcon icon={!isPasswordVisible ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    className='text-text px-8 py-2 rounded-full bg-text-light font-bold float-end hover:bg-orange-600 transition duration-300'
                    type='submit'
                >
                    Register
                </button>
            </form>
        </>
    );
};

export default Up;

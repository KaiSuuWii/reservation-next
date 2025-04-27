'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState({
        email: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormSubmitted(true);
        setErrorMessage("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email');

        // Validate inputs
        const newErrors = {
            email: !email,
        };

        setErrors(newErrors);

        // If there are errors, don't submit
        if (newErrors.email) {
            return;
        }

        // Start transition for the loading state
        startTransition(async () => {
            
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                router.push('/verify');
                return;
            }

            else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Login failed. Please try again.");
                return;
            }
            
        });
    }

    return (
        <div className="flex items-center justify-center h-full px-4 py-12 bg-gray-50">
            <div className="flex w-full max-w-5xl shadow-xl rounded-lg overflow-hidden h-150">

                {/* Right side - Login form */}
                <div className="w-full bg-white p-15">
                    <h1 className="mb-3 text-4xl text-[#283971] font-bold">
                        Login
                    </h1>

                    <p className="mb-6 font-semibold">Welcome to Xavier University's Online Reservation System!</p>

                    {errorMessage && (
                        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <label className="block font-semibold">Email</label>
                        <input
                            name="email"
                            placeholder="your.email@xu.edu.ph"
                            className={`w-full p-4 border-2 ${errors.email && formSubmitted ? 'border-red-500' : 'border-gray-400'} rounded-lg`}
                            onChange={() => setErrors(prev => ({ ...prev, email: false }))}
                        />
                        {errors.email && formSubmitted && (
                            <p className="text-red-500 text-sm mt-1">Email is required</p>
                        )}

                        <button
                            type="submit"
                            className="w-full text-white font-bold rounded-lg bg-[#283971] hover:bg-[#1e2c5a] mt-10 h-16 hover:cursor-pointer flex items-center justify-center"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : 'Login'}
                        </button>
                    </form>
                </div>

                {/* Left side - Image or branding */}
                <div className="bg-[#283971] w-4/5 relative overflow-hidden">
                    <img
                        src="/carousel.png"
                        alt="carousel"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </div>
            </div>
        </div>
    );
}
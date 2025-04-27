"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type VerificationState = "default" | "loading" | "invalid" | "verified";

export default function Verify({ email }: { email: string }) {
    let mainText: string;
    let subText: string;
    let buttonText: string;
    let showBackButton = true;

    const [verificationState, setVerificationState] = React.useState<VerificationState>("default");
    const searchParams = useSearchParams();
    const router = useRouter();
    

    useEffect(() => { 
        
        const verifyToken = async () => {
            const token = searchParams.get("token") || "";
            if (!token) {
                setVerificationState("default");
                return;
            }
    
            const response = await fetch(`/api/verify?token=${token}`, {
                method: "POST",
            });
    
            if (response.ok) {
                setVerificationState("verified");
                setTimeout(() => {
                    router.push("/dashboard"); 
                }, 1000);    
            } 
            else {
                setVerificationState("invalid");
            }
        };

        verifyToken();
    
    }, []); 


    switch (verificationState) {
        case "loading":
            mainText = "Verifying Email...";
            subText = "Please wait while we verify your email address.";
            buttonText = "Processing...";
            showBackButton = false; // Disable back button during loading
            break;
        case "invalid":
            mainText = "Verification Failed";
            subText = "The verification link is invalid or has expired. Please request a new verification email.";
            buttonText = "Back to Home";
            break;
        case "verified":
            mainText = "Email Verified!";
            subText = "Your account has been successfully verified!";
            buttonText = "Go to Home";
            break;
        default:
            mainText = "OTP Verification";
            subText = `An OTP has been sent to ${email} for verification. Kindly follow the instructions from there.`;
            buttonText = "Back to Home";
            break;
    }

    return (
        <div className="flex items-center justify-center h-full px-4 py-12 bg-gray-50">
            <div className="flex w-full max-w-5xl shadow-xl rounded-lg overflow-hidden h-150">

                {/* Right side - Verification message */}
                <div className="w-full bg-white p-10 flex flex-col justify-center"> {/* Changed p-15 to standard p-10 */}
                    <h1
                        className={`mb-3 text-4xl font-bold text-[#283971] ${verificationState === "verified" ? "text-green-500" : ""} 
                        ${verificationState === "invalid" ? "text-red-500" : ""}`}
                    >
                        {mainText}
                    </h1>
                    <p className="mb-6 font-semibold">{subText}</p>

                    {showBackButton && (
                        <Link href="/login">
                            <button
                                className={`bg-[#283971] text-white px-4 py-4 rounded-lg mt-4 font-semibold hover:cursor-pointer 
                                hover:bg-[#1e2c5a] focus:outline-none focus:ring-2 focus:ring-[#283971] focus:ring-offset-1 
                                ${verificationState === "loading" ? "cursor-not-allowed opacity-70" : ""}`}
                                disabled={verificationState === "loading"}
                            >
                                {buttonText}
                            </button>
                        </Link>
                    )}
                </div>

                {/* Left side - Image or branding */}
                <div className="bg-[#283971] w-4/5 relative overflow-hidden flex items-center justify-center">
                    {verificationState === "verified" ? (
                        <svg
                            className="w-24 h-24 text-white animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    ) : verificationState === "invalid" ? (
                        <svg
                            className="w-24 h-24 text-white animate-shake"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : verificationState === "loading" ? (
                        <svg
                            className="animate-spin h-24 w-24 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        <img
                            src="/carousel.png"
                            alt="carousel"
                            className="w-full h-full object-cover absolute inset-0 opacity-75"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
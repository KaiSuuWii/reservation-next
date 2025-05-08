import { useState } from 'react';
import Link from 'next/link';

export default function VenueCards() {
    return (
        <div className="flex flex-col items-center justify-center space-y-20 p-20">
            <img src="/logo.png" alt="logo" className="w-60" />

            <div className="flex gap-6">
                <div className="p-3 bg-[#cccccc] rounded-lg w-60 h-70">
                    <div className="w-full h-50 bg-white rounded-lg shadow-2xs overflow-hidden">
                        <img
                            src="/coverd_court.jpg"
                            alt="Covered Court"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-white text-xl ml-5 mt-2">Covered Court</p>
                </div>

                <div className="p-3 bg-[#cccccc] rounded-lg w-60 h-70">
                    <div className="w-full h-50 bg-white rounded-lg shadow-2xs overflow-hidden">
                        <img
                            src="/gym.jpg"
                            alt="Gymnasium"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-white text-xl ml-5 mt-2">Gymnasium</p>
                </div>

                <div className="p-3 bg-[#cccccc] rounded-lg w-60 h-70">
                    <div className="w-full h-50 bg-white rounded-lg shadow-2xs overflow-hidden">
                        <img
                            src="/soccerfield.jpg"
                            alt="Soccer Field"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-white text-xl ml-5 mt-2">Soccer Field</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 font-semibold">
                <p>Want to reserve a venue for you event? Login now!</p>
                <Link href="/login">
                    <button type="submit" className="w-100 h-15 text-md bg-[#283971] rounded-2xl text-white font-bold hover:cursor-pointer hover:bg-[#1e2c5a] px-6 py-2">Login</button>
                </Link>
            </div>
        </div>
    );
}
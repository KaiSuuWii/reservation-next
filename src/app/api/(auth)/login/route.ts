

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encodeToken } from "@/lib/token";
import { decodeToken } from "@/lib/token";
import { connectDatabase } from "@/lib/database";
import Account from "@/models/accounts";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {

    try {
        
        // TODO: check if valid XU email 
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const db = await connectDatabase();

        if (!db) {
            return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
        }

        let account = await Account.findOne({ email });

        if (!account) {
            account = await Account.create({ email });

            if (!account) {
                return NextResponse.json({ message: "Failed to create account" }, { status: 500 });
            }
        }

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const verifyToken = await encodeToken({ 
            secret: process.env.VERIFY_SECRET || "", 
            payload: { email }, 
            expiry: "10m" 
        });

        const paramToken = await encodeToken({
            secret: process.env.PARAM_SECRET || "", 
            payload: { email }, 
            expiry: "10m" 
        });

        const from = process.env.EMAIL_USER;
        const to = email;
        const subject = "XU Reservation Management - Login Verification";
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${paramToken}`;
        const message = `Hello, please verify your email by clicking on the link below (valid for 10 minutes):\n\n ${url}`;
        const transport = await transporter.sendMail({ from, to, subject, text: message }) as nodemailer.SentMessageInfo;

        if (!transport) {
            return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
        }

        const cookieStore = await cookies();
        cookieStore.set("verify_token", verifyToken, {
            httpOnly: true,
            maxAge: 60 * 10, // 10 minutes
        }); 

        return NextResponse.json({ message: "Verification email sent" }, { status: 200 });
    }

    catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }   
}
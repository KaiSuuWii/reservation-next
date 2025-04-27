import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeToken } from "@/lib/token";
import { encodeToken } from "@/lib/token";
import { connectDatabase } from "@/lib/database";
import Account from "@/models/accounts";

export async function POST(request: NextRequest) {

    const cookieStore = await cookies();
    const verifyToken = cookieStore.get('verify_token')?.value;
    const paramToken = await request.nextUrl.searchParams.get('token');
    
    try {
        const paramPayload = await decodeToken({
            token: paramToken || "",
            secret: process.env.PARAM_SECRET || "",
        });

        const verifyPayload = await decodeToken({
            token: verifyToken || "",
            secret: process.env.VERIFY_SECRET || "",
        });

        
        if (paramPayload !== null && verifyPayload !== null) {
            try {
                
                if (paramPayload.email === verifyPayload.email) {

                    const db = await connectDatabase();

                    if (!db) {
                        return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
                    }

                    const account = await Account.findOneAndUpdate(
                        { email: paramPayload.email },
                        { $set: { is_verified: true } },
                        { new: true }
                    );
                    
                    if (!account) {
                        return NextResponse.json({ message: "Account not found" }, { status: 404 });
                    }

                    const accessToken = await encodeToken({
                        payload: {
                            email: account.email,
                            role: account.role,
                            refreshed: false
                        }, 
                        secret: process.env.ACCESS_SECRET || "",
                        expiry: '15sec'
                    });

                    const refreshToken = await encodeToken({
                        payload: {
                            email: account.email,
                        },
                        secret: process.env.REFRESH_SECRET || "",
                        expiry: '1day'
                    });

                    cookieStore.set('access_token', accessToken, {
                        httpOnly: true,
                    });

                    cookieStore.set('refresh_token', refreshToken, {
                        httpOnly: true,
                    });

                    cookieStore.delete('verify_token');
                    
                    return NextResponse.json({ message: "Login successful" }, { status: 200 });
                }
                else {
                    return NextResponse.json({ message: "Token signature mismatch" }, { status: 400 });
                }
            } 
            
            catch (error) {
                console.error("Error during verification:", error);
                return NextResponse.json({ message: "Invalid token" }, { status: 400 });
            }
        }
    }
    catch (error) {
        console.error("Error while decrypting token:", error);
        return NextResponse.json({ message: "Token signature mismatch" }, { status: 500 });
    }

}


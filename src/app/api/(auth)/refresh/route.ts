import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/database";
import { encodeToken, decodeToken } from "@/lib/token";
import Account from "@/models/accounts";

/**
 * Refreshes an expired access token using the refresh token
 */
export async function refreshAccessToken(request: NextRequest) {
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
        return NextResponse.json(
            { message: "Refresh token not found" }, 
            { status: 401 }
        );
    }

    try {
        // Verify the refresh token is valid
        const refreshPayload = await decodeToken({
            token: refreshToken as string,
            secret: process.env.REFRESH_SECRET as string
        });

        // Connect to database
        const db = await connectDatabase();

        if (!db) {
            return NextResponse.json(
                { message: "Database connection failed" }, 
                { status: 500 }
            );
        }

        // Find the account associated with the token
        const account = await Account.findOne({ email: refreshPayload?.email });

        if (!account) {
            return NextResponse.json(
                { message: "Account not found" }, 
                { status: 404 }
            );
        }

        // Create a new access token
        const payload = {
            email: account.email,
            role: account.role,
        };

        const accessToken = await encodeToken({
            payload: payload,
            secret: process.env.ACCESS_SECRET || "",
            expiry: '15s'
        });

        // Return success response with the new access token
        const response = NextResponse.json(
            { message: "Token refreshed successfully", payload: payload }, 
            { status: 200 }
        );
        
        response.cookies.set('access_token', accessToken, {
            httpOnly: true,
        });
        
        return response;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.json(
            { message: "Token refresh failed" }, 
            { status: 500 }
        );
    }
}


// this is where you refresh the access token
export async function POST(request: NextRequest) {

    return await refreshAccessToken(request);

}
import { NextRequest, NextResponse } from 'next/server';
import { decodeToken } from '@/lib/token';
import { JWTPayload } from 'jose';

/**
 * Authorization middleware for protecting routes
 */
export async function useAuth(
    request: NextRequest, 
    callback: (payload: JWTPayload) => Promise<NextResponse>
) {
    const accessToken = request.cookies.get('access_token')?.value;

    // Case 1: No access token - generate a new one
    if (!accessToken) {
        return NextResponse.json(
            { message: "No access token" }, 
            { status: 401 }
        );
    } 
    
    // Case 2: Access token exists - validate it
    else if (accessToken) {
        try {
            const payload = await decodeToken({
                token: accessToken as string,
                secret: process.env.ACCESS_SECRET as string
            });
            return await callback(payload);   
        }
        catch (error) {
            return NextResponse.json(
                { message: "Invalid access token" }, 
                { status: 401 }
            );
        }   
    }

    // Fallback for unexpected scenarios
    return NextResponse.json(
        { message: "Unexpected error in authentication middleware" }, 
        { status: 500 }
    );
}
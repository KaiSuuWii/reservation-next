import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeToken } from "@/lib/token";


export async function getAccessPayload(request: NextRequest) {

    const accessToken = request.cookies.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ message: "Access token not found" }, { status: 401 });
    }

    try {
        const payload = await decodeToken({
            token: accessToken,
            secret: process.env.ACCESS_SECRET as string
        });

        if (!payload) {
            return NextResponse.json({ message: "Invalid access token" }, { status: 401 });
        }

        return NextResponse.json({ message: "Access token is valid", payload }, { status: 200 });
    } 
    
    catch (error) {
        return NextResponse.json({ message: "Invalid access token" }, { status: 401 });
    }
}

export async function GET(request: NextRequest) {

    return await getAccessPayload(request);
    
}
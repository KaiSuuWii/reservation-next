
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {

    const cookieStore  = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const verifyToken  = cookieStore.get("verify_token")?.value;

    let response = NextResponse.next();


    // login
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (refreshToken) {
            response = NextResponse.redirect(new URL('/dashboard', request.url));
        }
        else if (verifyToken) {
            response = NextResponse.redirect(new URL('/verify', request.url));
        }
    }

    // verify
    else if (request.nextUrl.pathname.startsWith('/verify')) {
        if (refreshToken) {
            response = NextResponse.redirect(new URL('/dashboard', request.url));
        }
        else if (!verifyToken) {
            response = NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // dashboard
    else if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (verifyToken) {
            response = NextResponse.redirect(new URL('/verify', request.url));
        }
        else if (!refreshToken) {
            response = NextResponse.redirect(new URL('/login', request.url));
        }
    }
        
    return response;
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
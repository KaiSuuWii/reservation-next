import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function revokeRefreshToken(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    // TODO: use redis to blacklist the refresh token, then delete it from the cookies

    const response = NextResponse.json({ message: "Tokens revoked successfully" }, { status: 200 });
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("verify_token"); // cleanup

    return response;
}


export async function DELETE(request: NextRequest) {

    return await revokeRefreshToken(request);

}
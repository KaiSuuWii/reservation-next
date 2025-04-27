
import { cookies } from "next/headers";
import { decodeToken } from "@/lib/token";
import Verify from "./verify";

export default async function VerifyLayout() {

    const cookieStore = await cookies();
    const verifyToken = cookieStore.get("verify_token")?.value;
    
    const verifyPayload = await decodeToken({
        token: verifyToken as string, 
        secret: process.env.VERIFY_SECRET || ""
    });
    return <Verify email={verifyPayload?.email as string || "your email"} />;

}

import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "../../pipe";
import { connectDatabase } from "@/lib/database";
import Account from "@/models/accounts";


export async function PUT(request: NextRequest) {

    return await useAuth(request, async (payload) => {
        const { email } = payload;
    
        const body = await request.json();
        const { role } = body;
    
        // TODO: validate the role

        const db = await connectDatabase();
        
        if (!db) {
            return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
        }

        const response = await Account.updateOne(
            { email },
            { $set: { role } }
        );

        if (!response) {
            return NextResponse.json({ message: "Account not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Roles updated successfully" }, { status: 200 });
    });
}
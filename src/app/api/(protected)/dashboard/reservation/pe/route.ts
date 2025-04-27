import { connectDatabase } from "@/lib/database";
import Reservation from "@/models/reservations";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        await connectDatabase();


        if (id) {
            const reservation = await Reservation.findById(mongoose.Types.ObjectId.createFromHexString(id));

            if (!reservation) {
                return NextResponse.json(
                    { message: "Reservation not found" },
                    { status: 404 }
                );
            }
            
            return NextResponse.json(
                reservation,
                { status: 200 }
            );
        }
        
        else {
            // get reservations filled and exists staff_manpower_needed and filter out include request_letter
            const reservations = await Reservation.find({
                $and: [
                  { staff_manpower_needed: { $exists: true, $type: "array" } },
                  { $expr: { $gt: [{ $size: "$staff_manpower_needed" }, 0] } }
                ],
              },
              { request_letter: 0 }
            ).sort({ createdAt: -1 });

            if (!reservations) {
                return NextResponse.json(
                    { message: "No reservations found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                reservations,
                { status: 200 }
            );
        }
    } 

    catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}



export async function PATCH(request: NextRequest) {

    try {
        await connectDatabase();

        const body = await request.json();

        // update the database
        const response = await Reservation.findByIdAndUpdate(
            mongoose.Types.ObjectId.createFromHexString(body.id),
            { pe_viewed: true },
            { new: true }
        );

        if (!response) {
            return NextResponse.json(
                { message: "Reservation not found" },
                { status: 404 }
            );
        }
                
        return NextResponse.json(
            { message: "PE viewed notification" },
            { status: 201 }
        );
    } 

    catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function PUT(request: NextRequest) {

    try {
        await connectDatabase();

        const body = await request.json();

        const response = await Reservation.findByIdAndUpdate(
            mongoose.Types.ObjectId.createFromHexString(body.id),
            { 
                pe_acknowledged: true, 
                student_viewed: false, 
                uao_viewed: false, 
                pe_viewed: false,
            },
            { new: true }
        );

        if (!response) {
            return NextResponse.json(
                { message: "Reservation not found" },
                { status: 404 }
            );
        }
                
        return NextResponse.json(
            { message: "PE acknowleged reservation " + body.id },
            { status: 201 }
        );
    } 

    catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
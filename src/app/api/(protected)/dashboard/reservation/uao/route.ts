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
            // get reservations empty or not exist staff_manpower_needed and do not include request_letter
            const reservations = await Reservation.find({
                // $or: [
                //   { staff_manpower_needed: { $exists: false } },
                //   { staff_manpower_needed: { $size: 0 } }
                // ],
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
            { uao_viewed: true },
            { new: true }
        );

        if (!response) {
            return NextResponse.json(
                { message: "Reservation not found" },
                { status: 404 }
            );
        }
                
        return NextResponse.json(
            { message: "UAO viewed notification" },
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


        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (id) {
            const response = await Reservation.findByIdAndUpdate(
                mongoose.Types.ObjectId.createFromHexString(id),
                {   uao_concluded: true,
                    student_viewed: false,
                    uao_viewed: false,
                    pe_viewed: false,
                    osa_viewed: false,
                    ppo_viewed: false,
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
                { message: "UAO viewed notification" },
                { status: 201 }
            );
        }


        const body = await request.json();

        console.log(body)

        // update the database
        const response = await Reservation.findByIdAndUpdate(
            mongoose.Types.ObjectId.createFromHexString(body.id),
            { 
                staff_manpower_needed: body.staff_manpower_needed, 
                uao_acknowledged: true, 
                uao_viewed: false,
                student_viewed: false,
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
            { message: "UAO acknowledged reservation " + body.id },
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
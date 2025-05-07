import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Reservation from "@/models/reservations";
import { connectDatabase } from "@/lib/database";

export async function GET(req: NextRequest) {
    try {
        await connectDatabase();

        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const status = searchParams.get("status");

        let query: any = {};

        // Conditional filtering by date range
        if (startDate && endDate) {
            query.start_date = { $gte: new Date(startDate) };
            query.end_date = { $lte: new Date(endDate) };
        }

        // Conditional filtering by status
        if (status) {
            switch (status) {
                case "pending":
                    query.uao_acknowledged = false;
                    query.pe_acknowledged = false;
                    query.osa_acknowledged = false;
                    query.ppo_acknowledged = false;
                    break;
                case "partially_approved":
                    query.$or = [
                        { uao_acknowledged: true },
                        { pe_acknowledged: true },
                        { osa_acknowledged: true },
                        { ppo_acknowledged: true },
                    ];
                    query.uao_concluded = false;
                    break;
                case "fully_approved":
                    query.uao_acknowledged = true;
                    query.pe_acknowledged = true;
                    query.osa_acknowledged = true;
                    query.ppo_acknowledged = true;
                    query.uao_concluded = false;
                    break;
                case "concluded":
                    query.uao_concluded = true;
                    break;
            }
        }

        const reservations = await Reservation.find(query).lean();
        return NextResponse.json(reservations, { status: 200 });
    } catch (error: any) {
        console.error("GET /api/protected/dashboard/calendar:", error);
        return NextResponse.json(
            { error: "Failed to fetch reservations" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDatabase();
        const body = await req.json();

        // Validate required fields
        const requiredFields = [
            "unit_name",
            "event_name",
            "representative_name",
            "contact_number",
            "event_types",
            "facilities",
            "start_date",
            "end_date",
        ];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const reservation = new Reservation({
            ...body,
            start_date: new Date(body.start_date),
            end_date: new Date(body.end_date),
            created_at: new Date(),
        });

        await reservation.save();
        return NextResponse.json(reservation, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/protected/dashboard/calendar:", error);
        return NextResponse.json(
            { error: "Failed to create reservation" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDatabase();
        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json(
                { error: "Reservation ID is required" },
                { status: 400 }
            );
        }

        // Update date fields if provided
        if (updateData.start_date) updateData.start_date = new Date(updateData.start_date);
        if (updateData.end_date) updateData.end_date = new Date(updateData.end_date);

        const reservation = await Reservation.findByIdAndUpdate(_id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!reservation) {
            return NextResponse.json(
                { error: "Reservation not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(reservation, { status: 200 });
    } catch (error: any) {
        console.error("PUT /api/protected/dashboard/calendar:", error);
        return NextResponse.json(
            { error: "Failed to update reservation" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectDatabase();
        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json(
                { error: "Reservation ID is required" },
                { status: 400 }
            );
        }

        if (updateData.start_date) updateData.start_date = new Date(updateData.start_date);
        if (updateData.end_date) updateData.end_date = new Date(updateData.end_date);

        const reservation = await Reservation.findByIdAndUpdate(_id, { $set: updateData }, {
            new: true,
            runValidators: true,
        });

        if (!reservation) {
            return NextResponse.json(
                { error: "Reservation not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(reservation, { status: 200 });
    } catch (error: any) {
        console.error("PATCH /api/protected/dashboard/calendar:", error);
        return NextResponse.json(
            { error: "Failed to partially update reservation" },
            { status: 500 }
        );
    }
}
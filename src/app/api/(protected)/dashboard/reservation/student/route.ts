import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/database";
import Reservation from "@/models/reservations";

export async function POST(request: NextRequest) {

    try {
        const form_data = await request.formData();        
        
        console.log("Form data received:", form_data);

        // Extract the fields from the form data
        const unit_name = form_data.get("unit_name") as string;
        const event_name = form_data.get("event_name") as string;
        const representative_name = form_data.get("representative_name") as string;
        const contact_number = form_data.get("contact_number") as string;
        const start_date = form_data.get("start_date") as string;
        const end_date = form_data.get("end_date") as string;
        const request_letter = form_data.get("request_letter") as File;
        const event_types = form_data.getAll("event_types") as string[];
        const facilities = form_data.getAll("facilities") as string[];

        // check if all fields are filled
        if (
            !unit_name || 
            !event_name || 
            !representative_name || 
            !contact_number || 
            !start_date || 
            !end_date ||
            !request_letter || 
            !event_types || 
            !facilities
        ) {
            return NextResponse.json(
                { message: "Please fill all the fields" },
                { status: 400 }
            );
        }

        // convert the pdf file to buffer
        const bytes = await request_letter.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // connect to the database
        await connectDatabase();

        // create a new reservation
        const reservation = await Reservation.create({
            unit_name,
            event_name,
            representative_name,
            contact_number,
            start_date,     
            end_date,
            request_letter: buffer,
            event_types: event_types,
            facilities: facilities,
        });

        console.log("Reservation created:", reservation);

        return NextResponse.json(
            { message: "Reservation request submitted successfully", },
            { status: 200 }
        );

    }

    catch (error) {
        console.error("Error processing upload:", error);
        return NextResponse.json(
            { message: 'Failed to process upload' },
            { status: 500 }
        )
    }

}
import mongoose from "mongoose";

const schema = new mongoose.Schema({

    // student reservation inputs
    unit_name: {
        type: String,
    },
    event_name: {
        type: String,
    },
    representative_name: {
        type: String,
    },
    contact_number: {
        type: String,
    },
    event_types: {
        type: [String],
    },
    facilities: {
        type: [String],
    },
    request_letter: {
        type: Buffer,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },

    // uao inputs
    staff_manpower_needed: {
        type: [String],
    },
    uao_acknowledged: {
        type: Boolean,
        default: false,
    },
    uao_concluded: {
        type: Boolean,
        default: false,
    },

    // pe inputs
    pe_acknowledged: {
        type: Boolean,
        default: false,
    },

    // osa inputs
    osa_acknowledged: {
        type: Boolean,
        default: false,
    },

    // ppo inputs
    ppo_acknowledged: {
        type: Boolean,
        default: false,
    },
    equipment_needed: {
        type: [String],
    },
    presentation_equipment: {
        type: [String],
    },
    stage_options: {
        type: [String],
    },
    lighting_options: {
        type: [String],
    },

    // notifications
    student_viewed: {
        type: Boolean,
        default: false,
    },
    uao_viewed: {
        type: Boolean,
        default: false,
    },
    pe_viewed: {
        type: Boolean,
        default: false,
    },
    osa_viewed: {
        type: Boolean,
        default: false,
    },
    ppo_viewed: {
        type: Boolean,
        default: false,
    },
  
});

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", schema);
export default Reservation;
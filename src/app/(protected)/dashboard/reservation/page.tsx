"use client";
import { useAccount } from "../../provider";
import ReservationOSA from "./(osa)/osa";
import ReservationPE from "./(pe)/pe";
import ReservationPPO from "./(ppo)/ppo";
import ReservationStudent from "./(student)/student";
import ReservationUAO from "./(uao)/uao";

export default function Reservation() {

    const { account } = useAccount();

    switch (account.role) {
        case "student":
            return <ReservationStudent />
        case "uao":
            return <ReservationUAO />
        case "pe":
            return <ReservationPE />
        case "osa":
            return <ReservationOSA />
        case "ppo":
            return <ReservationPPO />
    }

    return null;
}
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params } : { params : { sessionId: string; traineeId: string } }
) {
    try {
        const session = await db.session.findUnique({
            where: {
                id: params.sessionId
            }
        })

        const trainee = await db.trainee.findUnique({
            where: {
                id: params.traineeId
            }
        })

        if(!session) { return new NextResponse("Session not found", { status: 404 }) }
        if(!trainee) { return new NextResponse("Trainee not found", { status: 404 }) }
        
        const subscription = await db.sessionsTrainees.create({
            data: {
                sessionId: session.id,
                traineeId: trainee.id
            }
        })

        return NextResponse.json(subscription);

    } catch (error) {
        console.log("[SUBSCRIBE_TRAINEE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
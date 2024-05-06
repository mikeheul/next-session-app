import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
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
        
        const subscription = await db.sessionsTrainees.findUnique({
            where: {
                sessionId_traineeId: {
                    sessionId: session.id,
                    traineeId: trainee.id
                }
            }
        });
        
        if(!subscription) { return new NextResponse("Subscription not found", { status: 404 }) }
        
        const deletedSubscription = await db.sessionsTrainees.delete({
            where: {
                sessionId_traineeId: {
                    sessionId: session.id,
                    traineeId: trainee.id
                }
            }
        })

        return NextResponse.json(deletedSubscription);

    } catch (error) {
        console.log("[UNSUBSCRIBE_TRAINEE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
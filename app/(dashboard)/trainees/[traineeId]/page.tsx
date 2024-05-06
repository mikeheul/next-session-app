import { db } from "@/lib/db";
import UnsubscribeButton from "../../sessions/[sessionId]/_components/UnsubscribeButton";

const TraineePage = async ({ params }: { params: { traineeId: string } }) => {
    
    const trainee = await db.trainee.findUnique({
        where: {
            id: params.traineeId!
        },
    })

    const subscriptions = await db.sessionsTrainees.findMany({
        where: {
            traineeId: params.traineeId
        },
        include: {
            session: true
        }
    })

    return (
        <div>
            <h1 className="text-2xl font-extrabold my-5">{`${trainee?.firstName} ${trainee?.lastName}`}</h1>

            <div className="flex flex-col gap-y-2">
            {subscriptions.map((subscription)=> (
                <div key={subscription.id} className="flex items-center gap-x-4">
                    <UnsubscribeButton 
                        traineeId={trainee?.id!}
                        sessionId={subscription.session.id}
                    />
                    <div>{subscription.session.name}</div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default TraineePage;
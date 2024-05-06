import { db } from "@/lib/db";

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

            <div>
            {subscriptions.map((subscription)=> (
                <div key={subscription.id}>{subscription.session.name}</div>
            ))}
            </div>
        </div>
    );
}

export default TraineePage;
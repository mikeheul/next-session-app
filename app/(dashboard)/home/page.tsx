import { db } from "@/lib/db";
import Link from "next/link";

const Home = async () => {

    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const futureSessions = await db.session.findMany({
        where: {
            startDate: {
                gt: now
            }
        }
    })

    const passedSessions = await db.session.findMany({
        where: {
            endDate: {
                lt: yesterday
            }
        }
    })

    const activeSessions = await db.session.findMany({
        where: {
            AND: [
                { startDate: { lte: now } }, // Start date is less than or equal to current date
                { endDate: { gte: now } }   // End date is greater than or equal to current date
            ]
        }
    });

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-10">Homepage</h1>
            
            <div className="mb-6">
                <h2 className="py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg text-2xl font-semibold my-5">Active Sessions</h2>
                <div className="flex flex-col px-4">
                    {activeSessions.map((session) => (
                        <Link href={`/sessions/${session.id}`} key={session.id}>
                            {session.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <h2 className="py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg text-2xl font-semibold my-5">Future Sessions</h2>
                <div className="flex flex-col px-4">
                    {futureSessions.map((session) => (
                        <Link href={`/sessions/${session.id}`} key={session.id}>
                            {session.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <h2 className="py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg text-2xl font-semibold my-5">Past Sessions</h2>
                <div className="flex flex-col px-4">
                    {passedSessions.map((session) => (
                        <Link href={`/sessions/${session.id}`} key={session.id}>
                            {session.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
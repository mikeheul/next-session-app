import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import SessionCollection from "./_components/SessionCollection";
import ProgressBar from "./_components/ProgressBar";
import { formatDateTime } from "@/lib/format-datetime";

const TrainingPage = async ({ params }: { params: { trainingId: string } }) => {

    const training = await db.training.findUnique({
        where: {
            id: params.trainingId
        }
    })

    const sessions = await db.session.findMany({
        where: {
            trainingId: params.trainingId
        },
        include: {
            _count: {
                select: { trainees: true }
            }
        },
        orderBy: [
            {
                startDate: 'asc'
            },
        ]
    })
    
    return (
        <div>
            <Link href={`/trainings/`}>
                <Button className="dark:bg-slate-600 dark:hover:bg-slate-600/90 dark:text-white">
                    <ChevronLeftIcon />
                    Back
                </Button>
            </Link>

            <h1 className="text-2xl font-extrabold my-5">{training?.name}</h1>
            <div className="hidden md:flex flex-col gap-y-2">
                <SessionCollection
                    sessions={sessions}
                    home={false}
                />
            </div>
            <div className="flex flex-col gap-y-5 md:hidden mt-5">
                {sessions.map((session) => (
                    <Link href={`/sessions/${session.id}`} key={session.id} className="flex flex-col items-center justify-center w-full gap-y-4 p-6 border bg-slate-100 hover:bg-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 cursor-pointer rounded-lg">
                        <p className="text-xl font-semibold">{session.name}</p>
                        <p>{formatDateTime(session.startDate)} to {formatDateTime(session.endDate)}</p>
                        <ProgressBar 
                            session={session}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TrainingPage;
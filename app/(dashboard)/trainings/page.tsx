import { db } from "@/lib/db";
import TrainingCollection from "./[trainingId]/_components/TrainingCollection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

const TrainingsPage = async () => {
    
    const trainings = await db.training.findMany({
        include: {
            _count: {
                select: { sessions: true }
            }
        },
        orderBy: {
            sessions: {
                _count: 'desc'
            }
        },
    });

    if (!trainings) {
        throw new Error('Trainings not found');
    }
    
    return (
        <div>
            <Link href={`/home`}>
                <Button className="dark:bg-slate-600 dark:hover:bg-slate-600/90 dark:text-white">
                    <ChevronLeftIcon />
                    Back
                </Button>
            </Link>

            <h1 className="text-2xl font-extrabold my-5">Trainings</h1>

            <TrainingCollection 
                trainings={trainings}
            />
        </div>
    );
}

export default TrainingsPage;
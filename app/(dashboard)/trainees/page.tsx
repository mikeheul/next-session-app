import { db } from "@/lib/db";
import TraineeCollection from "./_components/TraineeCollection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

const TrainingsPage = async () => {
    
    const trainees = await db.trainee.findMany({
        orderBy: {
            lastName: 'asc'
        },
    });

    if (!trainees) {
        throw new Error('Trainees not found');
    }
    
    return (
        <div>
            <Link href={`/home`}>
                <Button className="dark:bg-slate-600 dark:hover:bg-slate-600/90 dark:text-white">
                    <ChevronLeftIcon />
                    Back
                </Button>
            </Link>

            <h1 className="text-2xl font-extrabold my-5">Trainees</h1>

            <TraineeCollection 
                trainees={trainees}
            />
        </div>
    );
}

export default TrainingsPage;
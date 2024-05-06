import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDateTime } from "@/lib/format-datetime";
import { useRouter } from "next/navigation";
import SessionCollection from "./_components/SessionCollection";

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
        orderBy: [
            {
                startDate: 'asc'
            },
        ]
    })
    
    return (
        <div>
            <Link href={`/trainings/`}>
                <Button>
                    <ChevronLeftIcon />
                    Back
                </Button>
            </Link>

            <h1 className="text-2xl font-extrabold my-5">{training?.name}</h1>
            <div className="flex flex-col gap-y-2">
                <SessionCollection
                    sessions={sessions}
                />
            </div>
        </div>
    );
}

export default TrainingPage;
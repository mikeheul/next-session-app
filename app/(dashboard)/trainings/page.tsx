import { db } from "@/lib/db";
import { Training } from "@prisma/client";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

    console.log(trainings)

    //trainings.sort((a, b) => b.sessions.length - a.sessions.length);

    if (!trainings) {
        throw new Error('Trainings not found');
    }
    
    return (
        <div>
            <h1 className="text-2xl font-extrabold my-5">Trainings</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Training</TableHead>
                        <TableHead>Sessions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trainings.map((training) => (
                        <TableRow key={training.id}>
                            <TableCell className="font-medium"><Link href={`/trainings/${training.id}`}>{training.name}</Link></TableCell>
                            <TableCell>{training._count['sessions']}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TrainingsPage;
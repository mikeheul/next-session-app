"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useRouter } from "next/navigation";

interface TraineeCollectionProps {
    trainees: any[]
}

const TraineeCollection = ({
    trainees
}: TraineeCollectionProps) => {

    const router = useRouter()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Trainee</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trainees.map((trainee) => (
                    <TableRow className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => { router.push(`/trainees/${trainee.id}`) }} key={trainee.id}>
                        <TableCell className="font-semibold">
                            {` ${trainee.firstName} ${trainee.lastName}`}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TraineeCollection;
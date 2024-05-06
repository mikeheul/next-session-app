"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDateTime } from "@/lib/format-datetime";
import { Training } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TrainingCollectionProps {
    trainings: any[]
}

const TrainingCollection = ({
    trainings
}: TrainingCollectionProps) => {

    const router = useRouter()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Training</TableHead>
                    <TableHead>Sessions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trainings.map((training) => (
                    <TableRow className="cursor-pointer hover:bg-slate-200" onClick={() => { router.push(`/trainings/${training.id}`) }} key={training.id}>
                        <TableCell className="font-medium">{training.name}</TableCell>
                        <TableCell>{training._count['sessions']}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TrainingCollection;
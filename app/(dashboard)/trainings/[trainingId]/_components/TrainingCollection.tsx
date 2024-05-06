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
                    <TableRow className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => { router.push(`/trainings/${training.id}`) }} key={training.id}>
                        <TableCell className="font-semibold">{training.name}</TableCell>
                        <TableCell>{training._count['sessions']}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TrainingCollection;
"use client";

import Banner from "@/components/Banner";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDateTime } from "@/lib/format-datetime";
import { Session } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SessionCollectionProps {
    sessions: any[]
}

const SessionCollection = ({
    sessions
}: SessionCollectionProps) => {

    const router = useRouter()

    return (
        <>
        {sessions.length > 0 ? (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Session</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Places</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {sessions.map((session) => (
                    <TableRow className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => { router.push(`/sessions/${session.id}`) }} key={session.id}>
                        <TableCell className="font-semibold">{session.name}</TableCell>
                        <TableCell>{formatDateTime(session.startDate)}</TableCell>
                        <TableCell>{formatDateTime(session.endDate)}</TableCell>
                        <TableCell>{session.places}</TableCell>
                        <TableCell>
                        {session.places === session._count["trainees"] ? (
                            <Badge className="bg-red-500 text-white">Full</Badge>
                        ) : (
                            session.places - session._count["trainees"] === 1 && (
                                <Badge className="bg-red-500 text-white">1 place remaining</Badge>    
                            )
                        )}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

        ) : (
            <Banner variant="info" label="No sessions" />
        )}
        </>
    );
}

export default SessionCollection;
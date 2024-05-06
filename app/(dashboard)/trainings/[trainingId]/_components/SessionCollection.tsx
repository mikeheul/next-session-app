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
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";

interface SessionCollectionProps {
    sessions: any[],
    home: boolean
}

const SessionCollection = ({
    sessions,
    home
}: SessionCollectionProps) => {

    const router = useRouter()

    return (
        <>
        {sessions.length > 0 ? (
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Session</TableHead>
                        <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                        <TableHead className="hidden lg:table-cell">End Date</TableHead>
                        <TableHead className="hidden lg:table-cell w-[150px]">Places</TableHead>
                        <TableHead className="">Progress</TableHead>
                        {!home && (
                            <>
                            <TableHead>Status</TableHead>
                            </>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                {sessions.map((session) => (
                    <TableRow className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => { router.push(`/sessions/${session.id}`) }} key={session.id}>
                        <TableCell className="font-semibold">{session.name}</TableCell>
                        <TableCell className="hidden lg:table-cell">{formatDateTime(session.startDate)}</TableCell>
                        <TableCell className="hidden lg:table-cell">{formatDateTime(session.endDate)}</TableCell>
                        <TableCell className="hidden lg:table-cell"><Badge className="bg-emerald-700 text-white">{session.places}</Badge></TableCell>
                        <TableCell>
                            <ProgressBar 
                                session={session}
                            />
                        </TableCell>
                        {!home && (
                            <>
                            <TableCell>
                            {session.places === session._count["trainees"] ? (
                                <Badge className="bg-red-500 text-white">Full</Badge>
                            ) : (
                                session.places - session._count["trainees"] === 1 && (
                                    <Badge className="bg-sky-500 text-white">1 place</Badge>    
                                )
                            )}
                            </TableCell>
                            </>
                        )}
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
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format-datetime";
import { UserRoundPlusIcon } from "lucide-react";
import UnsubscribeButton from "./_components/UnsubscribeButton";

const SessionPage = async ({ params }: { params: { sessionId: string } }) => {
    
    const session = await db.session.findUnique({
        where: {
            id: params.sessionId
        },
        include: {
            trainees: {
                include: {
                    trainee: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true // Only include necessary fields
                        }
                    }
                }
            },
            trainer: true,
            programmes: {
                include: 
                    {
                        session: true,
                        course: true
                    }
            }
        }
    });

    if (!session) {
        throw new Error('Session not found');
    }

    const traineesNotInSession = await db.trainee.findMany({
        where: {
            NOT: {
                sessions: {
                    some: {
                        sessionId: params.sessionId
                    },
                }
            }
        }
    });

    const coursesNotInSession = await db.course.findMany({
        where: {
            NOT: {
                programmes: {
                    some: {
                        sessionId: params.sessionId
                    }
                }
            }
        }
    });

    return (
        <>
            <h1 className="text-2xl font-extrabold my-5">{session.name}</h1> 
            <div className="bg-slate-200 p-6 rounded-md">
                <p>Start Date : {formatDateTime(session.startDate)}</p>
                <p>End Date : {formatDateTime(session.endDate)}</p>
                <p>Places : {session.places} places</p>
                <p>Trainer : {`${session.trainer.firstName} ${session.trainer.lastName}`}</p>
            </div>

            <div className="flex flex-col md:flex-row my-5">
                <div className="basis-2/4">
                    <h2 className="text-xl my-4 font-semibold">Registered Trainees</h2>
                    <div className="flex flex-col gap-y-2">
                    {session.trainees.map((trainee) => (
                        <div className="flex flex-col xs:flex-row gap-y-2 items-center" key={trainee.trainee.id}>
                            {trainee && (
                                <UnsubscribeButton 
                                    trainee={`${trainee.trainee.firstName} ${trainee.trainee.lastName}`}
                                />
                            )}
                            <p>{`${trainee.trainee.firstName} ${trainee.trainee.lastName}`}</p>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="basis-2/4">
                    <h2 className="text-xl my-4 font-semibold">Not Registered Trainees</h2>
                    <div className="flex flex-col gap-y-2">
                    {traineesNotInSession.map((trainee) => (
                        <div className="flex flex-col xs:flex-row gap-y-2 items-center" key={trainee.id}>
                            <Button className="mr-5 bg-green-800 hover:bg-green-800/90">
                                <UserRoundPlusIcon size={20} className="mr-2" /> 
                                Subscribe
                            </Button>
                            <p>{`${trainee.firstName} ${trainee.lastName}`}</p>
                        </div>
                    ))}
                    </div>
                </div>

            </div>

            <div className="flex flex-col md:flex-row my-5">
                <div className="basis-2/4">
                    <h2 className="text-xl my-4 font-semibold">Registered Courses</h2>
                    {session.programmes.map((programme) => (
                        <div key={programme.course.id}>{programme.course.name} / {programme.duration} days</div>
                    ))}    
                </div>
                <div className="basis-2/4">
                    <h2 className="text-xl my-4 font-semibold">Not Registered Courses</h2>
                    {coursesNotInSession.map((course) => (
                        <div key={course.id}>{course.name}</div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SessionPage;
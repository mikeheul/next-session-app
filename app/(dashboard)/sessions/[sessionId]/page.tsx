import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format-datetime";
import UnsubscribeButton from "./_components/UnsubscribeButton";
import SubscribeButton from "./_components/SubscribeButton";
import Banner from "@/components/Banner";
import Frame from "./_components/Frame";
import FrameRow from "./_components/FrameRow";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, User2Icon } from "lucide-react";
import TraineeButton from "../../trainees/[traineeId]/_components/TraineeButton";

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
                            lastName: true,
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
            <Link href={`/trainings/${session.trainingId}`}>
                <Button className="dark:bg-slate-600 dark:hover:bg-slate-600/90 dark:text-white">
                    <ChevronLeftIcon />
                    Back
                </Button>
            </Link>

            <h1 className="text-2xl font-extrabold my-5">{session.name}</h1> 
            <div className="bg-slate-200 p-6 rounded-md dark:text-slate-200 dark:bg-slate-800">
                <p>Start Date : {formatDateTime(session.startDate)}</p>
                <p>End Date : {formatDateTime(session.endDate)}</p>
                <p>Places : {session.places} places</p>
                <p>Remaining : {session.places - session.trainees.length}</p>
                <p>Trainer : {`${session.trainer.firstName} ${session.trainer.lastName}`}</p>
            </div>

            <FrameRow>
                <Frame
                    label="Registered Trainees"
                >
                    {session.trainees.length > 0 ? (
                        <>
                        {session.trainees.map((subscription) => (
                            <div className="flex flex-col sm:flex-row gap-y-2 items-center" key={subscription.id}>
                                {subscription && (
                                    <>
                                    <UnsubscribeButton 
                                        traineeId={subscription.traineeId}
                                        sessionId={subscription.sessionId}
                                    />
                                    <TraineeButton
                                        traineeId={subscription.traineeId}
                                    />
                                    </>
                                )}
                                <p className="text-center xs:text-left">{`${subscription.trainee.firstName} ${subscription.trainee.lastName}`}</p>
                            </div>
                        ))}
                        </>
                    ) : (
                        <p className="text-sm text-slate-400">No trainees found</p>
                    )}
                </Frame>

                <Frame
                    label="Not Registered Trainees"
                >
                    {session.places > session.trainees.length ? (
                        <>
                        {traineesNotInSession.length > 0 ? (
                            <>
                            {traineesNotInSession.map((trainee) => (
                                <div className="flex flex-col sm:flex-row gap-y-2 items-center" key={trainee.id}>
                                    <>
                                        <SubscribeButton 
                                            traineeId={trainee.id}
                                            sessionId={session.id}
                                        />
                                        <TraineeButton
                                            traineeId={trainee.id}
                                        />
                                        <p className="text-center xs:text-left">{`${trainee.firstName} ${trainee.lastName}`}</p>
                                    </>
                                </div>
                            ))}
                            </>
                        ) : (
                            <p className="text-sm text-slate-400">No trainees found</p>
                        )}
                        </>
                    ) : (
                        <Banner 
                            label="No places available. Session complete !"
                        />
                    )}
                </Frame>
            </FrameRow>

            <FrameRow>
                <Frame
                    label="Registered Courses"
                >
                    {session.programmes.map((programme) => (
                        <div key={programme.id} className="flex flex-col sm:flex-row gap-y-2 items-center">
                            <Button className="mr-0 xs:mr-5">
                                Cancel
                            </Button>
                            <p className="text-center xs:text-left" key={programme.course.id}>{programme.course.name} / {programme.duration} days</p>
                        </div>
                    ))}
                </Frame>
                
                <Frame
                    label="Not Registered Courses"
                >
                    {coursesNotInSession.map((course) => (
                        <div key={course.id}>{course.name}</div>
                    ))}
                </Frame>
            </FrameRow>
        </>
    );
}

export default SessionPage;
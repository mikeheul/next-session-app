import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format-datetime";
import UnsubscribeButton from "./_components/UnsubscribeButton";
import SubscribeButton from "./_components/SubscribeButton";
import Banner from "@/components/Banner";
import Frame from "./_components/Frame";
import FrameRow from "./_components/FrameRow";

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
                <p>Left : {session.places - session.trainees.length}</p>
                <p>Trainer : {`${session.trainer.firstName} ${session.trainer.lastName}`}</p>
            </div>

            <FrameRow>
                <Frame
                    label="Registered Trainees"
                >
                    {session.trainees.length > 0 ? (
                        <>
                        {session.trainees.map((subscription) => (
                            <div className="flex flex-col xs:flex-row gap-y-2 items-center" key={subscription.id}>
                                {subscription && (
                                    <UnsubscribeButton 
                                        traineeId={subscription.trainee.id}
                                        sessionId={subscription.sessionId}
                                    />
                                )}
                                <p>{`${subscription.trainee.firstName} ${subscription.trainee.lastName}`}</p>
                            </div>
                        ))}
                        </>
                    ) : (
                        <p className="text-sm text-slate-400">No trainees</p>
                    )}
                </Frame>

                <Frame
                    label="Not Registered Trainees"
                >
                    {traineesNotInSession.length > 0 ? (
                        <>
                        {traineesNotInSession.map((trainee) => (
                            <div className="flex flex-col xs:flex-row gap-y-2 items-center" key={trainee.id}>
                                {session.places > session.trainees.length ? (
                                    <>
                                        <SubscribeButton 
                                            traineeId={trainee.id}
                                            sessionId={session.id}
                                        />
                                        <p>{`${trainee.firstName} ${trainee.lastName}`}</p>
                                    </>
                                ) : (
                                    <Banner 
                                        label="No places available. Session complete !"
                                    />
                                )}
                            </div>
                        ))}
                        </>
                    ) : (
                        <p className="text-sm text-slate-400">No trainees</p>
                    )}
                </Frame>
            </FrameRow>

            <FrameRow>
                <Frame
                    label="Registered Courses"
                >
                    {session.programmes.map((programme) => (
                        <div key={programme.course.id}>{programme.course.name} / {programme.duration} days</div>
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
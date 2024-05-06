import { db } from "@/lib/db";
import TraineeCollection from "./_components/TraineeCollection";

const TrainingsPage = async () => {
    
    const trainees = await db.trainee.findMany({
        orderBy: {
            lastName: 'asc'
        },
    });

    if (!trainees) {
        throw new Error('Trainees not found');
    }
    
    return (
        <div>
            <h1 className="text-2xl font-extrabold my-5">Trainees</h1>

            <TraineeCollection 
                trainees={trainees}
            />
        </div>
    );
}

export default TrainingsPage;
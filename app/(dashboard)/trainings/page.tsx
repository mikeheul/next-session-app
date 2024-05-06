import { db } from "@/lib/db";
import TrainingCollection from "./[trainingId]/_components/TrainingCollection";

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

    if (!trainings) {
        throw new Error('Trainings not found');
    }
    
    return (
        <div>
            <h1 className="text-2xl font-extrabold my-5">Trainings</h1>

            <TrainingCollection 
                trainings={trainings}
            />
        </div>
    );
}

export default TrainingsPage;
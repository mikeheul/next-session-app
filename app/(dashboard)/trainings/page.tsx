import { db } from "@/lib/db";
import { Training } from "@prisma/client";

const TrainingsPage = async () => {
    
    const trainings = await db.training.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    if (!trainings) {
        throw new Error('Trainings not found');
    }
    
    return (
        <div>
            <h1 className="text-2xl font-bold">Trainings</h1>
            {trainings.map((training: Training) => (
                <div key={training.id}>
                    {training.name}
                </div>
            ))}
        </div>
    );
}

export default TrainingsPage;
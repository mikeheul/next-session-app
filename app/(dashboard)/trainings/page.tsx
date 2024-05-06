import { db } from "@/lib/db";
import { Training } from "@prisma/client";
import Link from "next/link";

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
            <h1 className="text-2xl font-extrabold my-5">Trainings</h1>
            {trainings.map((training: Training) => (
                <div key={training.id}>
                    <Link href={`/trainings/${training.id}`}>
                        {training.name}
                    </Link> 
                </div>
            ))}
        </div>
    );
}

export default TrainingsPage;
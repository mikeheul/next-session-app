const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
   // Create two trainers
    const trainer1 = await prisma.trainer.create({
        data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        },
    });

    const trainer2 = await prisma.trainer.create({
        data: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        phoneNumber: '0987654321',
        },
    });

    // Create four trainees
    const trainee1 = await prisma.trainee.create({
        data: {
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice@example.com',
            phoneNumber: '1111111111',
        },
    });
    
    const trainee2 = await prisma.trainee.create({
        data: {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        phoneNumber: '2222222222',
    },
});

const trainee3 = await prisma.trainee.create({
    data: {
        firstName: 'Eve',
        lastName: 'Jackson',
        email: 'eve@example.com',
        phoneNumber: '3333333333',
    },
});

const trainee4 = await prisma.trainee.create({
    data: {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@example.com',
        phoneNumber: '4444444444',
    },
});

console.log('Trainers and trainees created successfully!');

// Create four categories
const category1 = await prisma.category.create({
        data: {
            name: 'Computer Science',
        },
    });
    
    const category2 = await prisma.category.create({
        data: {
            name: 'Web development',
        },
    });
    
    const category3 = await prisma.category.create({
        data: {
            name: 'Graphic Design',
        },
    });
    
    const category4 = await prisma.category.create({
        data: {
            name: 'Comptability',
        },
    });
    
    // Create four trainings
    const training1 = await prisma.training.create({
        data: {
            name: 'Computer Science',
        },
    });
    
    const training2 = await prisma.training.create({
        data: {
            name: 'Web development',
        },
    });
    
    const training3 = await prisma.training.create({
        data: {
            name: 'Graphic Design',
        },
    });
    
    const training4 = await prisma.training.create({
        data: {
            name: 'Comptability',
        },
    });

    console.log('Categories and trainings created successfully!');

    const existingTrainers = await prisma.trainer.findMany();
    const existingTrainings = await prisma.training.findMany();

    for (let i = 0; i < 4; i++) {
        const randomTrainer = existingTrainers[Math.floor(Math.random() * existingTrainers.length)];
        const randomTraining = existingTrainings[Math.floor(Math.random() * existingTrainings.length)];
        
        await prisma.session.create({
            data: {
                name: `${randomTraining.name} Group ${i + 1}`,
                startDate: new Date(),
                endDate: new Date(),
                training: {
                    connect: { id: randomTraining.id },
                },
                trainer: {
                    connect: { id: randomTrainer.id },
                },
            },
        });
    }
    
    console.log('Sessions created successfully!');
    
    const categories = [
        { name: 'Comptability', courses: ['QuickBooks', 'Tax Preparation'] },
        { name: 'Web Development', courses: ['JavaScript Fundamentals', 'React Development'] },
        { name: 'Graphic Design', courses: ['Adobe Photoshop Mastery', 'Illustrator for Beginners'] },
        { name: 'Computer Science', courses: ['Algorithms and Data Structures', 'Machine Learning Basics'] },
    ];
        
    for (const category of categories) {
        const existingCategory = await prisma.category.findUnique({
        where: {
            name: category.name,
        },
    });
    
    if (!existingCategory) {
        console.error(`Error: Category '${category.name}' does not exist.`);
        continue;
    }
    
    for (const courseName of category.courses) {
        await prisma.course.create({
            data: {
                name: courseName,
                category: {
                    connect: { id: existingCategory.id },
                    },
                },
            });
        }
    }

    console.log('Courses created successfully!');

    // const existingSessions = await prisma.session.findMany();
    // const existingTrainees = await prisma.trainee.findMany();
    // const existingCourses = await prisma.course.findMany();

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

main()
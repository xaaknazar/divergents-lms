const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Саморазвитие" },
                { name: "Лидерство" },
                { name: "⁠Мышление" },
                { name: "⁠Отношения" },
                { name: "Менеджмент" },
                { name: "Навыки" },

            ]
        });
        console.log("Success");
    } catch (error){
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();
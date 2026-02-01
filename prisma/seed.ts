import { prisma } from "../src/lib/prisma"
const categories = [
    {
        name: "Bengali",
        slug: "bangla",
        description: "Traditional Bengali cuisine",
        sortOrder: 1
    },
    {
        name: "Chinese",
        slug: "chinese",
        description: "Chinese dishes",
        sortOrder: 2
    },
    {
        name: "Fast Food",
        slug: "fast-food",
        description: "Fast food & snacks",
        sortOrder: 3
    },
    {
        name: "Dessert",
        slug: "dessert",
        description: "Sweets & desserts",
        sortOrder: 4
    },
]

async function main() {
    for (const c of categories){
        await prisma.category.upsert({
            where: {
                slug: c.slug
            },
            update: {},
            create: {
                ...c,
                isActive: true
            },
        });
    }

    console.log("Categories seeded.")
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect())
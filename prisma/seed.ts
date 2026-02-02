import { prisma } from "../src/lib/prisma"
const categories = [
  {
    name: "কাচ্চি বিরিয়ানি",
    slug: "kacchi-biryani",
    description: "খাসির মাংস ও আলু দিয়ে তৈরি অথেন্টিক বাসমতি কাচ্চি।",
    image: "https://example.com/images/kacchi.jpg",
    sortOrder: 2,
    isActive: true
  },
  {
    name: "চিকেন আইটেম",
    slug: "chicken-items",
    description: "গ্রিল, রোস্ট এবং ফ্রাইড চিকেনের বিশাল সমাহার।",
    image: "https://example.com/images/chicken.jpg",
    sortOrder: 3,
    isActive: true
  },
  {
    name: "পিঠা ও স্ন্যাকস",
    slug: "pitha-snacks",
    description: "বিকেলের নাস্তার জন্য ঘরোয়া স্বাদের পিঠা এবং স্ন্যাকস।",
    image: "https://example.com/images/pitha.jpg",
    sortOrder: 4,
    isActive: true
  },
  {
    name: "ডেজার্ট ও মিষ্টি",
    slug: "desserts-sweets",
    description: "খাওয়ার শেষে মিষ্টি মুখ করতে দই, রসমালাই ও পুডিং।",
    image: "https://example.com/images/dessert.jpg",
    sortOrder: 5,
    isActive: true
  },
  {
    name: "চাইনিজ ও থাই",
    slug: "chinese-thai",
    description: "ফ্রাইড রাইস, চাউমিন এবং স্পাইসি থাই স্যুপ।",
    image: "https://example.com/images/chinese.jpg",
    sortOrder: 6,
    isActive: true
  },
  {
    name: "ভর্তা ও ভাত",
    slug: "vorta-bhaat",
    description: "গরম ভাতের সাথে ১০ পদের দেশি ভর্তা ও ডাল।",
    image: "https://example.com/images/vorta.jpg",
    sortOrder: 7,
    isActive: true
  },
  {
    name: "বার্গার ও স্যান্ডউইচ",
    slug: "burger-sandwich",
    description: "জুসি চিকেন বার্গার এবং ক্লাসিক ক্লাব স্যান্ডউইচ।",
    image: "https://example.com/images/burger.jpg",
    sortOrder: 8,
    isActive: true
  },
  {
    name: "জুস ও পানীয়",
    slug: "juice-drinks",
    description: "ফ্রেশ ফ্রুট জুস, লাচ্ছি এবং কোল্ড ড্রিংকস।",
    image: "https://example.com/images/juice.jpg",
    sortOrder: 9,
    isActive: true
  },
  {
    name: "সি-ফুড",
    slug: "sea-food",
    description: "তাজা সামুদ্রিক মাছের ফ্রাই এবং কারি আইটেম।",
    image: "https://example.com/images/seafood.jpg",
    sortOrder: 10,
    isActive: true
  }
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
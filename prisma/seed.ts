import { prisma } from "../src/lib/prisma";

const categories = [
  { name: "কাচ্চি বিরিয়ানি", slug: "kacchi-biryani", description: "খাসির মাংস ও আলু দিয়ে তৈরি অথেন্টিক বাসমতি কাচ্চি।", image: "https://example.com/images/kacchi.jpg", sortOrder: 2, isActive: true },
  { name: "চিকেন আইটেম", slug: "chicken-items", description: "গ্রিল, রোস্ট এবং ফ্রাইড চিকেনের বিশাল সমাহার।", image: "https://example.com/images/chicken.jpg", sortOrder: 3, isActive: true },
  { name: "পিঠা ও স্ন্যাকস", slug: "pitha-snacks", description: "বিকেলের নাস্তার জন্য ঘরোয়া স্বাদের পিঠা এবং স্ন্যাকস।", image: "https://example.com/images/pitha.jpg", sortOrder: 4, isActive: true },
  { name: "ডেজার্ট ও মিষ্টি", slug: "desserts-sweets", description: "খাওয়ার শেষে মিষ্টি মুখ করতে দই, রসমালাই ও পুডিং।", image: "https://example.com/images/dessert.jpg", sortOrder: 5, isActive: true },
  { name: "চাইনিজ ও থাই", slug: "chinese-thai", description: "ফ্রাইড রাইস, চাউমিন এবং স্পাইসি থাই স্যুপ।", image: "https://example.com/images/chinese.jpg", sortOrder: 6, isActive: true },
  { name: "ভর্তা ও ভাত", slug: "vorta-bhaat", description: "গরম ভাতের সাথে ১০ পদের দেশি ভর্তা ও ডাল।", image: "https://example.com/images/vorta.jpg", sortOrder: 7, isActive: true },
  { name: "বার্গার ও স্যান্ডউইচ", slug: "burger-sandwich", description: "জুসি চিকেন বার্গার এবং ক্লাসিক ক্লাব স্যান্ডউইচ।", image: "https://example.com/images/burger.jpg", sortOrder: 8, isActive: true },
  { name: "জুস ও পানীয়", slug: "juice-drinks", description: "ফ্রেশ ফ্রুট জুস, লাচ্ছি এবং কোল্ড ড্রিংকস।", image: "https://example.com/images/juice.jpg", sortOrder: 9, isActive: true },
  { name: "সি-ফুড", slug: "sea-food", description: "তাজা সামুদ্রিক মাছের ফ্রাই এবং কারি আইটেম।", image: "https://example.com/images/seafood.jpg", sortOrder: 10, isActive: true },
];

const mealItems: Array<{ name: string; description: string; price: number; dietaryTags: string[]; categorySlug: string }> = [
  { name: "শাহি মাটন কাচ্চি (ফুল)", description: "বাসমতি চাল এবং প্রিমিয়াম মাটন দিয়ে তৈরি। সাথে ১টি আলু ও ডিম।", price: 480, dietaryTags: ["Halal", "Mutton"], categorySlug: "kacchi-biryani" },
  { name: "খাসির কাচ্চি (হাফ)", description: "ছোট ক্ষুধা মেটাতে পারফেক্ট সাইজ কাচ্চি।", price: 260, dietaryTags: ["Halal"], categorySlug: "kacchi-biryani" },
  { name: "কাচ্চি ও বোরহানি কম্বো", description: "১ প্লেট কাচ্চি এবং ২৫০ মিলি স্পেশাল বোরহানি।", price: 530, dietaryTags: ["Combo"], categorySlug: "kacchi-biryani" },
  { name: "বিফ কাচ্চি বিরিয়ানি", description: "গরুর মাংস দিয়ে তৈরি স্পেশাল দম বিরিয়ানি।", price: 420, dietaryTags: ["Beef", "Spicy"], categorySlug: "kacchi-biryani" },
  { name: "কাচ্চি থালি (প্লাটার)", description: "কাচ্চি, চিকেন রোস্ট, জালি কাবাব এবং চাটনি।", price: 650, dietaryTags: ["Platter", "Heavy"], categorySlug: "kacchi-biryani" },
  { name: "চিকেন রোস্ট (বিয়েবাড়ি স্টাইল)", description: "দেশি মুরগির ঝাল-মিষ্টি ঘন গ্রেভি রোস্ট।", price: 160, dietaryTags: ["Chicken", "Traditional"], categorySlug: "chicken-items" },
  { name: "চিকেন ফ্রাই (২ পিস)", description: "ক্রিসপি এবং স্পাইসি ডিপ ফ্রাইড চিকেন।", price: 180, dietaryTags: ["Fried", "Spicy"], categorySlug: "chicken-items" },
  { name: "হট এন্ড স্পাইসি চিকেন উইংস", description: "৬ পিস নাগা সস মাখানো ঝাল উইংস।", price: 240, dietaryTags: ["Spicy", "Snacks"], categorySlug: "chicken-items" },
  { name: "চিকেন রেজালা", description: "সাদা গ্রেভিতে রান্না করা রাজকীয় চিকেন কারি।", price: 220, dietaryTags: ["Curry", "Rich"], categorySlug: "chicken-items" },
  { name: "চিকেন চাপ", description: "তেলে ভাজা মশলাদার চিকেন চাপ। ল্যাম্ব স্টাইল।", price: 190, dietaryTags: ["Spicy", "Deep Fried"], categorySlug: "chicken-items" },
  { name: "জাফরানি ফিরনি", description: "মাটির পাত্রে জমানো সুগন্ধি চাল ও জাফরানের ফিরনি।", price: 80, dietaryTags: ["Sweet", "Dessert"], categorySlug: "desserts-sweets" },
  { name: "গুলাব জামুন (২ পিস)", description: "রসে টইটম্বুর নরম লাল মিষ্টি।", price: 60, dietaryTags: ["Sweet"], categorySlug: "desserts-sweets" },
  { name: "বগুড়ার দই", description: "ঐতিহ্যবাহী লাল মিষ্টি দই (১ কাপ)।", price: 70, dietaryTags: ["Dairy", "Traditional"], categorySlug: "desserts-sweets" },
  { name: "ক্যারামেল পুডিং", description: "ডিম এবং দুধের তৈরি স্মুথ ক্যারামেল পুডিং।", price: 120, dietaryTags: ["Sweet", "Egg"], categorySlug: "desserts-sweets" },
  { name: "ছানার পায়েস", description: "তাজা ছানা এবং ঘন দুধের সুস্বাদু মিশ্রণ।", price: 150, dietaryTags: ["Dairy", "Premium"], categorySlug: "desserts-sweets" },
];

async function seedCategories() {
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c },
    });
  }
  console.log("Categories seeded.");
}

async function seedMeals() {
  const profile = await prisma.providerProfile.findFirst();
  if (!profile) {
    console.log("Meals skipped: There is no provider profile. First create provider profile then seed again.");
    return;
  }

  const cats = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  const slugToId = Object.fromEntries(cats.map((c) => [c.slug ?? "", c.id]));

  for (const item of mealItems) {
    const categoryId = slugToId[item.categorySlug] ?? null;
    try {
      await prisma.meal.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          dietaryTags: item.dietaryTags,
          categoryId,
          providerProfileId: profile.id,
          isAvailable: true,
        },
      });
    } catch (e) {
      console.error(`Error creating meal "${item.name}":`, (e as Error).message);
    }
  }
  console.log("Meals seeded.");
}

async function main() {
  await seedCategories();
  await seedMeals();
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

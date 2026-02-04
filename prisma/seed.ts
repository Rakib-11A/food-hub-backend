import { prisma } from "../src/lib/prisma";

const categories = [
  { 
    name: "কাচ্চি বিরিয়ানি", 
    slug: "kacchi-biryani", 
    description: "খাসির মাংস ও আলু দিয়ে তৈরি অথেন্টিক বাসমতি কাচ্চি।", 
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8", 
    sortOrder: 1, 
    isActive: true 
  },
  { 
    name: "তেহারি ও পোলাও", 
    slug: "tehari-polao", 
    description: "গরুর মাংস দিয়ে হলুদ তেহারি এবং সুগন্ধি পোলাও।", 
    image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7", 
    sortOrder: 2, 
    isActive: true 
  },
  { 
    name: "চিকেন আইটেম", 
    slug: "chicken-items", 
    description: "গ্রিল, রোস্ট এবং ফ্রাইড চিকেনের বিশাল সমাহার।", 
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6", 
    sortOrder: 3, 
    isActive: true 
  },
  { 
    name: "মাছ ও সি-ফুড", 
    slug: "fish-seafood", 
    description: "তাজা ইলিশ, রুই, চিংড়ির ঝোল ও ভাজা আইটেম।", 
    image: "https://images.unsplash.com/photo-1580959375944-1ab5b8fc22bb", 
    sortOrder: 4, 
    isActive: true 
  },
  { 
    name: "ভর্তা ও ভাত", 
    slug: "vorta-bhaat", 
    description: "গরম ভাতের সাথে ১০ পদের দেশি ভর্তা ও ডাল।", 
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40", 
    sortOrder: 5, 
    isActive: true 
  },
  { 
    name: "পিঠা ও স্ন্যাকস", 
    slug: "pitha-snacks", 
    description: "বিকেলের নাস্তার জন্য ঘরোয়া স্বাদের পিঠা এবং স্ন্যাকস।", 
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950", 
    sortOrder: 6, 
    isActive: true 
  },
  { 
    name: "ডেজার্ট ও মিষ্টি", 
    slug: "desserts-sweets", 
    description: "খাওয়ার শেষে মিষ্টি মুখ করতে দই, রসমালাই ও পুডিং।", 
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777", 
    sortOrder: 7, 
    isActive: true 
  },
  { 
    name: "চাইনিজ ও থাই", 
    slug: "chinese-thai", 
    description: "ফ্রাইড রাইস, চাউমিন এবং স্পাইসি থাই স্যুপ।", 
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246", 
    sortOrder: 8, 
    isActive: true 
  },
  { 
    name: "বার্গার ও স্যান্ডউইচ", 
    slug: "burger-sandwich", 
    description: "জুসি চিকেন বার্গার এবং ক্লাসিক ক্লাব স্যান্ডউইচ।", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", 
    sortOrder: 9, 
    isActive: true 
  },
  { 
    name: "জুস ও পানীয়", 
    slug: "juice-drinks", 
    description: "ফ্রেশ ফ্রুট জুস, লাচ্ছি এবং কোল্ড ড্রিংকস।", 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", 
    sortOrder: 10, 
    isActive: true 
  },
];

const mealItems: Array<{ 
  name: string; 
  description: string; 
  price: number; 
  dietaryTags: string[]; 
  categorySlug: string;
  image?: string;
}> = [
  // কাচ্চি বিরিয়ানি
  { name: "শাহি মাটন কাচ্চি (ফুল)", description: "বাসমতি চাল এবং প্রিমিয়াম মাটন দিয়ে তৈরি। সাথে ১টি আলু ও ডিম।", price: 480, dietaryTags: ["Halal", "Mutton", "Spicy"], categorySlug: "kacchi-biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8" },
  { name: "খাসির কাচ্চি (হাফ)", description: "ছোট ক্ষুধা মেটাতে পারফেক্ট সাইজ কাচ্চি।", price: 260, dietaryTags: ["Halal", "Mutton"], categorySlug: "kacchi-biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8" },
  { name: "কাচ্চি ও বোরহানি কম্বো", description: "১ প্লেট কাচ্চি এবং ২৫০ মিলি স্পেশাল বোরহানি।", price: 530, dietaryTags: ["Combo", "Dairy"], categorySlug: "kacchi-biryani" },
  { name: "বিফ কাচ্চি বিরিয়ানি", description: "গরুর মাংস দিয়ে তৈরি স্পেশাল দম বিরিয়ানি।", price: 420, dietaryTags: ["Beef", "Spicy", "Halal"], categorySlug: "kacchi-biryani" },
  { name: "কাচ্চি থালি (প্লাটার)", description: "কাচ্চি, চিকেন রোস্ট, জালি কাবাব এবং চাটনি।", price: 650, dietaryTags: ["Platter", "Heavy", "Premium"], categorySlug: "kacchi-biryani" },
  { name: "স্পেশাল হায়দারাবাদি বিরিয়ানি", description: "দীর্ঘ মেরিনেশনে রাখা মাটন ও জাফরান মিশ্রিত চাল।", price: 550, dietaryTags: ["Mutton", "Premium", "Aromatic"], categorySlug: "kacchi-biryani" },

  // তেহারি ও পোলাও
  { name: "গরুর মাংসের তেহারি", description: "হলুদ রঙের ঝাঁঝালো তেহারি। নাজিরশাইল চাল।", price: 280, dietaryTags: ["Beef", "Traditional"], categorySlug: "tehari-polao", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7" },
  { name: "মোরগ পোলাও", description: "দেশি মুরগি দিয়ে রান্না ঘি মাখানো সুগন্ধি পোলাও।", price: 320, dietaryTags: ["Chicken", "Traditional"], categorySlug: "tehari-polao" },
  { name: "কাশ্মীরি পোলাও", description: "বাদাম, কিসমিস ও ড্রাই ফ্রুটস দিয়ে সাজানো পোলাও।", price: 180, dietaryTags: ["Vegetarian", "Sweet"], categorySlug: "tehari-polao" },
  { name: "চিকেন তেহারি (ফুল)", description: "ঢাকার পুরান শহরের স্টাইলে চিকেন তেহারি।", price: 240, dietaryTags: ["Chicken", "Spicy"], categorySlug: "tehari-polao" },

  // চিকেন আইটেম
  { name: "চিকেন রোস্ট (বিয়েবাড়ি স্টাইল)", description: "দেশি মুরগির ঝাল-মিষ্টি ঘন গ্রেভি রোস্ট।", price: 160, dietaryTags: ["Chicken", "Traditional"], categorySlug: "chicken-items", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6" },
  { name: "চিকেন ফ্রাই (২ পিস)", description: "ক্রিসপি এবং স্পাইসি ডিপ ফ্রাইড চিকেন।", price: 180, dietaryTags: ["Fried", "Spicy"], categorySlug: "chicken-items" },
  { name: "হট এন্ড স্পাইসি চিকেন উইংস", description: "৬ পিস নাগা সস মাখানো ঝাল উইংস।", price: 240, dietaryTags: ["Spicy", "Snacks"], categorySlug: "chicken-items" },
  { name: "চিকেন রেজালা", description: "সাদা গ্রেভিতে রান্না করা রাজকীয় চিকেন কারি।", price: 220, dietaryTags: ["Curry", "Rich"], categorySlug: "chicken-items" },
  { name: "চিকেন চাপ", description: "তেলে ভাজা মশলাদার চিকেন চাপ।", price: 190, dietaryTags: ["Spicy", "Deep Fried"], categorySlug: "chicken-items" },
  { name: "চিকেন টিক্কা মাসালা", description: "তন্দুরে পোড়া চিকেন টুকরো ক্রিমি গ্রেভিতে।", price: 280, dietaryTags: ["Grilled", "Creamy"], categorySlug: "chicken-items" },
  { name: "চিকেন কোরমা", description: "দই ও ক্যাশু বাদাম দিয়ে মাইল্ড কারি।", price: 250, dietaryTags: ["Mild", "Creamy"], categorySlug: "chicken-items" },

  // মাছ ও সি-ফুড
  { name: "ইলিশ মাছের ঝোল", description: "বাংলার ঐতিহ্য। কাঁচা মরিচ ও সরিষা তেলের ঝোল।", price: 450, dietaryTags: ["Fish", "Traditional", "Spicy"], categorySlug: "fish-seafood", image: "https://images.unsplash.com/photo-1580959375944-1ab5b8fc22bb" },
  { name: "চিংড়ি মালাই কারি", description: "নারকেল দুধে রান্না করা গলদা চিংড়ি।", price: 380, dietaryTags: ["Seafood", "Creamy"], categorySlug: "fish-seafood" },
  { name: "রুই মাছের কালিয়া", description: "ঘন মশলার গ্রেভিতে রান্না রুই মাছ।", price: 240, dietaryTags: ["Fish", "Traditional"], categorySlug: "fish-seafood" },
  { name: "পাবদা মাছের ঝোল", description: "হালকা ঝোলে রসুন পেঁয়াজ দিয়ে রান্না।", price: 280, dietaryTags: ["Fish", "Light"], categorySlug: "fish-seafood" },
  { name: "চিংড়ি ভাজা (৮ পিস)", description: "ক্রিসপি ফ্রাইড চিংড়ি সাথে কাচুম্বর।", price: 320, dietaryTags: ["Seafood", "Fried"], categorySlug: "fish-seafood" },

  // ভর্তা ও ভাত
  { name: "বেগুন ভর্তা সেট", description: "গরম ভাত, বেগুন ভর্তা, ডাল এবং আলু ভাজা।", price: 120, dietaryTags: ["Vegetarian", "Traditional"], categorySlug: "vorta-bhaat", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40" },
  { name: "ইলিশ ভর্তা থালা", description: "ইলিশ মাছের ভর্তা, ভাত, ডাল ও শাক।", price: 380, dietaryTags: ["Fish", "Premium"], categorySlug: "vorta-bhaat" },
  { name: "শুটকি ভর্তা কম্বো", description: "চিতল শুটকি ভর্তা সাথে ভাত ও ডাল।", price: 220, dietaryTags: ["Fish", "Traditional", "Strong Flavor"], categorySlug: "vorta-bhaat" },
  { name: "১০ পদের থালা", description: "ভাত, ডাল, ভর্তা, ভাজি, মাছ/মাংস সাথে সালাদ।", price: 280, dietaryTags: ["Complete Meal", "Balanced"], categorySlug: "vorta-bhaat" },

  // পিঠা ও স্ন্যাকস
  { name: "চিতই পিঠা ও সুজি হালুয়া", description: "নরম চিতই পিঠা সাথে গরম সুজির হালুয়া।", price: 80, dietaryTags: ["Sweet", "Traditional"], categorySlug: "pitha-snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
  { name: "সিঙ্গারা (৪ পিস)", description: "আলু ও মটরশুটি দিয়ে ভরা ক্রিসপি সিঙ্গারা।", price: 60, dietaryTags: ["Vegetarian", "Fried"], categorySlug: "pitha-snacks" },
  { name: "পেঁয়াজু (৬ পিস)", description: "পেঁয়াজ ও ডালের বড়া। চা-এর সাথে পারফেক্ট।", price: 50, dietaryTags: ["Vegetarian", "Snack"], categorySlug: "pitha-snacks" },
  { name: "পাটিসাপটা পিঠা", description: "নারকেল ও খেজুর গুড় দিয়ে ভরাট পিঠা।", price: 100, dietaryTags: ["Sweet", "Traditional"], categorySlug: "pitha-snacks" },
  { name: "ভাপা পিঠা (৩ পিস)", description: "চালের গুঁড়া ও গুড়ের ভাপানো পিঠা।", price: 90, dietaryTags: ["Sweet", "Steamed"], categorySlug: "pitha-snacks" },

  // ডেজার্ট ও মিষ্টি
  { name: "জাফরানি ফিরনি", description: "মাটির পাত্রে জমানো সুগন্ধি চাল ও জাফরানের ফিরনি।", price: 80, dietaryTags: ["Sweet", "Dessert"], categorySlug: "desserts-sweets", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777" },
  { name: "গুলাব জামুন (৩ পিস)", description: "রসে টইটম্বুর নরম লাল মিষ্টি।", price: 60, dietaryTags: ["Sweet"], categorySlug: "desserts-sweets" },
  { name: "বগুড়ার দই", description: "ঐতিহ্যবাহী লাল মিষ্টি দই (১ কাপ)।", price: 70, dietaryTags: ["Dairy", "Traditional"], categorySlug: "desserts-sweets" },
  { name: "ক্যারামেল পুডিং", description: "ডিম এবং দুধের তৈরি স্মুথ ক্যারামেল পুডিং।", price: 120, dietaryTags: ["Sweet", "Egg"], categorySlug: "desserts-sweets" },
  { name: "ছানার পায়েস", description: "তাজা ছানা এবং ঘন দুধের সুস্বাদু মিশ্রণ।", price: 150, dietaryTags: ["Dairy", "Premium"], categorySlug: "desserts-sweets" },
  { name: "রসমালাই (২ পিস)", description: "মালাই ছানার বল রসে ভিজানো।", price: 140, dietaryTags: ["Dairy", "Premium"], categorySlug: "desserts-sweets" },
  { name: "সেমাই", description: "দুধ ও খেজুরের সেমাই। বাদাম দিয়ে সাজানো।", price: 100, dietaryTags: ["Sweet", "Traditional"], categorySlug: "desserts-sweets" },

  // চাইনিজ ও থাই
  { name: "চিকেন ফ্রাইড রাইস", description: "ডিম, সবজি ও চিকেন টুকরো সহ ভাজা চাল।", price: 180, dietaryTags: ["Chinese", "Rice"], categorySlug: "chinese-thai", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
  { name: "চিকেন চাউমিন", description: "হাক্কা নুডলস সবজি ও চিকেন দিয়ে ভাজা।", price: 160, dietaryTags: ["Chinese", "Noodles"], categorySlug: "chinese-thai" },
  { name: "থাই সুপ", description: "গালাঙ্গাল ও লেমনগ্রাস দিয়ে টক-ঝাল সুপ।", price: 140, dietaryTags: ["Thai", "Soup", "Spicy"], categorySlug: "chinese-thai" },
  { name: "স্প্রিং রোল (৬ পিস)", description: "সবজি ও চিকেন দিয়ে ভরা ক্রিসপি রোল।", price: 120, dietaryTags: ["Chinese", "Fried"], categorySlug: "chinese-thai" },
  { name: "সুইট এন্ড সাওয়ার চিকেন", description: "মিষ্টি টক সস-এ চিকেন ও ক্যাপসিকাম।", price: 220, dietaryTags: ["Chinese", "Sweet"], categorySlug: "chinese-thai" },

  // বার্গার ও স্যান্ডউইচ
  { name: "ক্লাসিক চিকেন বার্গার", description: "জুসি চিকেন প্যাটি, লেটুস, টমেটো ও সস।", price: 150, dietaryTags: ["Fast Food"], categorySlug: "burger-sandwich", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
  { name: "ডাবল ডেকার বিফ বার্গার", description: "২টি বিফ প্যাটি সাথে চিজ ও সবজি।", price: 280, dietaryTags: ["Beef", "Heavy"], categorySlug: "burger-sandwich" },
  { name: "ক্লাব স্যান্ডউইচ", description: "৩ স্তরে চিকেন, ডিম, টমেটো ও পনির।", price: 180, dietaryTags: ["Sandwich"], categorySlug: "burger-sandwich" },
  { name: "ভেজিটেবল বার্গার", description: "আলু ও সবজির প্যাটি দিয়ে বার্গার।", price: 120, dietaryTags: ["Vegetarian"], categorySlug: "burger-sandwich" },

  // জুস ও পানীয়
  { name: "মাল্টা জুস (৩৫০ মিলি)", description: "তাজা মাল্টার ফ্রেশ জুস। চিনি ছাড়া।", price: 80, dietaryTags: ["Juice", "Healthy"], categorySlug: "juice-drinks", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { name: "আম লাচ্ছি", description: "ম্যাঙ্গো পাল্প ও দই-এর ঘন শেক।", price: 100, dietaryTags: ["Dairy", "Sweet"], categorySlug: "juice-drinks" },
  { name: "তরমুজ জুস", description: "সিজনাল ওয়াটারমেলন জুস। বরফ দিয়ে।", price: 70, dietaryTags: ["Juice", "Refreshing"], categorySlug: "juice-drinks" },
  { name: "লেবু শরবত", description: "লেবু, পুদিনা ও লবণের ঠান্ডা শরবত।", price: 50, dietaryTags: ["Refreshing", "Traditional"], categorySlug: "juice-drinks" },
  { name: "বোরহানি (২৫০ মিলি)", description: "দই ও পুদিনা মিশ্রিত ঐতিহ্যবাহী পানীয়।", price: 60, dietaryTags: ["Dairy", "Savory"], categorySlug: "juice-drinks" },
];

const reviewComments: string[] = [
  "খুবই স্বাদু এবং ফ্রেশ। পরবর্তীতেও অর্ডার দেব।",
  "দামের তুলনায় পরিমাণ ভালো। রিকমেন্ড করছি।",
  "দেরিতে ডেলিভারি হলেও খাবার গরম ছিল।",
  "পুরান ঢাকার আসল স্বাদ পেয়েছি।",
  "বোরহানি একদম পারফেক্ট।",
  "খাসির মাংস নরম এবং মশলাদার।",
  "পরিবেশন ভালো। প্যাকেজিং ঠিক আছে।",
  "পরিবারের সবার পছন্দ হয়েছে।",
  "মাছের ঝোল তরকারি একদম ঘরের মতো।",
  "বিরিয়ানির চালের কোয়ালিটি অসাধারণ।",
  "মশলা একদম পারফেক্ট ছিল।",
  "পরিমাণ কম মনে হয়েছে।",
  "খুব ভালো লেগেছে। আবার নেব।",
  "সময়মতো ডেলিভারি হয়েছে।",
  "দাম একটু বেশি কিন্তু কোয়ালিটি ভালো।",
];

async function seedCategories() {
  console.log("Seeding categories...");
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c },
    });
  }
  console.log("✓ Categories seeded successfully.");
}

async function seedMeals() {
  console.log("Seeding meals...");
  const profile = await prisma.providerProfile.findFirst();
  if (!profile) {
    console.log("⚠ Meals skipped: No provider profile found. Create a provider profile first, then run seed again.");
    return;
  }

  const cats = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  const slugToId = Object.fromEntries(cats.map((c) => [c.slug ?? "", c.id]));

  let created = 0;
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
          image: item.image,
        },
      });
      created++;
    } catch (e) {
      console.error(`Error creating meal "${item.name}":`, (e as Error).message);
    }
  }
  console.log(`✓ ${created} meals seeded successfully.`);
}

const ADMIN_EMAIL = "admin@foodhub.com";

async function seedAdmin() {
  console.log("Seeding admin user...");
  const updated = await prisma.user.updateMany({
    where: { email: ADMIN_EMAIL },
    data: { role: "ADMIN" },
  });
  if (updated.count > 0) {
    console.log(`✓ Admin seeded: ${ADMIN_EMAIL} is now ADMIN.`);
  } else {
    console.log(
      `⚠ Admin skip: No user with email "${ADMIN_EMAIL}". Sign up with this email first, then run seed again to promote to ADMIN.`
    );
  }
}

async function seedReviews() {
  console.log("Seeding reviews...");
  const users = await prisma.user.findMany({ take: 10, select: { id: true } });
  const meals = await prisma.meal.findMany({ take: 20, select: { id: true } });

  if (users.length === 0 || meals.length === 0) {
    console.log(
      "⚠ Reviews skipped: Need at least one user and one meal. Sign up and ensure meals are seeded, then run seed again."
    );
    return;
  }

  let created = 0;
  const targetReviews = 30;

  for (const user of users) {
    const reviewsPerUser = Math.floor(Math.random() * 5) + 1; // 1-5 reviews per user
    for (let i = 0; i < reviewsPerUser && created < targetReviews; i++) {
      const randomMeal = meals[Math.floor(Math.random() * meals.length)];
      const rating = Math.random() > 0.2 ? (4 + Math.floor(Math.random() * 2)) : (2 + Math.floor(Math.random() * 2)); // 80% chance of 4-5 stars
      const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)];
      
      try {
        await prisma.review.create({
          data: {
            userId: user.id,
            mealId: randomMeal.id,
            rating,
            comment,
          },
        });
        created++;
      } catch (e: unknown) {
        const err = e as { code?: string };
        if (err.code !== "P2002") {
          // Skip duplicate user-meal combinations silently
          continue;
        }
      }
    }
    if (created >= targetReviews) break;
  }
  console.log(`✓ ${created} reviews seeded successfully.`);
}

async function main() {
  console.log("🌱 Starting seed process...\n");
  await seedCategories();
  await seedMeals();
  await seedAdmin();
  await seedReviews();
  console.log("\n✅ Seed process completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
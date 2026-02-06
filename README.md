FoodHub — Backend API (সংক্ষেপে)

FoodHub Backend হলো একটি শক্তিশালী REST API যা পুরো FoodHub meal-ordering অ্যাপকে চালায়। এখানে UI নেই—এটা শুধু authentication, data, আর business logic হ্যান্ডেল করে। Frontend আলাদা repo থেকে এই API-র সাথে কথা বলে।

FoodHub কী করে?

FoodHub এমন একটি প্ল্যাটফর্ম যেখানে:

Customers খাবার ব্রাউজ করতে পারে, ফিল্টার দিতে পারে (category/diet), অর্ডার প্লেস করতে পারে এবং রিভিউ দিতে পারে

Providers (রেস্টুরেন্ট) নিজের প্রোফাইল ও মেনু ম্যানেজ করে, অর্ডার দেখে ও স্ট্যাটাস আপডেট করে

Admins ইউজার, ক্যাটাগরি ও অর্ডার ম্যানেজ করে

ইউজাররা সাইন-আপের সময় role বেছে নেয়। Admin সাধারণত seed স্ক্রিপ্ট দিয়ে তৈরি করা হয়।

Tech Stack

Node.js + Express

TypeScript

PostgreSQL (Supabase / Neon / Local)

Prisma ORM

Better Auth (email/password, optional Google login)

কী কী ফিচার আছে?

Authentication (login, register, session-based auth)

Meals & Providers browsing

Cart → Order placement (Cash on Delivery)

Provider dashboard (meals + order status)

Reviews & ratings

Admin-only user & category management

সবকিছু clean REST API endpoint দিয়ে করা।

দ্রুত শুরু করতে চাইলে
git clone <repo>
cd food-hub-backend
npm install

.env ফাইলে লাগবে:

DATABASE_URL

PORT

BETTER_AUTH_SECRET

BETTER_AUTH_URL

APP_URL (frontend URL)

ডাটাবেস সেটআপ:

npx prisma migrate dev
npm run db:seed

সার্ভার রান:

Dev: npm run dev

Prod: npm run build && npm start

API কী কী করে (one glance)

Auth: register, login, current user

Public: meals, providers, categories

Customer: orders create & track

Provider: meals CRUD, order status update

Admin: users, orders, categories manage

☁️ Deploy করা যাবে যেখানে খুশি

Render, Railway, Fly.io বা যেকোনো Node hosting-এ।
শুধু .env ঠিক থাকলেই হবে (বিশেষ করে DATABASE_URL, APP_URL, BETTER_AUTH_URL)।

Bottom line

FoodHub Backend হলো পুরো অ্যাপের brain
Frontend শুধু UI দেখায়—সব আসল কাজ (auth, orders, roles, data) এই API করে।

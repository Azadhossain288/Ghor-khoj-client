# 🏠 GhorKhoj (ঘরখোঁজ) – AI-Powered Real Estate Platform

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 📖 Overview

**GhorKhoj (ঘরখোঁজ)** is a full-stack, AI-powered real estate listing and property discovery platform that enables users to explore, list, manage, and discover apartments, houses, land, and commercial properties.

The platform integrates intelligent AI capabilities including a **Smart Recommendation Engine** and an **Agentic AI Chat Assistant**, making property searching faster, smarter, and more personalized.

---

## ✨ Key Features

### 🏡 Property Management
- Browse all available properties
- Search by keyword
- Advanced filtering
- Sorting
- Pagination
- View detailed property information
- Add new property listings
- Manage personal listings (CRUD)

### 🤖 Smart Recommendation Engine
- Tracks user interactions
- Records:
  - Property views
  - Saved properties
  - Inquiries
  - Search filters
- Generates personalized recommendations using:
  - Rule-based weighted scoring
  - LLM re-ranking

### 💬 Agentic AI Chat Assistant
- Context-aware real estate assistant
- Property recommendations
- Budget-based search
- Location-based search
- Property type filtering
- Streaming responses
- Typing indicators
- Clickable suggestion chips
- Backend tool-calling support

### 🔐 Authentication
- Better Auth
- Email & Password Login
- Google OAuth
- Secure HTTP-only Cookies
- Demo Login

### 📊 Dashboard
- Saved Properties
- Personalized AI Recommendations
- User Activity

### 📈 Market Insights
- Interactive charts using Recharts
- Real estate statistics
- Market trends

---

# 🛠 Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Fetching | TanStack Query |
| Charts | Recharts |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | Better Auth |
| AI Provider | Google Gemini / Groq |
| Image Hosting | Cloudinary |

---

# 🎨 Color Palette

| Color | Hex |
|---------|------|
| Navy Blue | `#0F172A` |
| Amber | `#F59E0B` |
| Emerald Green | `#10B981` |
| Neutral Gray | `#F8FAFC` |

---

# 🗺️ Sitemap

## 🌐 Public Routes

| Route | Description |
|--------|-------------|
| `/` | Home Page |
| `/properties` | Property Explorer |
| `/properties/[id]` | Property Details |
| `/about` | About Us |
| `/contact` | Contact |
| `/blog` | Market Insights & Blog |
| `/login` | Login |
| `/register` | Register |

---

## 🔒 Protected Routes

| Route | Description |
|--------|-------------|
| `/dashboard` | User Dashboard |
| `/properties/add` | Add Property |
| `/properties/manage` | Manage Listings |
| `/chat` | AI Chat Assistant |

---

# 🧠 AI Features

## Smart Recommendation Engine

The recommendation engine analyzes user behavior and interactions to generate highly relevant property suggestions.

### Tracks

- Property Views
- Saved Properties
- Inquiries
- Search Filters

### Recommendation Flow

```
User Activity
      ↓
Interaction Collection
      ↓
Weighted Scoring
      ↓
LLM Re-ranking
      ↓
Personalized Recommendations
```

---

## 🤖 AI Chat Assistant

The conversational AI assistant can:

- Recommend properties
- Answer real estate questions
- Understand:
  - Budget
  - Location
  - Property Type
- Perform backend property searches
- Return matching listings instantly

---

# 🗄 Database Schema

## User

```ts
{
  name,
  email,
  passwordHash,
  avatar,
  authProvider,
  preferences: {
      budgetRange,
      preferredLocations,
      propertyType
  },
  createdAt
}
```

---

## Property

```ts
{
  title,
  shortDescription,
  fullDescription,
  price,
  location,
  type,
  bedrooms,
  bathrooms,
  area,
  images,
  ownerId,
  tags,
  views,
  createdAt
}
```

---

## Interaction

```ts
{
  userId,
  propertyId,
  type,
  createdAt
}
```

Types

- view
- save
- inquiry

---

## ChatMessage

```ts
{
  userId,
  sessionId,
  role,
  content,
  createdAt
}
```

Roles

- user
- assistant

---

## Inquiry

```ts
{
  propertyId,
  userId,
  name,
  email,
  message,
  createdAt
}
```

---

# 🚀 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| POST | `/api/auth/google` |
| GET | `/api/auth/me` |

---

## Properties

| Method | Endpoint |
|---------|----------|
| GET | `/api/properties` |
| GET | `/api/properties/:id` |
| POST | `/api/properties` |
| DELETE | `/api/properties/:id` |
| GET | `/api/properties/user/:userId` |

---

## Recommendation

| Method | Endpoint |
|---------|----------|
| POST | `/api/interactions/track` |
| GET | `/api/recommendations/:userId` |

---

## Chat

| Method | Endpoint |
|---------|----------|
| POST | `/api/chat/message` |
| GET | `/api/chat/history/:userId` |

---

## Inquiry

| Method | Endpoint |
|---------|----------|
| POST | `/api/inquiries` |

---

# ⚙️ Getting Started

## 1. Clone the Repositories

### Frontend

```bash
git clone https://github.com/your-username/ghorkhoj-client.git
```

### Backend

```bash
git clone https://github.com/your-username/ghorkhoj-server.git
```

---

## 2. Install Dependencies

### Frontend

```bash
npm install
```

### Backend

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file.

```env
MONGODB_URI=your_mongodb_atlas_connection_string

BETTER_AUTH_SECRET=your_better_auth_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

AI_API_KEY=your_gemini_or_groq_api_key
```

---

## 4. Seed the Database

Populate demo users and sample properties.

```bash
npm run seed
```

---

## 5. Start Development Servers

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 📂 Project Structure

```
Frontend
│
├── app
├── components
├── hooks
├── services
├── providers
├── lib
├── types
├── public
└── styles

Backend
│
├── src
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── services
│   ├── utils
│   ├── config
│   └── server.ts
```

---

# 🌟 Future Improvements

- Property Comparison
- Mortgage Calculator
- Interactive Maps
- Nearby Schools & Hospitals
- Voice-enabled AI Assistant
- AI Price Prediction
- Email Notifications
- Push Notifications
- Admin Dashboard
- Property Analytics
- Dark Mode
- Multi-language Support

---

# 👨‍💻 Author

**Azad Hossain**

CSE Student | Full Stack Developer

---

# ⭐ Support

If you like this project, don't forget to **⭐ Star** the repository and contribute to make GhorKhoj even better.

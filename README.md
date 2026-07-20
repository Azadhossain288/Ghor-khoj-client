GhorKhoj: AI-Powered Real Estate PlatformGhorKhoj (ঘরখোঁজ) is a full-stack, agentic AI-driven real estate listing and discovery platform. It empowers users to search, list, filter, and discover properties (apartments, houses, land, and commercial spaces) with intelligent agentic features including a Smart Recommendation Engine and an AI Chat Assistant.🛠️ Technology StackLayerTechnologyFrontendNext.js (App Router) + TypeScriptStylingTailwind CSSData FetchingTanStack QueryChartsRecharts (Market Statistics)BackendNode.js + Express.js + TypeScriptDatabaseMongoDB Atlas (Cloud-hosted, Mongoose ODM)AuthenticationBetter Auth (Email/Password + Google OAuth, MongoDB adapter)AI ProviderGoogle Gemini or GroqImage HostingCloudinary / Image URLsColor PaletteNavy Blue: #0F172A (Primary)Amber: #F59E0B (Accent)Emerald Green: #10B981 (Success / Highlights)Neutral Gray: #F8FAFC (Background)🗺️ Page Structure & SitemapPublic Routes/ — Home Page/properties — Property Explorer (Search, Filter, Sort, Pagination)/properties/[id] — Property Details Page/about — About Us/contact — Contact Form/blog — Market Insights & Blog/login — Login (Demo Login + Google OAuth)/register — User RegistrationProtected Routes (Authentication Required)/properties/add — Add New Property Listing/properties/manage — Manage User Listings (CRUD)/dashboard — User Dashboard (Saved Properties, AI Recommendations)/chat — Dedicated AI Assistant Chat Page⚙️ Core Architecture & Features1. Smart Recommendation EngineTracks user behavior (interactions collection: views, saves, inquiries, and search filters).Computes weighted rule-based scoring combined with LLM re-ranking to deliver personalized property suggestions on the user dashboard.2. Agentic AI Chat AssistantContext-aware conversational assistant capable of answering real estate queries and recommending properties.Features tool-calling (agentic behavior), allowing the assistant to parse user requirements (budget, location, property type) and directly execute backend search functions.Includes streaming responses, typing indicators, and clickable follow-up suggestion chips.3. Authentication (Better Auth)Secure session management via HTTP-only, secure cookies.Email/Password authentication and Google OAuth integration.Built-in Demo Login button backed by a seeded database user for instant access.🗄️ Database Schemas (MongoDB / Mongoose)User: name, email, passwordHash, avatar, authProvider, preferences (budgetRange, preferredLocations, propertyType), createdAtProperty: title, shortDescription, fullDescription, price, location, type, bedrooms, bathrooms, area, images, ownerId, tags, views, createdAtInteraction: userId, propertyId, type ("view" | "save" | "inquiry"), createdAtChatMessage: userId, sessionId, role ("user" | "assistant"), content, createdAtInquiry: propertyId, userId, name, email, message, createdAt🚀 API Endpoints OverviewHTTPPOST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/google
GET    /api/auth/me

GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
DELETE /api/properties/:id
GET    /api/properties/user/:userId

POST   /api/interactions/track
GET    /api/recommendations/:userId

POST   /api/chat/message
GET    /api/chat/history/:userId
POST   /api/inquiries
🏃 Getting Started & SetupClone the Repositories (Frontend and Backend)Configure Environment Variables (.env):Code snippetMONGODB_URI=your_mongodb_atlas_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AI_API_KEY=your_gemini_or_groq_api_key
Run the Database Seeder (to populate demo user and sample properties):Bashnpm run seed
Run Development Servers:Backend: npm run devFrontend: npm run dev

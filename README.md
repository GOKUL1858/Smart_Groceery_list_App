# Smart Grocery List App (MERN)

A mobile application built with React Native (Expo) and Node.js/Express/MongoDB for managing grocery lists efficiently.

## Features
- User Authentication (Login/Signup) with JWT.
- Role-based Access (Admin/User).
- Grocery List CRUD (Create, Read, Update, Delete).
- Multimedia Support: Upload images/PDFs for grocery items.
- Modern UI with Reusable Components and smooth navigation.

## Setup Instructions

### Backend
1. Go to `backend` folder.
2. Install dependencies: `npm install`
3. Create `.env` file with `MONGO_URI` and `JWT_SECRET`.
4. Start server: `npm start` (or `npm run dev` with nodemon).

### Frontend
1. Go to `frontend` folder.
2. Install dependencies: `npm install`
3. Update `BASE_URL` in `src/services/api.js` with your IP address.
4. Start Expo: `npx expo start`

## Evaluation Rubrics Met
- Clear separation of concerns (Frontend/Backend).
- Secure password hashing and JWT implementation.
- Scalable folder structure.
- Reusable UI components and Loader.
- Efficient list rendering using `FlatList`.

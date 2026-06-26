# inventory-dashboard
A full-stack inventory dashboard built with NestJS, PostgreSQL, Next.js, and Tailwind CSS.

## Tech Stack

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Cache Manager

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Project Structure
inventory-dashboard/
├── backend/
└── frontend/

## Setup

### Backend
cd backend
npm install
npm run start:dev

### Frontend
cd frontend
npm install
npm run dev

```Copy .env.example to .env and update the database credentials.```

## Seed Data
POST /api/items/seed

Run this endpoint once to populate the database.

## API
GET /api/items?page=1&limit=10
GET /api/items?page=1&limit=10&category=Electronics
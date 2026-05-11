# DM CLOTHS

Production-ready MERN stack app for custom T-shirt orders with WhatsApp checkout.

## Project structure
- backend
- frontend

## Backend setup
1. Install dependencies:
   - cd backend
   - npm install
2. Create .env (copy from .env.example) and fill values:
   - PORT=5000
   - MONGO_URI=your_mongodb_uri
   - JWT_SECRET=your_jwt_secret
   - ADMIN_BOOTSTRAP_KEY=your_bootstrap_key
   - CLOUDINARY_NAME=your_cloudinary_name
   - CLOUDINARY_API_KEY=your_cloudinary_key
   - CLOUDINARY_API_SECRET=your_cloudinary_secret
3. Start the server:
   - npm run dev

## Bootstrap the first admin
This is a one-time endpoint. It will refuse if an admin already exists.

Example:
curl -X POST http://localhost:5000/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -H "x-bootstrap-key: YOUR_BOOTSTRAP_KEY" \
  -d "{\"username\":\"admin\",\"password\":\"your-strong-password\"}"

## Frontend setup
1. Install dependencies:
   - cd frontend
   - npm install
2. Create .env (copy from .env.example) and fill values:
   - VITE_API_URL=http://localhost:5000
   - VITE_WHATSAPP_NUMBER=94771234567
3. Start the app:
   - npm run dev

## Notes
- Admin login: POST /api/admin/login
- Inventory: GET/POST/PUT/DELETE /api/tshirts
- Order intents: POST /api/orders/intent (with multipart sticker upload)
- Order intents (admin): GET /api/orders/intents

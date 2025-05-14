import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('✅ База данных подключена успешно'))
.catch((err) => console.error('❌ Ошибка подключения к базе данных:', err));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

mongoose.connection.on("error", err => {
  console.error("Ошибка MongoDB:", err);
});

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB подключена");
});
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');

    const hashedPassword = await bcrypt.hash('12345678', 10);

    const testUser = new User({
      email: 'testuser@gmail.com',
      password: hashedPassword,
      fullName: 'Test User',
      username: 'testuser',
      phone: '87771234567',
      gender: 'Мужской',
      country: 'Kazakhstan',
      language: 'Русский',
      timezone: 'Asia/Almaty'
    });

    await testUser.save();
    console.log('✅ Test user created successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating user:', err);
    mongoose.disconnect();
  }
}

createTestUser();

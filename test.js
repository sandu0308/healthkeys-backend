import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Успешно подключено к MongoDB');
    mongoose.connection.close(); // закрываем сразу после теста
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к MongoDB:', err.message);
  });


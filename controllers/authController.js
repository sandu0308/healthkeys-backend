import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, username, phone, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Пользователь уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      username,
      phone,
      gender
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Пользователь зарегистрирован' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Неверный пароль' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ success: true, message: 'Вход выполнен', token });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

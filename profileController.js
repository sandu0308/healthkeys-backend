import User from '../models/User.js';

export const getProfile = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { email } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }

    res.status(200).json({ success: true, message: 'Профиль обновлён', user: updatedUser });
  } catch (err) {
    next(err);
  }
};

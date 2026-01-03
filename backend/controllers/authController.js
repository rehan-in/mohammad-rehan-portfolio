const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'Email not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.tokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_password',
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Password Reset',
    html: `<p>Click to reset: <a href="${resetUrl}">${resetUrl}</a></p>`,
  });

  res.json({ msg: 'Reset link sent to your email.' });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.resetToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  res.json({ msg: 'Password has been updated.' });
};

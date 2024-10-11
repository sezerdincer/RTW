// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(403).json({ message: 'Invalid credentials or access denied.' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '8h' });
 
  
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8 saat
    })
    .json({ message: 'Login successful' });
};
export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });
  res.json({ message: 'Logout successful' });
};

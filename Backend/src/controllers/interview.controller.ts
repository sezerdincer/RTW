// controllers/interview.controller.ts
import { Request, Response } from 'express';
import { Interview } from '../models/Interview';

// Yeni bir mülakat oluştur
export const createInterview = async (req: Request, res: Response) => {
  const { title, packages, expireDate, canSkip, showAtOnce } = req.body;

  try {
    const newInterview = new Interview({
      title,
      packages,
      expireDate,
      canSkip,
      showAtOnce,
    });
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Tüm mülakatları getir ve expireDate’e göre status’u kontrol et
export const getInterviews = async (req: Request, res: Response) => {
  try {
    const interviews = await Interview.find().populate('packages');

    // Her mülakatın expireDate’ini kontrol et ve status'u güncelle
    interviews.forEach(async (interview) => {
      const currentDate = new Date();
      if (interview.expireDate && interview.expireDate < currentDate && interview.status !== 'Unpublished') {
        interview.status = 'Unpublished';
        await interview.save(); // Güncellenmiş status'u kaydet
      } else if (interview.expireDate && interview.expireDate >= currentDate && interview.status !== 'Published') {
        interview.status = 'Published';
        await interview.save();
      }
    });

    res.status(200).json(interviews);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Belirli bir mülakatı ID'ye göre getir
export const getInterviewById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundInterview = await Interview.findById(id).populate('packages');
    if (!foundInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Status kontrolü yap
    const currentDate = new Date();
    if (foundInterview.expireDate && foundInterview.expireDate < currentDate && foundInterview.status !== 'Unpublished') {
      foundInterview.status = 'Unpublished';
      await foundInterview.save();
    } else if (foundInterview.expireDate && foundInterview.expireDate >= currentDate && foundInterview.status !== 'Published') {
      foundInterview.status = 'Published';
      await foundInterview.save();
    }

    res.status(200).json(foundInterview);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Bir mülakatı güncelle
export const updateInterview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, packages, expireDate, canSkip, showAtOnce } = req.body;

  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      id,
      { title, packages, expireDate, canSkip, showAtOnce },
      { new: true }
    ).populate('packages');

    if (!updatedInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Güncellenen mülakatın status’unu kontrol et
    const currentDate = new Date();
    if (updatedInterview.expireDate && updatedInterview.expireDate < currentDate) {
      updatedInterview.status = 'Unpublished';
    } else {
      updatedInterview.status = 'Published';
    }
    await updatedInterview.save();

    res.status(200).json(updatedInterview);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Bir mülakatı sil
export const deleteInterview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedInterview = await Interview.findByIdAndDelete(id);

    if (!deletedInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({ message: 'Interview deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

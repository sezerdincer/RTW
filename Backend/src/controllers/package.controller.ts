import { Request, Response } from 'express';
import { Package } from '../models/package';
import {deletePc} from "../service/package.service"

// Create a new package
export const createPackage = async (req: Request, res: Response) => {
  const { packageName, questions } = req.body;

  try {
    const newPackage = new Package({ packageName, questions });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Get all packages
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get a single package by ID
export const getPackageById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const foundPackage = await Package.findById(id);
    if (!foundPackage) {
       res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(foundPackage);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Update a package (including its questions)
export const updatePackage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { packageName, questions } = req.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { packageName, questions },
      { new: true }
    );

    if (!updatedPackage) {
       res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete a package
export const deletePackage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deletePc(1)
    if(response){
      res.status(200).json({ message: 'Package deleted successfully' });
    }
    res.status(500).json({ message: 'Package no deleted' });
   

   
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
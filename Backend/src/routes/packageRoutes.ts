import express from 'express';
import { createPackage,deletePackage,getPackages,updatePackage,getPackageById } from '../controllers/package.controller';

const router = express.Router();

router.post('/', createPackage); // Create a new package
router.get('/', getPackages); // Get all packages
router.get('/:id', getPackageById); // Get package by ID
router.put('/:id', updatePackage); // Update a package
router.delete('/:id', deletePackage); // Delete a package

export default router;
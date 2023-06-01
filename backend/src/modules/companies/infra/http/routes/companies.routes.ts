import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductsController from '../controllers/CompaniesController';

const companiesController = new ProductsController();

const companiesRouter = Router();

const upload = multer(uploadConfig.multer);

companiesRouter.post(
  '/',
  upload.single('profile_photo'),
  companiesController.create,
);

export default companiesRouter;

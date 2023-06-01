import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/UsersController';

import { create, id, auth } from './validations/users.validation';

const upload = multer(uploadConfig.multer);

const usersController = new ProductsController();

const usersRouter = Router();

usersRouter.post('/', create, usersController.create);

usersRouter.get('/:id', id, usersController.show);

usersRouter.get('/', usersController.find);

usersRouter.post('/auth', auth, usersController.auth);

usersRouter.put(
  '/',
  ensureAuthenticated,
  upload.single('profile_photo'),
  usersController.update,
);

export default usersRouter;

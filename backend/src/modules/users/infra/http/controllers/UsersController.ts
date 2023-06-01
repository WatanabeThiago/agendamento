import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserService from '@modules/users/services/UpdateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import ShowUserService from '../../../services/ShowUserService';
import FindUserService from '../../../services/FindUserService';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute(req.body);

    return res.status(201).json(classToClass(user));
  }

  public async auth(req: Request, res: Response): Promise<Response> {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const data = await authenticateUserService.execute(req.body);

    return res.status(200).json(classToClass(data));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({
      user_id: req.params.id,
    });

    res.json(classToClass(user));
  }

  public async find(req: Request, res: Response): Promise<void> {
    const findUserService = container.resolve(FindUserService);

    const { email, phone } = req.query;
    const user = await findUserService.execute({
      email: email as string,
      phone: phone as string,
    });

    console.log({ user });
    res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<void> {
    const updateUserService = container.resolve(UpdateUserService);

    let filename: string | undefined;
    if (req.file) {
      filename = req.file.filename;
    }

    const user = await updateUserService.execute({
      user_id: req.user.id,
      profile_photo: filename,
      deleted: req.body.deleted,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone,
    });

    res.json(classToClass(user));
  }
}

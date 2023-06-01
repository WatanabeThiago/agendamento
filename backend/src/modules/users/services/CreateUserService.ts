import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import RolesEnum from '@shared/enums/RolesEnum';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IUserRolesRepository from '../repositories/IUserRolesRepository';

type CreateUserServiceReq = {
  name: string;
  phone: string;
  email?: string;
  profile_photo?: string;
  password?: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserRolesRepository')
    private userRolesRepository: IUserRolesRepository,
  ) {}

  public async execute({
    name,
    phone,
    email,
    password,
    profile_photo,
  }: CreateUserServiceReq): Promise<User> {
    const phoneAlreadyUsed = await this.usersRepository.findByPhone(phone);

    if (phoneAlreadyUsed) {
      throw new AppError('Telefone já registrado.', 409, 'phone_already_used');
    }

    if (email) {
      const emailAreadyUsed = await this.usersRepository.findByEmail(email);
      if (emailAreadyUsed) {
        throw new AppError('Email já registrado.', 409, 'email_already_used');
      }
    }

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const user = this.usersRepository.create({
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      password,
      profile_photo,
    });

    const userRole = this.userRolesRepository.create({
      id: crypto.randomUUID(),
      role_id: RolesEnum.Customer,
      user_id: user.id,
    });
    await this.usersRepository.insert(user);
    await this.userRolesRepository.save(userRole);

    user.user_roles = [userRole];
    return user;
  }
}

export default CreateUserService;

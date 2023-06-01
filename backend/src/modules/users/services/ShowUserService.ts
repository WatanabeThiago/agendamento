import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

type ShowUserServiceReq = {
  user_id: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: ShowUserServiceReq): Promise<User> {
    const user = await this.usersRepository.findById(user_id, []);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404, 'user_not_found');
    }
    return user;
  }
}

export default CreateUserService;

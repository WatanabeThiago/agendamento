import { getRepository, Repository } from 'typeorm';

import ICreateUserRoleDTO from '@modules/users/dtos/ICreateUserRoleDTO';
import IUserRolesRepository from '../../../repositories/IUserRolesRepository';

import UserRole from '../entities/UserRole';

class UserRolesRepository implements IUserRolesRepository {
  private ormRepository: Repository<UserRole>;

  constructor() {
    this.ormRepository = getRepository(UserRole);
  }

  public create(user: ICreateUserRoleDTO): UserRole {
    return this.ormRepository.create(user);
  }

  public async save(data: UserRole): Promise<UserRole> {
    console.log({ data });
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserRolesRepository;

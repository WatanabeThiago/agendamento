import { getRepository, Repository } from 'typeorm';

import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  findByPhone(phone: string, relations?: string[]): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { phone },
      relations,
    });
  }

  findByEmail(email: string, relations?: string[]): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
      relations,
    });
  }

  public async index(): Promise<User[]> {
    const breeds = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return breeds;
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findBy({
    email,
    phone,
  }: IFindUserDTO): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: clearJson({ email, phone }),
    });
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user;
  }

  public create(user: ICreateProductDTO): User {
    return this.ormRepository.create(user);
  }

  public async save(data: User): Promise<User> {
    return this.ormRepository.save(data);
  }

  public async insert(data: User): Promise<void> {
    await this.ormRepository.insert(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersRepository;

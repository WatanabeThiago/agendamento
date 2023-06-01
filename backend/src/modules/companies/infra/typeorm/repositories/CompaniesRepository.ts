import { getRepository, Repository } from 'typeorm';

import ICompaniesRepository from '../../../repositories/ICompaniesRepository';
import ICreateProductDTO from '../../../dtos/ICreateCompanyDTO';

import User from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async index(): Promise<User[]> {
    const companies = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return companies;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id },
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

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CompaniesRepository;

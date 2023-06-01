import { getRepository, Repository } from 'typeorm';

import ICreateUserCompanyDTO from '@modules/companies/dtos/ICreateUserCompanyDTO';
import IUserCompaniesRepository from '../../../repositories/IUserCompaniesRepository';

import UserCompany from '../entities/UserCompany';

class UserCompaniesRepository implements IUserCompaniesRepository {
  private ormRepository: Repository<UserCompany>;

  constructor() {
    this.ormRepository = getRepository(UserCompany);
  }

  create(data: ICreateUserCompanyDTO): UserCompany {
    throw new Error('Method not implemented.');
  }

  public async save(data: UserCompany): Promise<UserCompany> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserCompaniesRepository;

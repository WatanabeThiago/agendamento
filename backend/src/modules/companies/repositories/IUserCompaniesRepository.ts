import UserCompany from '../infra/typeorm/entities/UserCompany';
import ICreateUserCompanyDTO from '../dtos/ICreateUserCompanyDTO';

export default interface IUserCompaniesRepository {
  create(data: ICreateUserCompanyDTO): UserCompany;
  save(data: UserCompany): Promise<UserCompany>;
  delete(id: string): Promise<void>;
}

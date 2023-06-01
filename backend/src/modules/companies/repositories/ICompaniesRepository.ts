import Company from '../infra/typeorm/entities/Company';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

export default interface ICompaniesRepository {
  index(): Promise<Company[]>;
  findByName(name: string): Promise<Company | undefined>;
  findById(id: string, relations?: string[]): Promise<Company | undefined>;
  create(data: ICreateCompanyDTO): Company;
  save(data: Company): Promise<Company>;
  delete(id: string): Promise<void>;
}

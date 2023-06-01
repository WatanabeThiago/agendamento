import { injectable, inject } from 'tsyringe';

import ICompaniesRepository from '../repositories/ICompaniesRepository';
import Company from '../infra/typeorm/entities/Company';

@injectable()
class IndexCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    // TODO: Adicionar filtros futuramente
    return this.companiesRepository.index();
  }
}

export default IndexCompaniesService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

type DeleteCompanyServiceReq = {
  user_id: string;
  company_id: string;
};

@injectable()
class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    user_id,
    company_id,
  }: DeleteCompanyServiceReq): Promise<void> {
    const company = await this.companiesRepository.findById(company_id, [
      'user_companies',
    ]);

    if (!company) {
      throw new AppError(
        'Empresa já deletada.',
        404,
        'company_already_deleted',
      );
    }

    const userIsOwner = company.user_companies.find(
      userCompany => userCompany.user_id === user_id,
    );

    if (!userIsOwner) {
      throw new AppError(
        'Você não é dono dessa empresa.',
        403,
        'user_is_not_a_company_owner',
      );
    }

    await this.companiesRepository.delete(company_id);
  }
}

export default DeleteCompanyService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserCompaniesRepository from '@modules/companies/repositories/IUserCompaniesRepository';
import RolesEnum from '@shared/enums/RolesEnum';
import IUserRolesRepository from '@modules/users/repositories/IUserRolesRepository';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import User from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

type CreateCompanyServiceReq = {
  user_id: string;
  name: string;
  phone: string;
  profile_photo?: string;
};

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserCompaniesRepository')
    private userCompaniesRepository: IUserCompaniesRepository,

    @inject('UserRolesRepository')
    private userRolesRepository: IUserRolesRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({
    name,
    phone,
    profile_photo,
    user_id,
  }: CreateCompanyServiceReq): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário deletado.', 403, 'user_not_exists');
    }

    const companyAlreadyExists = await this.companiesRepository.findByName(
      name,
    );

    if (companyAlreadyExists) {
      throw new AppError('Nome já em uso.', 409, 'company_name_already_exists');
    }

    const company = this.companiesRepository.create({
      id: crypto.randomUUID(),
      name,
      profile_photo,
      phone,
    });

    const userCompany = this.userCompaniesRepository.create({
      id: crypto.randomUUID(),
      user_id,
      company_id: company.id,
    });

    // TODO: Futuramente, adicionar recepcionistas
    const userAlreadyEnterpreuner = user.user_roles.find(
      userRole => userRole.role_id === RolesEnum.Enterpreuner,
    );
    if (!userAlreadyEnterpreuner) {
      await this.userRolesRepository.save(
        this.userRolesRepository.create({
          id: this.idGeneratorProvider.generate(),
          role_id: RolesEnum.Enterpreuner,
          user_id,
        }),
      );
    }

    /* 

    TODO: Refatorar
    TODO: Objtivo é deixar isso salvo numa linha só. Evitando chamadas desnecessárias ao banco.

    */
    await this.companiesRepository.save(company);
    await this.userCompaniesRepository.save(userCompany);

    return company;
  }
}

export default CreateCompanyService;

import AppError from '@shared/errors/AppError';

import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import CreateCompanyService from './CreateCompanyService';

let fakeCompaniesRepository: FakeCompaniesRepository;

let createCompanyService: CreateCompanyService;

describe('CreateCompanyService', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();

    createCompanyService = new CreateCompanyService(fakeCompaniesRepository);
  });

  it('1. Should be able to create a new user without: email, password and profile_photo.', async () => {
    // ? Arrange

    // ? Act
    const user = await createCompanyService.execute({
      name: 'Espaço Cleo Pires - Bronzeamento',
      phone: '+55675985791513',
    });

    // ? Assert
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Thiago Watanabe');
    expect(user.phone).toBe('+55675985791513');
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;

let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('1. Should be able to create a new user without: email, password and profile_photo.', async () => {
    // ? Arrange

    // ? Act
    const user = await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+55675985791513',
    });

    // ? Assert
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Thiago Watanabe');
    expect(user.phone).toBe('+55675985791513');
  });
  it('2. Should be able to create a new user witht all fields', async () => {
    // ? Arrange

    // ? Act
    const user = await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+55675985791513',
      email: 'email@test.com',
      password: 'password',
      profile_photo: 'teste',
    });

    // ? Assert
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Thiago Watanabe');
    expect(user.phone).toBe('+55675985791513');
  });
  it('3. Should throw Error when email conflict.', async () => {
    // ? Arrange
    await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+999',
      email: 'duplicated@test.com',
    });
    // ? Act

    expect(
      createUserService.execute({
        name: 'Thiago Watanabe',
        phone: '+55675985791513',
        email: 'duplicated@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('4. Should throw Error when phone conflict.', async () => {
    // ? Arrange
    await createUserService.execute({
      name: 'Thiago Watanabe',
      phone: '+999',
    });
    // ? Act

    expect(
      createUserService.execute({
        name: 'Thiago Watanabe',
        phone: '+999',
        email: 'duplicated@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

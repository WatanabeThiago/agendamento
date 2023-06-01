import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  async findByPhone(phone: string): Promise<User | undefined> {
    const user = this.products.find(item => item.phone === phone);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.products.find(item => item.email === email);

    return user;
  }

  private products: User[] = [];

  public async index(): Promise<User[]> {
    return this.products;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.products.find(item => item.name === name);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.products.find(item => item.id === id);

    return user;
  }

  public create(data: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, data);

    this.products.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.products.push(user);
    return user;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.products.findIndex(item => item.id === id);

    this.products.splice(userIndex, 1);
  }
}

export default FakeUsersRepository;

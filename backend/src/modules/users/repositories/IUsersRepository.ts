import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

export default interface IUsersRepository {
  index(): Promise<User[]>;
  findByName(name: string): Promise<User | undefined>;
  findByPhone(phone: string, relations?: string[]): Promise<User | undefined>;
  findByEmail(email: string, relations?: string[]): Promise<User | undefined>;
  findById(id: string, relations?: string[]): Promise<User | undefined>;
  create(data: ICreateUserDTO): User;
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
  insert(data: User): Promise<void>;
  findBy({ email, phone }: IFindUserDTO): Promise<User | undefined>;
}

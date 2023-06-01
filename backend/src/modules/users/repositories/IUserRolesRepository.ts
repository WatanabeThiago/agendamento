import UserRole from '../infra/typeorm/entities/UserRole';
import ICreateUserRoleDTO from '../dtos/ICreateUserRoleDTO';

export default interface IUserRolesRepository {
  create(data: ICreateUserRoleDTO): UserRole;
  save(data: UserRole): Promise<UserRole>;
  delete(id: string): Promise<void>;
}

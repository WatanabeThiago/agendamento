import User from '../infra/typeorm/entities/User';

export default interface ICreateUserRoleDTO {
  id: string;
  role_id: number;
  user_id: string;
}

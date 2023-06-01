import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import UserRole from './UserRole';

@Entity('roles')
class Role {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  // * Relations
  @OneToMany(() => UserRole, userRole => userRole.role)
  user_roles: UserRole[];
}

export default Role;

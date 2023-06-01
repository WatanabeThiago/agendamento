import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Role from './Role';
import User from './User';

@Entity('user_roles')
class UserRole {
  @PrimaryColumn()
  id: string;

  @Column()
  role_id: number;

  @Column()
  user_id: string;

  // * Relations
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User, user => user.user_roles, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default UserRole;

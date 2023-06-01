import Company from '@modules/companies/infra/typeorm/entities/Company';
import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('user_companies')
class UserCompany {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  company_id: string;

  // ? Relations

  @ManyToOne(() => User, user => user.user_companies)
  user: User;

  @ManyToOne(() => Company, company => company.user_companies)
  company: Company;

  @CreateDateColumn()
  created_at: Date;
}

export default UserCompany;

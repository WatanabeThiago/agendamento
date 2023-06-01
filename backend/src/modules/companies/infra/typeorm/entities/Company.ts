import UserCompany from '@modules/companies/infra/typeorm/entities/UserCompany';
import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  profile_photo?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // * Relations
  @OneToMany(() => UserCompany, userCompanies => userCompanies.company)
  user_companies: UserCompany[];
}

export default Company;

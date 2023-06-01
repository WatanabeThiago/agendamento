import { Exclude, Expose } from 'class-transformer';
import 'reflect-metadata';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import uploadConfig from '@config/upload';
import UserCompany from '../../../../companies/infra/typeorm/entities/UserCompany';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email?: string;

  @Column()
  profile_photo?: string;

  @Column()
  @Exclude()
  password?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  deleted_at?: Date;

  // * Relations
  @OneToMany(() => UserCompany, userCompanies => userCompanies.user)
  user_companies: UserCompany[];

  @OneToMany(() => UserRole, userRoles => userRoles.user, {
    cascade: ['insert', 'update'],
  })
  user_roles: UserRole[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refresh_tokens: RefreshToken[];

  @Expose({ name: 'profile_photo' })
  getAvatarUrl(): string | null {
    if (!this.profile_photo) {
      return process.env.DEFAULT_USER_AVATAR_URL || '';
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.profile_photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.${process.env.DIGITAL_OCEAN_ENDPOINT}/${this.profile_photo}`;
      default:
        return null;
    }
  }
}

export default User;

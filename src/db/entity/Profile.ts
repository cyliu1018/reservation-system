import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'email', type: 'text', unique: true })
  email: string;

  @Column({ name: 'invite_code', type: 'text', unique: true })
  inviteCode: string;

  @Column({ name: 'referrer', type: 'text', nullable: true })
  referrer: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}

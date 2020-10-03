import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { v4 } from 'uuid';
import { Service } from './Service';

export enum ServiceCategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity()
export class ServiceCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  imageUrl!: string;

  @Column({
    type: 'text',
    default:
      'https://firebasestorage.googleapis.com/v0/b/newagent-c4a5f.appspot.com/o/images%2FAircon.svg?alt=media&token=c8687aea-84f1-40fa-9849-ecd0cee255d6',
  })
  iconUrl!: string;

  @Column({ type: 'text', default: ServiceCategoryStatus.ACTIVE })
  status!: ServiceCategoryStatus;

  @Column({ type: 'text', unique: true })
  slug!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @OneToMany(
    () => Service,
    service => service.serviceCategory,
  )
  services!: Service[];
}

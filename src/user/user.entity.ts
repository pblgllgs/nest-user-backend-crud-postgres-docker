import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

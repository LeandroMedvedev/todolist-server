import { compare } from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Task } from './Task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly userUuid?: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @ManyToMany(() => Task, { eager: true })
  @JoinTable()
  tasks: Task[];

  comparePassword = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };
}

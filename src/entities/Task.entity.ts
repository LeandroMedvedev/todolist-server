import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  readonly taskUuid?: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ default: false })
  completed?: boolean;

  @Column('uuid', { nullable: true })
  userUuid?: string;
}

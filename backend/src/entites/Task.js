import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done'
};

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ type: 'varchar', length: 255 })
  title;

  @Column({ type: 'text', nullable: true })
  description;

  @Column({
    type: 'enum',
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO
  })
  status;

  @Column({ type: 'date', nullable: true })
  dueDate;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}
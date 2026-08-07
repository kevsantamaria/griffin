import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Technology } from '../../technologies/entities/technology.entity'

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string

  @Column({ type: 'boolean', default: true })
  isInternal: boolean

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column()
  technologyId: number

  @ManyToOne(() => Technology)
  technology: Technology

  @Column({ type: 'jsonb', nullable: true })
  credentials: Record<string, string>[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

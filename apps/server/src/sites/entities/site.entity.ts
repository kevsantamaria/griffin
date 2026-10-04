import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Technology } from '../../technologies/entities/technology.entity'
import { SiteTag } from './site-tag.entity'

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string | null

  @Column({ type: 'boolean', default: true })
  isInternal: boolean

  @Column({ type: 'text', nullable: true })
  notes: string | null

  @Column()
  technologyId: number

  @ManyToOne(() => Technology)
  technology: Technology

  @Column({ type: 'jsonb' })
  credentials: string

  @OneToMany(() => SiteTag, (siteTag) => siteTag.site)
  siteTags: SiteTag[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

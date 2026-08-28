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

export type CredentialField = {
  label: string
  content: string
  type: 'text' | 'password' | 'email' | 'url'
}

export type CredentialGroup = {
  header: string
  fields: CredentialField[]
}

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

  @Column({ type: 'jsonb' })
  credentials: CredentialGroup[]

  @OneToMany(() => SiteTag, (siteTag) => siteTag.site)
  siteTags: SiteTag[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OneToMany } from 'typeorm/browser'

import { Technology } from '../../technologies/entities/technology.entity'
import { TemplateTag } from './template-tag.entity'

export type TemplateField = {
  label: string
  type: 'text' | 'password' | 'email' | 'url'
}

export type TemplateGroup = {
  header: string
  fields: TemplateField[]
}

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'jsonb' })
  groups: TemplateGroup[]

  @Column()
  technologyId: number

  @ManyToOne(() => Technology)
  technology: Technology

  @OneToMany(() => TemplateTag, (templateTag) => templateTag.template)
  templateTags: TemplateTag[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

import { TemplateGroup } from '@griffin/schemas'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OneToMany } from 'typeorm/browser'

import { Technology } from '../../technologies/entities/technology.entity.js'
import { TemplateTag } from './template-tag.entity.js'

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, unique: true, collation: 'case_insensitive' })
  name: string

  @Column({ type: 'jsonb' })
  groups: TemplateGroup[]

  @Column()
  technologyId: number

  @ManyToOne(() => Technology)
  technology: Technology

  @OneToMany(() => TemplateTag, (templateTag) => templateTag.template)
  templateTags: TemplateTag[]

  @Column()
  slug: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

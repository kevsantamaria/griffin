import { Entity, ManyToOne, PrimaryColumn, type Relation } from 'typeorm'

import { Tag } from '../../tags/entities/tag.entity.js'
import { Template } from './template.entity.js'

@Entity('template_tags')
export class TemplateTag {
  @PrimaryColumn()
  templateId: number

  @PrimaryColumn()
  tagId: number

  @ManyToOne(() => Template, { onDelete: 'CASCADE' })
  template: Relation<Template>

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  tag: Relation<Tag>
}

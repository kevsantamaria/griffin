import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import { Tag } from '../../tags/entities/tag.entity'
import { Template } from './template.entity'

@Entity('template_tags')
export class TemplateTag {
  @PrimaryColumn()
  templateId: number

  @PrimaryColumn()
  tagId: number

  @ManyToOne(() => Template, { onDelete: 'CASCADE' })
  template: Template

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  tag: Tag
}

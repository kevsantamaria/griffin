import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import { Tag } from '../../tags/entities/tag.entity'
import { Template } from '../../templates/entities/template.entity'

@Entity('template_tags')
export class TemplateTag {
  @PrimaryColumn()
  templateId: number

  @PrimaryColumn()
  tagId: number

  @ManyToOne(() => Template)
  template: Template

  @ManyToOne(() => Tag)
  tag: Tag
}

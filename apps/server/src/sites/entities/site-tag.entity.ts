import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import { Tag } from '../../tags/entities/tag.entity'
import { Site } from './site.entity'

@Entity('site_tags')
export class SiteTag {
  @PrimaryColumn()
  siteId: number

  @PrimaryColumn()
  tagId: number

  @ManyToOne(() => Site, { onDelete: 'CASCADE' })
  site: Site

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  tag: Tag
}

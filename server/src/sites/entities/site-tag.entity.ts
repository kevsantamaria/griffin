import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import { Site } from './site.entity'
import { Tag } from '../../tags/entities/tag.entity'

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

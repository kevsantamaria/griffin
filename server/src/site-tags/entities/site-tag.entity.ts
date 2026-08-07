import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import { Site } from '../../sites/entities/site.entity'
import { Tag } from '../../tags/entities/tag.entity'

@Entity('site_tags')
export class SiteTag {
  @PrimaryColumn()
  siteId: number

  @PrimaryColumn()
  tagId: number

  @ManyToOne(() => Site)
  site: Site

  @ManyToOne(() => Tag)
  tag: Tag
}

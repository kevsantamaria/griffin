import { Entity, ManyToOne, PrimaryColumn, type Relation } from 'typeorm'

import { Tag } from '../../tags/entities/tag.entity.js'
import { Site } from './site.entity.js'

@Entity('site_tags')
export class SiteTag {
  @PrimaryColumn()
  siteId: number

  @PrimaryColumn()
  tagId: number

  @ManyToOne(() => Site, { onDelete: 'CASCADE' })
  site: Relation<Site>

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  tag: Relation<Tag>
}

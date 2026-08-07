import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Technology } from '../../technologies/entities/technology.entity'

export type TemplateField = {
  id: string
  label: string
  type: 'text' | 'password' | 'email' | 'url'
}

export type TemplateGroup = {
  id: string
  label: string
  fields: TemplateField[]
}

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'jsonb', nullable: true })
  fields: TemplateGroup[]

  @Column()
  technologyId: number

  @ManyToOne(() => Technology)
  technology: Technology
}

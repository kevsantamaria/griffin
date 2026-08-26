import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @Column({ type: 'jsonb', nullable: true })
  groups: TemplateGroup[]

  @Column()
  technologyId: number

  @ManyToOne(() => Technology)
  technology: Technology

  @OneToMany(() => TemplateTag, (templateTag) => templateTag.template)
  templateTags: TemplateTag[]
}

// const credentialGroups = [
//   {
//     id: 1,
//     label: 'WP Admin',
//     fields: [
//       {
//         id: 1,
//         label: 'Username',
//         type: 'text',
//       },
//       {
//         id: 2,
//         label: 'Password',
//         type: 'password',
//       },
//       {
//         id: 3,
//         label: 'URL',
//         type: 'url',
//       },
//     ],
//   },
//   {
//     id: 2,
//     label: 'WP Admin 2',
//     fields: [
//       {
//         id: 1,
//         label: 'Username',
//         type: 'text',
//       },
//       {
//         id: 2,
//         label: 'Password',
//         type: 'password',
//       },
//       {
//         id: 3,
//         label: 'URL',
//         type: 'url',
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: 'FTP',
//     fields: [
//       {
//         id: 1,
//         label: 'Username',
//         type: 'text',
//       },
//       {
//         id: 2,
//         label: 'Password',
//         type: 'password',
//       },
//     ],
//   },
// ]

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50, unique: true, collation: 'case_insensitive' })
  name: string
}

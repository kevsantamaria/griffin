import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string
}

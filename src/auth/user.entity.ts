import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  username: string;

  @Column()
  password: string;

}

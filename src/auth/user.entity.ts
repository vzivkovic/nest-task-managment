import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  // @Index({ unique: true })
  @Column()
  username: string;

  @Column()
  password: string;

}

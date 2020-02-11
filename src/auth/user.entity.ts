import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @Index({ unique: true })
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async isValidPassword(password: string): Promise<boolean> {

    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }

}

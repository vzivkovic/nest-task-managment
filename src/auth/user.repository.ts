import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {

    const { username, password } = authCredentialDto;
    const salt = bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = password;

    try {

      await user.save();

    }catch (error) {
      if (error.code === '23505'){
        throw new ConflictException('Username already exist!');
      }else{
        throw new InternalServerErrorException();
      }
    }

  }
}

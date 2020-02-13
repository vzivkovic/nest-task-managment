import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private  jwtService: JwtService,
  ) {
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePassword(authCredentialDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credential!');
    }

    const payload: JwtPayloadInterface = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}

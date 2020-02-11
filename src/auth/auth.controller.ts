import { Body, Controller, Get, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    const username = await this.authService.signIn(authCredentialDto);

    if (!username){
      throw new UnauthorizedException('Invalid credential!')
    }
  }

  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.authService.signUp(authCredentialDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
// import { GetAuth } from './get-auth';
import { User } from './user.entity';
import { GetAuthDecorator } from './get-auth.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialDto);
  }

  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.authService.signUp(authCredentialDto);
  }

  // test() {
  @Post('/auth-check')
  @UseGuards(AuthGuard())
    authCheck(@GetAuthDecorator() auth: User) {
    console.log(auth);
    console.log(1);
  }
}

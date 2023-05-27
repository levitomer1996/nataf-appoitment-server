import {
  Body,
  Controller,
  Post,
  Logger,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentials } from './DTO/SignupCredentials.DTO';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './GetUser.Decorator';
import {
  SigninCredentials,
  SigninData,
  UserData,
} from './DTO/SigninCredentials.DTO';
import { User } from './Schemes/User.Scheme';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger('Auth Controller');
  @Post('/signup')
  async signup_owner(@Body() creds: SignupCredentials) {
    this.logger.log('New credentials arrived.');
    this.logger.log(creds);
    return this.authService.signUp(creds);
  }
  @Post('/signin')
  async signIn(@Body() signInDto: SigninCredentials): Promise<SigninData> {
    return await this.authService.signIn(signInDto);
  }

  @Get('/tokensignin')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async tokenSignin(@GetUser() user: User): Promise<UserData> {
    const { firstName, lastName, email } = user;
    return { firstName, lastName, email };
  }
}

import { IsString, IsEmail } from 'class-validator';

export class SignupCredentials {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}

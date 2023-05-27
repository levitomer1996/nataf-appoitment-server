import { IsString } from 'class-validator';

export class SigninCredentials {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SigninData {
  token: string;
  user: UserData;
}
export class UserData {
  email: string;
  firstName: string;
  lastName: string;
}

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SignupCredentials } from './DTO/SignupCredentials.DTO';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './Schemes/User.Scheme';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SigninCredentials, SigninData } from './DTO/SigninCredentials.DTO';
import { JwtPayload } from './DTO/JWTPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { throws } from 'assert';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger('Auth-Service');
  async signUp(creds: SignupCredentials) {
    const { email, password, firstName, lastName } = creds;
    this.logger.log('Gening salt');
    const salt = await bcrypt.genSalt();
    this.logger.log('Hashing password');
    const genPass = await bcrypt.hash(password, salt);
    const user = new this.userModel({
      email,
      password: genPass,
      salt,
      firstName,
      lastName,
    });
    try {
      this.logger.log('Saving user');
      await user.save();
      this.logger.log(`User ${email} saved !`);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException("Something wen't wrong");
    }
  }
  async signIn(creds: SigninCredentials): Promise<SigninData> {
    
    const user = await this.userModel.findOne({ email: creds.email });
    if (!user) {
      this.logger.log('User not exist');
      throw new BadRequestException();
    }
    const isPasswordCorrect = await bcrypt.compare(
      creds.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      this.logger.log('Password incorrect');
      throw new BadRequestException();
    }
    const payload: JwtPayload = { uid: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}

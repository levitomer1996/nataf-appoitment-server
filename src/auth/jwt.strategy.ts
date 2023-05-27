import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemes/User.Scheme';
import { JwtPayload } from './DTO/JWTPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'tomer',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { uid } = payload;

    const user = await this.userModel.findById(uid).exec();

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token: string | undefined = req.get('Authorization');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    const user: UserDocument | null = await this.UserModel.findOne({ token });

    if (!user) {
      throw new UnauthorizedException('Invalid token provided');
    }

    req.user = user;
    return true;
  }
}

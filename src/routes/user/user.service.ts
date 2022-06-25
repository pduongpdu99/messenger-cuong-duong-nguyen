import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { sha512 } from 'sha512-crypt-ts';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  /**
   * create method
   * @param request
   * @returns
   */
  override async create(createDto: CreateUserDto) {
    const request = {
      emailAddress: createDto.emailAddress,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      isActive: createDto.isActive,
      isDelete: createDto.isDelete,
      password: this.getHashPassword(createDto.password),
      access_token: createDto.access_token,
    } as CreateUserDto;

    const users = await this.userModel.find({
      emailAddress: createDto.emailAddress,
    });

    // catch error if user exist
    if (users.length > 0) {
      throw new ConflictException({
        statusCode: 409,
        message: 'User conflicted: "This user current is exist"',
      });
    }

    return this.userModel.create(request);
  }

  /**
   * find emailAddress
   * @param emailAddress
   * @returns
   */
  async findEmailToAuthentication(loginDto: LoginUserDto) {
    const users = await this.userModel.find({
      emailAddress: loginDto.emailAddress,
      password: this.getHashPassword(loginDto.password),
    });
    // password: await this.getHashPassword(loginDto.password),
    return users.length > 0
      ? users[0]
      : {
          statusCode: 400,
          message: 'User is not exist',
        };
  }

  /**
   * find emailAddress
   * @param token
   * @returns
   */
  async findUserAtToken(token: string): Promise<User> {
    const users = (await this.userModel.find({
      access_token: token,
    })) as User[];
    return users[0];
  }

  // ==================================
  // PRIVATE METHOD
  // ==================================
  getHashPassword(password: string) {
    return sha512.crypt(password, 'saltsalt');
  }
}

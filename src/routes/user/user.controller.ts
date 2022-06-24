import {
  Controller,
  Get,
  Param,
  ForbiddenException,
  HttpCode,
  Query,
  UseFilters,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from 'src/base/base.api/base.controller';
import { User } from './schemas/user.schema';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController extends BaseController<User> {
  constructor(private readonly service: UserService) {
    super(service);
  }

  @Post()
  async create(request: CreateUserDto) {
    return this.service.create(request);
  }

  /**
   * get user by token
   * @param token
   * @returns
   */
  @Get('token/:token')
  async getUserByAccessToken(@Param('token') token: string) {
    return this.service.findUserAtToken(token);
  }

  /**
   * get user by id
   * @param id
   * @returns
   */
  @Get('find/:id')
  async getUserById(@Param('id') id: string) {
    return this.service.find(id);
  }

  /**
   * get users with paginate method
   * @param queryParams
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async paginate(@Query() queryParams: any) {
    const { page, limit } = queryParams;
    delete queryParams.page;
    delete queryParams.limit;
    try {
      return await this.service.paginate(page, limit, queryParams);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Post('signin')
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.service.find(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

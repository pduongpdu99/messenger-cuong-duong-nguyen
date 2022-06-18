import { Controller, Get, Param, ForbiddenException, HttpCode, Query, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from 'src/base/base.api/base.controller';
import { User } from './schemas/user.schema';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('users')
export class UserController extends BaseController<User> {
  constructor(private readonly service: UserService) {
    super(service);
  }

  /**
   * get user by token
   * @param token 
   * @returns 
   */
  @Get("token/:token")
  async getUserByAccessToken(@Param('token') token: string) {
    return this.service.findUserAtToken(token)
  }

  /**
   * get user by id
   * @param id 
   * @returns 
   */
  @Get("find/:id")
  async getUserById(@Param('id') id: string) {
    return this.service.find(id)
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
}

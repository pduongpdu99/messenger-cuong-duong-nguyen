import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  HttpCode,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BaseController } from 'src/base/base.api/base.controller';
import { Group } from './schemas/group.schema';

@Controller('groups')
export class GroupController extends BaseController<Group> {
  /**
   * constructor
   * @param groupService
   */
  constructor(private readonly groupService: GroupService) {
    super(groupService);
  }

  /**
   * create
   * @param createDto
   * @returns
   */
  @Post()
  @HttpCode(201)
  // @UseFilters(new HttpExceptionFilter())
  async create(@Body() createDto: CreateGroupDto) {
    try {
      return this.groupService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * update
   * @param updateDto
   * @returns
   */
  @Patch()
  @HttpCode(200)
  // @UseFilters(new HttpExceptionFilter())
  async update(@Body() updateDto: UpdateGroupDto) {
    try {
      return this.groupService.update(updateDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * get message list by id
   * @param id
   * @returns
   */
  @Get('message-list-by-id/:id')
  @HttpCode(200)
  async getMessageListById(@Param('id') id: string) {
    try {
      return this.groupService.getMessageListById(id);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * paginate 
   * @param queryParams 
   * @returns 
   */
  @Get('paginate')
  @HttpCode(200)
  // @UseFilters(new HttpExceptionFilter())
  async paginate(@Query() queryParams: any) {
    const { page, limit } = queryParams;
    delete queryParams.page;
    delete queryParams.limit;
    try {
      return await this.groupService.paginate(page, limit, queryParams);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}

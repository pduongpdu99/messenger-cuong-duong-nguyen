import { Controller, Post, Body, Patch, Get, Param, HttpCode, UseFilters, Query, ForbiddenException, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BaseController } from 'src/base/base.api/base.controller';
import { Group } from './schemas/group.schema';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('groups')
export class GroupController extends BaseController<Group>{
  constructor(private readonly groupService: GroupService) {
    super(groupService);
  }

  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Post()
  async create(@Body() createDto: CreateGroupDto) {
    try {
      return this.groupService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Patch()
  async update(@Body() updateDto: UpdateGroupDto) {
    try {
      return this.groupService.update(updateDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Get('/paginate')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
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

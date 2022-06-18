import { ForbiddenException, Patch, Query, UseFilters, UseGuards } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { BaseService } from './base.service';

export class BaseController<Base> {
  constructor(private readonly baseService: BaseService<Base>) { }

  /**
   * Base - Create API method
   * @param createDto 
   * @returns 
   */
  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createDto: any) {
    try {
      return this.baseService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * Base - get all API method
   * @returns 
   */
  // @UseGuards(LocalAuthGuard)
  @Get()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async get() {
    try {
      const data = await this.baseService.get();
      return data;
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * Base - get user by id api method
   * @param id 
   * @returns 
   */
  @Get('find/:id')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async find(@Param('id') id: string) {
    try {
      return this.baseService.find(id);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * Base - update user api method
   * @param updateDto 
   * @returns 
   */
  @Patch()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async update(@Body() updateDto: any) {
    try {
      return this.baseService.update(updateDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * Base - delete user api method
   * @param id 
   * @returns 
   */
  @Delete('remove/:id')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('id') id: string) {
    try {
      return this.baseService.remove(id);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * Base - delete list id api method
   * @param ids 
   * @returns 
   */
  @Delete()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async removeList(@Body() ids: string[]) {
    try {
      return this.baseService.removeList(ids);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}

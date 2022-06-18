import { Controller, Post, Body, Patch, Get, Param, HttpCode, UseFilters, Query, ForbiddenException, Delete } from '@nestjs/common';
import { EmoijService } from './emoij.service';
import { CreateEmoijDto } from './dto/create-Emoij.dto';
import { UpdateEmoijDto } from './dto/update-emoij.dto';
import { BaseController } from 'src/base/base.api/base.controller';
import { Emoij } from './schemas/emoij.schema';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('emoijs')
export class EmoijController extends BaseController<Emoij>{
  constructor(private readonly emoijService: EmoijService) {
    super(emoijService);
  }

  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Post()
  async create(@Body() createDto: CreateEmoijDto) {
    try {
      return this.emoijService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Patch()
  async update(@Body() updateDto: UpdateEmoijDto) {
    try {
      return this.emoijService.update(updateDto);
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
      return await this.emoijService.paginate(page, limit, queryParams);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}

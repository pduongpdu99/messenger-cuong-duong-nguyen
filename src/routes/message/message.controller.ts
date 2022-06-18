import { Controller, Post, Body, Patch, Get, Param, HttpCode, UseFilters, Query, ForbiddenException, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { BaseController } from 'src/base/base.api/base.controller';
import { Message } from './schemas/message.schema';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('messages')
export class MessageController extends BaseController<Message>{
  constructor(private readonly MessageService: MessageService) {
    super(MessageService);
  }

  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Post()
  create(@Body() createDto: CreateMessageDto) {
    try {
      return this.MessageService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Patch()
  update(@Body() updateDto: UpdateMessageDto) {
    try {
      return this.MessageService.update(updateDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Get('paginate')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async paginate(@Query() queryParams: any) {
    const { page, limit } = queryParams;
    delete queryParams.page;
    delete queryParams.limit;
    try {
      return await this.MessageService.paginate(page, limit, queryParams);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}

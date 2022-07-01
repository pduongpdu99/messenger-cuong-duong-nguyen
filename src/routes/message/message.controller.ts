import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  HttpCode,
  Query,
  ForbiddenException,
  Param,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { BaseController } from 'src/base/base.api/base.controller';
import { Message } from './schemas/message.schema';

@Controller('messages')
export class MessageController extends BaseController<Message> {
  constructor(private readonly messageService: MessageService) {
    super(messageService);
  }

  @HttpCode(201)
  @Post()
  create(@Body() createDto: CreateMessageDto) {
    try {
      return this.messageService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  /**
   * create messages
   * @param dtos
   * @returns
   */
  @HttpCode(201)
  @Post('multi-msg')
  createMessages(@Body() dtos: CreateMessageDto[]) {
    const maps = dtos.map((dto) => {
      dto.hasEdited = false;
      dto.isDeleted = false;
      return dto;
    });

    try {
      return this.messageService.createMessages(maps);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @HttpCode(200)
  @Patch()
  update(@Body() updateDto: UpdateMessageDto) {
    try {
      return this.messageService.update(updateDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Get('paginate')
  @HttpCode(200)
  async paginate(@Query() queryParams: any) {
    const { page, limit } = queryParams;
    delete queryParams.page;
    delete queryParams.limit;
    try {
      return await this.messageService.paginate(page, limit, queryParams);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Get('last-message/:userId')
  @HttpCode(200)
  async getLastMessage(@Param('userId') userId: string) {
    try {
      return await this.messageService.getLastMessage(userId);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}

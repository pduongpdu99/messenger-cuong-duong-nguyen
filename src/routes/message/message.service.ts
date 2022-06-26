import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService extends BaseService<Message> {
  /**
   * constructor
   * @param messageModel
   */
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {
    super(messageModel);
  }

  /**
   * create message
   * @param dto
   * @returns
   */
  async createMessages(dto: CreateMessageDto[]) {
    return this.messageModel.insertMany(dto);
  }

  /**
   * get Messages by category id
   * @param id
   */
  async getMessagesByCategory(id: string) {
    let inner = {};
    if (id !== '0') inner = { nhomSPId: id };

    let models = await this.messageModel.find(inner);
    models = await this.messageModel.populate(models, {
      path: 'nhomSPId',
    });

    return models;
  }
}

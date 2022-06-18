import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService extends BaseService<Message> {

    /**
     * constructor
     * @param MessageModel 
     */
    constructor(@InjectModel(Message.name) private readonly MessageModel: Model<Message>) {
        super(MessageModel);
    }

    /**
     * get Messages by category id
     * @param id 
     */
    async getMessagesByCategory(id: string) {
        let inner = {};
        if (id !== "0") inner = { nhomSPId: id };

        let models = await this.MessageModel.find(inner);
        models = await this.MessageModel.populate(models, {
            path: 'nhomSPId'
        });

        return models;
    }
}

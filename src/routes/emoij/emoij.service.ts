import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { Emoij } from './schemas/emoij.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmoijService extends BaseService<Emoij> {

    /**
     * constructor
     * @param emoijModel 
     */
    constructor(@InjectModel(Emoij.name) private readonly emoijModel: Model<Emoij>) {
        super(emoijModel);
    }

    /**
     * get Emoijs by category id
     * @param id 
     */
    async getEmoijsByCategory(id: string) {
        let inner = {};
        if (id !== "0") inner = { nhomSPId: id };

        let models = await this.emoijModel.find(inner);
        models = await this.emoijModel.populate(models, {
            path: 'nhomSPId'
        });

        return models;
    }
}

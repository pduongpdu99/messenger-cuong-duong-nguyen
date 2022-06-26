import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { Group } from './schemas/Group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupService extends BaseService<Group> {
  /**
   * constructor
   * @param GroupModel
   */
  constructor(
    @InjectModel(Group.name) private readonly GroupModel: Model<Group>,
  ) {
    super(GroupModel);
  }

  /**
   * get Groups by category id
   * @param id
   */
  async getGroupsByCategory(id: string) {
    let inner = {};
    if (id !== '0') inner = { nhomSPId: id };

    let models = await this.GroupModel.find(inner);
    models = await this.GroupModel.populate(models, {
      path: 'nhomSPId',
    });

    return models;
  }

  /**
   * get message list by id
   * @param id
   */
  async getMessageListById(id: string) {
    const groups = await this.GroupModel.find({
      memberIds: {
        $in: [id],
      },
    });
    return groups;
  }
}

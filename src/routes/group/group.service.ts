import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { Group } from './schemas/Group.schema';
import { Model } from 'mongoose';
import { populateList } from 'src/base/populate-list';

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

  /**
   * paginate
   * @param page
   * @param limit
   * @param filter
   * @returns
   */
  override async paginate(page: number = 1, limit: number = 10, filter?: any) {
    const indexStart = (page - 1) * limit;

    // page and limit per page
    let query = this.GroupModel.find({}).skip(indexStart).limit(limit);

    // Sort theo ngày
    const { sortBy } = filter;
    if (sortBy != undefined) {
      delete filter.sortBy;

      let [k, p] = sortBy.split(':');
      let sort = {};
      sort[k] = p;
      query = query.sort(sort);
    }

    const groupPaginateQuery = {
      memberIds: {
        $in: [filter.userId],
      },
    };
    query = query.find(groupPaginateQuery);

    let results = await query;
    const totalResults = (await this.GroupModel.find(groupPaginateQuery))
      .length;
    const totalPages = Math.ceil(totalResults / limit);

    return {
      results: await this.GroupModel.populate(results, populateList),
      totalResults,
      totalPages,
      limit: limit * 1,
      page: page * 1,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { populateList } from '../populate-list';

@Injectable()
export class BaseService<Document> {
  constructor(private documentSchema: Model<Document>) {}

  /**
   * create method
   * @param createDto
   * @returns
   */
  async create(createDto: any) {
    return this.documentSchema.create(createDto);
  }

  /**
   * get method
   * @returns
   */
  async get() {
    const data = await this.documentSchema.find({});
    return data;
  }

  /**
   * find method
   * @param id
   * @returns
   */
  async find(id: string) {
    const data = await this.documentSchema.findById(id);
    return data;
  }

  /**
   * update
   * @param updateDto
   * @returns
   */
  async update(updateDto: any) {
    if (updateDto.id) updateDto._id = updateDto.id;
    const filter = { _id: updateDto._id };
    delete updateDto._id;

    const data = await this.documentSchema.findOneAndUpdate(filter, updateDto);
    return data;
  }

  /**
   * remove
   * @param id
   * @returns
   */
  async remove(id: string) {
    return await this.documentSchema.findByIdAndDelete({ _id: id });
  }

  /**
   * remove list
   * @param ids
   * @returns
   */
  async removeList(ids: string[]) {
    return await this.documentSchema.remove({
      _id: {
        $in: ids,
      },
    });
  }

  /**
   * paginate
   * @param page
   * @param limit
   * @param filter
   * @returns
   */
  async paginate(page: number = 1, limit: number = 10, filter?: any) {
    const indexStart = (page - 1) * limit;

    // page and limit per page
    let query = this.documentSchema.find({}).skip(indexStart).limit(limit);

    // Sort theo ngày
    const { sortBy } = filter;
    if (sortBy != undefined) {
      delete filter.sortBy;

      let [k, p] = sortBy.split(':');
      let sort = {};
      sort[k] = p;
      query = query.sort(sort);
    }
    query = query.find(filter);

    let results = await query;
    const totalResults = (await this.documentSchema.find(filter)).length;
    const totalPages = Math.ceil(totalResults / limit);

    return {
      results: await this.documentSchema.populate(results, populateList),
      totalResults,
      totalPages,
      limit: limit * 1,
      page: page * 1,
    };
  }
}

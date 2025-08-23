import { Injectable } from '@nestjs/common';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './pagination.dto';
import { IPagination } from './pagination.interface';

@Injectable()
export class PaginationProvider {
  async PaginationQuery<T extends ObjectLiteral>(
    paginateQuery: PaginationDto,
    queryBuilder: SelectQueryBuilder<T>,
  ): Promise<IPagination<T>> {
    const { page, limit, ignorePagination } = paginateQuery;

    if (ignorePagination) {
      const data = await queryBuilder.getMany();
      return {
        data,
        meta: {
          itemsPerPage: data.length,
          totalItems: data.length,
          totalPages: 1,
          currentPage: 1,
        },
      };
    }

    const skip = (page - 1) * limit;

    const totalItems = await queryBuilder.getCount();
    const totalPages = Math.ceil(totalItems / limit);

    const data = await queryBuilder.skip(skip).take(limit).getMany();

    return {
      data,
      meta: {
        itemsPerPage: limit,
        totalItems,
        totalPages,
        currentPage: page,
      },
    };
  }
}

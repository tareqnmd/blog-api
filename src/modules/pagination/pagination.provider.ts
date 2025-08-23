import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationProvider {
  async PaginationQuery<T extends ObjectLiteral>(
    paginateQuery: PaginationDto,
    repository: Repository<T>,
  ) {
    const query = repository.createQueryBuilder(
      paginateQuery.ignorePagination ? '' : 'p',
    );
    const { page, limit, ignorePagination } = paginateQuery;
    const skip = (page - 1) * limit;
    const take = ignorePagination ? undefined : limit;
    return query.skip(skip).take(take).getMany();
  }
}

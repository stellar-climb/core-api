import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ILike } from 'typeorm';

type OrderType = 'ASC' | 'DESC';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  sort?: string;

  @IsOptional()
  order?: OrderType;
}

export interface PaginationOptions {
  page?: number;

  limit?: number;

  sort?: string;

  order?: OrderType;
}

export const convertOptions = (options?: PaginationOptions) => {
  let skip;
  let take;
  let order;

  if (options && options.page) {
    skip = ((options.page || 1) - 1) * (options.limit || 1);
  }

  if (options && options.limit) {
    take = options.limit;
  }

  if (options && options.sort && options.order) {
    order = { [options.sort]: options.order };
  }

  return { skip, take, order };
};

export function checkLike(search?: string, searchValue?: any) {
  if (search && searchValue) {
    return { [search]: ILike(`%${searchValue}%`) };
  }

  return undefined;
}

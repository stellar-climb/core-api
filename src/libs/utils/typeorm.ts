type OrderType = 'ASC' | 'DESC';

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

export interface PeriodOptions {
  startDate?: string;
  endDate?: string;
}

import { PaginationDto } from '@libs/utils';
import { IsOptional, IsString } from 'class-validator';

export class GymQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  searchValue?: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class GymCreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}

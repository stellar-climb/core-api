import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UsersCreateDto {
  @IsString()
  @IsNotEmpty()
  token!: string;
}
